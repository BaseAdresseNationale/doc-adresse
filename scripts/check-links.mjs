#!/usr/bin/env node
/**
 * Vérifie les liens et images cassés dans tous les fichiers markdown du projet.
 *
 * Usage: node scripts/check-links.mjs [--no-external]
 *
 * Options:
 *   --no-external  Ignore les URLs externes (vérification locale uniquement, plus rapide)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.join(__dirname, '..')
const DOCS_DIR = path.join(ROOT_DIR, 'docs')
const STATIC_DIR = path.join(ROOT_DIR, 'static')

const SKIP_EXTERNAL = process.argv.includes('--no-external')
const CONCURRENCY = 5
const TIMEOUT_MS = 12000

// ─── Collecte des fichiers markdown ──────────────────────────────────────────

function getMarkdownFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      getMarkdownFiles(fullPath, files)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  return files
}

// ─── Décodage des chemins ─────────────────────────────────────────────────────

function decodeHtmlEntities(str) {
  return str
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
}

function decodePath(src) {
  let decoded = decodeHtmlEntities(src)
  try { decoded = decodeURIComponent(decoded) } catch { /* keep as-is */ }
  return decoded
}

// ─── Construction du map des chemins valides ──────────────────────────────────

function stripNumericPrefix(segment) {
  return segment.replace(/^\d+[-_]/, '')
}

function segmentsWithoutPrefix(relPath) {
  return relPath.split('/').map(stripNumericPrefix).join('/')
}

function parseSlugFromFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!match) return null
  const slugMatch = match[1].match(/^slug:\s*["']?(.+?)["']?\s*$/m)
  return slugMatch ? slugMatch[1].trim() : null
}

function buildValidDocPaths(files) {
  const validPaths = new Set()

  for (const filePath of files) {
    const rel = path.relative(DOCS_DIR, filePath).split(path.sep).join('/')
    const withoutExt = rel.slice(0, -3)
    const dirRel = path.dirname(rel).split(path.sep).join('/')
    const fileName = path.basename(filePath, '.md')
    const fileNameNoPrefix = stripNumericPrefix(fileName)
    const parentDirName = path.basename(path.dirname(filePath))
    const parentDirNoPrefix = stripNumericPrefix(parentDirName)

    // Chemin brut
    validPaths.add(withoutExt)
    // Chemin sans préfixes numériques
    validPaths.add(segmentsWithoutPrefix(withoutExt))

    // Fichier index de catégorie : même nom que le répertoire parent (ex: 06_foo/06_foo.md)
    // ou nommé readme / index
    const isReadme = /^readme$/i.test(fileName)
    const isIndex = /^index$/i.test(fileName)
    const isCategoryIndex = fileNameNoPrefix.toLowerCase() === parentDirNoPrefix.toLowerCase()

    if (isCategoryIndex || isReadme || isIndex) {
      // Ce fichier est accessible via le chemin du répertoire parent
      if (dirRel !== '.') {
        validPaths.add(dirRel)
        validPaths.add(segmentsWithoutPrefix(dirRel))
      }
    }

    // Slug depuis le frontmatter
    const content = fs.readFileSync(filePath, 'utf-8')
    const slug = parseSlugFromFrontmatter(content)
    if (slug) {
      if (slug.startsWith('/')) {
        // Slug absolu
        validPaths.add(slug.replace(/^\//, '').replace(/\/$/, ''))
      } else {
        // Slug relatif au répertoire du fichier
        const fullSlug = dirRel === '.' ? slug : `${dirRel}/${slug}`
        validPaths.add(fullSlug.replace(/\/$/, ''))
        validPaths.add(segmentsWithoutPrefix(fullSlug).replace(/\/$/, ''))
      }
    }
  }

  return validPaths
}

// ─── Extraction des liens et images ──────────────────────────────────────────

function stripMarkdownTitle(urlAndMaybeTitle) {
  // "[text](url "title")" → strip trailing "title" or 'title'
  return urlAndMaybeTitle.replace(/\s+["'][^"']*["']\s*$/, '').trim()
}

function extractItems(content) {
  const items = []

  // URL markdown avec parenthèses potentiellement imbriquées : (url) ou (url "title")
  // Autorise un niveau de () imbriquées, ex: "Fiche (1).pdf"
  const MD_URL = '((?:[^()]*|\\([^()]*\\))*)'

  // Images markdown : ![alt](src) ou ![alt](src "title")
  const mdImgRe = new RegExp(`!\\[([^\\]]*)\\]\\(${MD_URL}\\)`, 'g')
  let m
  while ((m = mdImgRe.exec(content)) !== null) {
    const src = stripMarkdownTitle(m[2])
    if (src) items.push({ kind: 'image', src, raw: m[0] })
  }

  // Liens markdown : [text](url) ou [text](url "title") — exclut les images
  const mdLinkRe = new RegExp(`(?<!!)\\[([^\\]]*)\\]\\(${MD_URL}\\)`, 'g')
  while ((m = mdLinkRe.exec(content)) !== null) {
    const url = stripMarkdownTitle(m[2])
    if (!url || /^(mailto:|tel:|#)/.test(url)) continue
    items.push({ kind: 'link', src: url, raw: m[0] })
  }

  // Images HTML — séparation guillemets doubles / simples pour éviter les faux positifs
  // ex: src="/path/d'apostrophe.png" → le ' intérieur ne coupe pas si on arrête à "
  const htmlImgDq = /<img\b[^>]*\bsrc="([^"]+)"[^>]*>/gi
  const htmlImgSq = /<img\b[^>]*\bsrc='([^']+)'[^>]*>/gi
  for (const re of [htmlImgDq, htmlImgSq]) {
    while ((m = re.exec(content)) !== null) {
      if (m[1]) items.push({ kind: 'image', src: m[1], raw: m[0] })
    }
  }

  // Liens HTML
  const htmlLinkDq = /<a\b[^>]*\bhref="([^"]+)"[^>]*>/gi
  const htmlLinkSq = /<a\b[^>]*\bhref='([^']+)'[^>]*>/gi
  for (const re of [htmlLinkDq, htmlLinkSq]) {
    while ((m = re.exec(content)) !== null) {
      const url = m[1]
      if (!url || /^(mailto:|tel:|#)/.test(url)) continue
      items.push({ kind: 'link', src: url, raw: m[0] })
    }
  }

  return items
}

// ─── Classification ───────────────────────────────────────────────────────────

function classify(src) {
  const decoded = decodePath(src)
  if (/^https?:\/\//.test(src)) return 'external'
  if (src.startsWith('/img/') || src.startsWith('/static/img/')) return 'local-image'
  if (/(?:^|\/)\.gitbook\//.test(decoded)) return 'gitbook-asset'
  if (/^\/docs\//.test(src)) return 'internal-doc'
  if (/\.md($|#)/.test(src)) return 'relative-md'
  if (src.startsWith('/')) return 'local-static'
  return 'unknown'
}

// ─── Validations locales ──────────────────────────────────────────────────────

function localFileExists(src) {
  const decoded = decodePath(src).replace(/^\/static/, '')
  return fs.existsSync(path.join(STATIC_DIR, decoded))
}

function internalDocExists(src, validDocPaths) {
  const decoded = decodePath(src.split('#')[0])
  const docPath = decoded.replace(/^\/docs\//, '').replace(/\/$/, '')
  if (validDocPaths.has(docPath)) return true
  if (validDocPaths.has(segmentsWithoutPrefix(docPath))) return true
  return false
}

function relativeMdExists(src, fromFilePath) {
  const decoded = decodePath(src.split('#')[0])
  const resolved = path.resolve(path.dirname(fromFilePath), decoded)
  return fs.existsSync(resolved)
}

// ─── Vérifications HTTP ───────────────────────────────────────────────────────

async function fetchUrl(url, method = 'HEAD') {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method,
      signal: controller.signal,
      headers: { 'User-Agent': 'doc-adresse-link-checker/1.0' },
      redirect: 'manual',
    })
    clearTimeout(timer)
    return { status: res.status, location: res.headers.get('location') }
  } catch (err) {
    clearTimeout(timer)
    return { status: 0, error: err.name === 'AbortError' ? 'timeout' : err.message }
  }
}

async function checkExternalUrl(url) {
  let result = await fetchUrl(url, 'HEAD')
  if (result.status === 405) result = await fetchUrl(url, 'GET')
  return result
}

async function checkUrlsBatch(urls) {
  const results = new Map()
  const queue = [...urls]

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift()
      if (!url || results.has(url)) continue
      results.set(url, await checkExternalUrl(url))
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()))
  return results
}

// ─── Programme principal ──────────────────────────────────────────────────────

console.log('🔍 Vérification des liens et images...\n')
if (SKIP_EXTERNAL) console.log('ℹ️  Mode --no-external : URLs externes ignorées\n')

const files = getMarkdownFiles(DOCS_DIR)
console.log(`📁 ${files.length} fichiers markdown trouvés`)

const validDocPaths = buildValidDocPaths(files)

const issues = []
// Map url → Set<relativeFilePath>
const externalUrlToFiles = new Map()

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const relFile = path.relative(ROOT_DIR, filePath)
  const items = extractItems(content)

  for (const item of items) {
    const cat = classify(item.src)

    switch (cat) {
      case 'local-image':
        if (!localFileExists(item.src)) {
          issues.push({ file: relFile, kind: item.kind, src: item.src, severity: 'error', detail: 'fichier introuvable dans static/' })
        }
        break

      case 'gitbook-asset':
        issues.push({ file: relFile, kind: item.kind, src: item.src, severity: 'error', detail: 'asset GitBook résiduel (non migré vers static/img/)' })
        break

      case 'internal-doc':
        if (!internalDocExists(item.src, validDocPaths)) {
          issues.push({ file: relFile, kind: item.kind, src: item.src, severity: 'error', detail: 'page introuvable dans docs/' })
        }
        break

      case 'relative-md':
        if (!relativeMdExists(item.src, filePath)) {
          issues.push({ file: relFile, kind: item.kind, src: item.src, severity: 'error', detail: 'fichier .md introuvable' })
        }
        break

      case 'local-static':
        if (!localFileExists(item.src)) {
          issues.push({ file: relFile, kind: item.kind, src: item.src, severity: 'error', detail: 'fichier statique introuvable' })
        }
        break

      case 'external':
        if (!SKIP_EXTERNAL) {
          const baseUrl = item.src.split('#')[0]
          if (!externalUrlToFiles.has(baseUrl)) externalUrlToFiles.set(baseUrl, new Set())
          externalUrlToFiles.get(baseUrl).add(relFile)
        }
        break
    }
  }
}

// Vérification des URLs externes
if (!SKIP_EXTERNAL && externalUrlToFiles.size > 0) {
  console.log(`🌐 Vérification de ${externalUrlToFiles.size} URLs externes uniques (concurrence: ${CONCURRENCY}, timeout: ${TIMEOUT_MS / 1000}s)...\n`)

  const urlResults = await checkUrlsBatch([...externalUrlToFiles.keys()])

  for (const [url, result] of urlResults) {
    const sourceFiles = externalUrlToFiles.get(url) ?? new Set()
    if (result.status === 0) {
      for (const file of sourceFiles) {
        issues.push({ file, kind: 'link', src: url, severity: 'error', detail: `erreur réseau : ${result.error}` })
      }
    } else if (result.status >= 400) {
      for (const file of sourceFiles) {
        issues.push({ file, kind: 'link', src: url, severity: 'error', detail: `HTTP ${result.status}` })
      }
    } else if (result.location) {
      for (const file of sourceFiles) {
        issues.push({ file, kind: 'link', src: url, severity: 'warn', detail: `redirige → ${result.location}` })
      }
    }
  }
}

// ─── Rapport ─────────────────────────────────────────────────────────────────

const errors = issues.filter(i => i.severity === 'error')
const warnings = issues.filter(i => i.severity === 'warn')

if (issues.length === 0) {
  console.log('\n✅ Aucun lien ni image cassé détecté !')
} else {
  const byFile = new Map()
  for (const issue of issues) {
    if (!byFile.has(issue.file)) byFile.set(issue.file, [])
    byFile.get(issue.file).push(issue)
  }

  console.log('\n' + '='.repeat(70))
  console.log('RAPPORT')
  console.log('='.repeat(70))

  for (const [file, fileIssues] of [...byFile.entries()].sort()) {
    console.log(`\n📄 ${file}`)
    for (const issue of fileIssues) {
      const severity = issue.severity === 'error' ? '❌' : '⚠️ '
      const kindIcon = issue.kind === 'image' ? '🖼 ' : '🔗'
      console.log(`   ${severity} ${kindIcon}  ${issue.src}`)
      console.log(`         → ${issue.detail}`)
    }
  }
}

console.log('\n' + '─'.repeat(70))
console.log('📊 Résumé :')
console.log(`   Fichiers analysés       : ${files.length}`)
if (!SKIP_EXTERNAL) console.log(`   URLs externes vérifiées : ${externalUrlToFiles.size}`)
console.log(`   ❌ Erreurs               : ${errors.length}`)
console.log(`   ⚠️  Avertissements        : ${warnings.length}`)

process.exit(errors.length > 0 ? 1 : 0)
