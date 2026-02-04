#!/usr/bin/env node
/**
 * Script pour ajouter automatiquement des slugs dans le frontmatter
 * des fichiers markdown de la documentation Docusaurus.
 *
 * Usage: node scripts/add-slugs.mjs [--dry-run]
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
 * Convertit une chaîne en slug (minuscules, sans accents, tirets à la place des espaces)
 */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^a-z0-9]+/g, "-") // Remplace les caractères non-alphanumériques par des tirets
    .replace(/^-+|-+$/g, "") // Supprime les tirets en début et fin
    .replace(/-+/g, "-"); // Remplace les tirets multiples par un seul
}

/**
 * Extrait le nom sans le préfixe numérique et l'extension
 * Ex: "01_Introduction.md" -> "Introduction"
 * Ex: "Généralités sur la publication.md" -> "Généralités sur la publication"
 */
function extractName(filename) {
  // Supprime l'extension .md
  const withoutExt = filename.replace(/\.md$/, "");
  // Supprime le préfixe numérique (ex: "01_", "1_", "01-")
  return withoutExt.replace(/^\d+[-_]/, "");
}

/**
 * Génère le slug complet pour un fichier en fonction de son chemin relatif
 */
function generateSlug(relativePath) {
  const parts = relativePath.split(path.sep);
  const slugParts = parts.map((part, index) => {
    // Pour le dernier élément (le fichier), on extrait le nom sans extension
    if (index === parts.length - 1) {
      return slugify(extractName(part));
    }
    // Pour les dossiers, on extrait juste le nom sans préfixe
    return slugify(extractName(part));
  });

  return slugParts.join("/");
}

/**
 * Parse le frontmatter d'un fichier markdown
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontmatterRegex);

  if (match) {
    return {
      raw: match[0],
      content: match[1],
      body: content.slice(match[0].length),
    };
  }

  return {
    raw: null,
    content: null,
    body: content,
  };
}

/**
 * Vérifie si le frontmatter contient déjà un slug
 */
function hasSlug(frontmatterContent) {
  if (!frontmatterContent) return false;
  return /^slug\s*:/m.test(frontmatterContent);
}

/**
 * Ajoute le slug au frontmatter
 */
function addSlugToFrontmatter(content, slug) {
  const { raw, content: fmContent, body } = parseFrontmatter(content);

  if (raw) {
    // Frontmatter existant, ajouter le slug
    const newFrontmatter = `---\n${fmContent}\nslug: ${slug}\n---`;
    return newFrontmatter + body;
  } else {
    // Pas de frontmatter, en créer un
    return `---\nslug: ${slug}\n---\n\n${content}`;
  }
}

/**
 * Parcourt récursivement un dossier et retourne tous les fichiers .md
 */
function getMarkdownFiles(dir, baseDir = dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push({
        fullPath,
        relativePath: path.relative(baseDir, fullPath),
      });
    }
  }

  return files;
}

/**
 * Traite un fichier markdown
 */
function processFile(fileInfo) {
  const { fullPath, relativePath } = fileInfo;
  const content = fs.readFileSync(fullPath, "utf-8");
  const { content: fmContent } = parseFrontmatter(content);

  // Ne pas modifier si le fichier a déjà un slug
  if (hasSlug(fmContent)) {
    console.log(`⏭️  Skip (slug existant): ${relativePath}`);
    return { skipped: true };
  }

  const slug = generateSlug(relativePath);
  const newContent = addSlugToFrontmatter(content, `/${slug}`);

  if (DRY_RUN) {
    console.log(`📝 [DRY-RUN] ${relativePath}`);
    console.log(`   Slug: ${slug}`);
  } else {
    fs.writeFileSync(fullPath, newContent, "utf-8");
    console.log(`✅ Modifié: ${relativePath}`);
    console.log(`   Slug: ${slug}`);
  }

  return { skipped: false, slug };
}

// Exécution principale
console.log("🚀 Ajout des slugs aux fichiers markdown...\n");

if (DRY_RUN) {
  console.log("⚠️  Mode DRY-RUN activé - aucun fichier ne sera modifié\n");
}

const files = getMarkdownFiles(DOCS_DIR);
let processed = 0;
let skipped = 0;

for (const file of files) {
  const result = processFile(file);
  if (result.skipped) {
    skipped++;
  } else {
    processed++;
  }
}

console.log("\n📊 Résumé:");
console.log(`   Fichiers traités: ${processed}`);
console.log(`   Fichiers ignorés: ${skipped}`);
console.log(`   Total: ${files.length}`);

if (DRY_RUN) {
  console.log("\n💡 Exécutez sans --dry-run pour appliquer les changements.");
}
