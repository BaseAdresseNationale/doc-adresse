#!/usr/bin/env node
/**
 * Script pour détecter et corriger les liens internes cassés dans les fichiers markdown
 * suite au renommage des fichiers et dossiers.
 *
 * Usage: node scripts/fix-internal-links.mjs [--dry-run]
 *
 * Options:
 *   --dry-run  Affiche les changements sans modifier les fichiers
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, "..", "docs");
const DRY_RUN = process.argv.includes("--dry-run");

/**
 * Convertit une chaîne en slug
 */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

/**
 * Slugifie un segment de chemin (fichier ou dossier) en gardant le préfixe numérique
 */
function slugifySegment(segment) {
  // Gère l'extension .md
  const hasExtension = segment.endsWith(".md");
  const withoutExt = hasExtension ? segment.slice(0, -3) : segment;

  // Extrait le préfixe numérique
  const match = withoutExt.match(/^(\d+[-_])?(.*)$/);
  if (match) {
    const prefix = match[1] || "";
    const name = match[2];
    const slugified = slugify(name);
    return `${prefix}${slugified}${hasExtension ? ".md" : ""}`;
  }

  return `${slugify(withoutExt)}${hasExtension ? ".md" : ""}`;
}

/**
 * Slugifie un chemin complet
 */
function slugifyPath(linkPath) {
  // Sépare les segments
  const segments = linkPath.split("/");

  // Slugifie chaque segment
  const slugifiedSegments = segments.map((segment) => {
    if (segment === "" || segment === "." || segment === "..") {
      return segment;
    }
    return slugifySegment(segment);
  });

  return slugifiedSegments.join("/");
}

/**
 * Récupère tous les fichiers markdown récursivement
 */
function getMarkdownFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      getMarkdownFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extrait tous les liens d'un contenu markdown
 * Retourne un tableau d'objets { match, text, url, start, end }
 */
function extractLinks(content) {
  const links = [];

  // Pattern pour les liens markdown [text](url)
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;

  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[2];

    // Ignore les liens externes (http, https, mailto, etc.)
    if (/^(https?:|mailto:|tel:|#)/.test(url)) {
      continue;
    }

    // Ignore les liens vers des images et fichiers statiques
    if (
      /\.(png|jpg|jpeg|gif|svg|webp|pdf|docx?|xlsx?|ods|odt|zip|csv)$/i.test(
        url,
      )
    ) {
      continue;
    }

    // Ignore les liens vers /img/ (fichiers statiques)
    if (/^<?\/?img\//.test(url) || /^<?\/?static\//.test(url)) {
      continue;
    }

    // Ne traite que les liens vers /docs/ ou les liens relatifs vers des .md
    const isDocsLink = /^\/docs\//.test(url) || /\/docs\//.test(url);
    const isRelativeMdLink = /\.md($|#)/.test(url);

    if (!isDocsLink && !isRelativeMdLink) {
      continue;
    }

    links.push({
      fullMatch: match[0],
      text: match[1],
      url: url,
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return links;
}

/**
 * Vérifie si un lien a besoin d'être mis à jour
 */
function needsUpdate(url) {
  // Décode l'URL (pour gérer les %20, %C3%A9, etc.)
  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(url);
  } catch (e) {
    decodedUrl = url;
  }

  // Supprime les ancres (#section)
  const urlWithoutAnchor = decodedUrl.split("#")[0];

  // Vérifie si l'URL contient des caractères qui devraient être slugifiés
  // (espaces, accents, majuscules dans les noms de fichiers/dossiers)
  const hasSpaces = /%20/.test(url) || / /.test(decodedUrl);
  const hasAccents = /[àâäéèêëïîôùûüç]/i.test(decodedUrl);
  const hasEncodedAccents = /%[CEce][0-9A-Fa-f]/.test(url);
  const hasUpperCase = /[A-ZÀÂÄÉÈÊËÏÎÔÙÛÜÇ]/.test(
    urlWithoutAnchor.replace(/^\.\.?\/?/, ""),
  );

  return hasSpaces || hasAccents || hasEncodedAccents || hasUpperCase;
}

/**
 * Convertit une ancienne URL en nouvelle URL slugifiée
 */
function convertUrl(url) {
  // Décode l'URL
  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(url);
  } catch (e) {
    decodedUrl = url;
  }

  // Sépare l'ancre si présente
  const [pathPart, anchor] = decodedUrl.split("#");

  // Slugifie le chemin
  const slugifiedPath = slugifyPath(pathPart);

  // Reconstruit l'URL avec l'ancre
  if (anchor) {
    return `${slugifiedPath}#${anchor}`;
  }

  return slugifiedPath;
}

/**
 * Traite un fichier markdown
 */
function processFile(filePath) {
  const relativePath = path.relative(DOCS_DIR, filePath);
  const content = fs.readFileSync(filePath, "utf-8");

  const links = extractLinks(content);
  const updates = [];

  for (const link of links) {
    if (needsUpdate(link.url)) {
      const newUrl = convertUrl(link.url);

      if (newUrl !== link.url) {
        updates.push({
          oldUrl: link.url,
          newUrl: newUrl,
          text: link.text,
          fullMatch: link.fullMatch,
          newMatch: `[${link.text}](${newUrl})`,
        });
      }
    }
  }

  if (updates.length === 0) {
    return { file: relativePath, updates: [], modified: false };
  }

  // Applique les modifications
  let newContent = content;
  for (const update of updates) {
    newContent = newContent.replace(update.fullMatch, update.newMatch);
  }

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, newContent, "utf-8");
  }

  return { file: relativePath, updates, modified: true };
}

// Exécution principale
console.log("🔍 Recherche et correction des liens internes cassés...\n");

if (DRY_RUN) {
  console.log("⚠️  Mode DRY-RUN activé - aucun fichier ne sera modifié\n");
}

const files = getMarkdownFiles(DOCS_DIR);
let totalUpdates = 0;
let filesModified = 0;

for (const file of files) {
  const result = processFile(file);

  if (result.modified) {
    filesModified++;

    console.log(`📄 ${result.file}`);
    for (const update of result.updates) {
      totalUpdates++;
      console.log(`   🔗 ${update.oldUrl}`);
      console.log(`   ➡️  ${update.newUrl}`);
    }
    console.log("");
  }
}

console.log("📊 Résumé:");
console.log(`   Fichiers analysés: ${files.length}`);
console.log(`   Fichiers modifiés: ${filesModified}`);
console.log(`   Liens corrigés: ${totalUpdates}`);

if (DRY_RUN && totalUpdates > 0) {
  console.log("\n💡 Exécutez sans --dry-run pour appliquer les changements.");
}

if (totalUpdates === 0) {
  console.log("\n✅ Aucun lien cassé détecté !");
}
