#!/usr/bin/env node
/**
 * Script pour :
 * 1. Ajouter la propriété "title" dans le frontmatter des fichiers markdown
 * 2. Renommer les fichiers et dossiers avec le titre slugifié (en gardant le préfixe numérique)
 *
 * Usage: node scripts/slugify-files.mjs [--dry-run]
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
 * Extrait le préfixe numérique d'un nom de fichier/dossier
 * Ex: "01_Introduction.md" -> "01_"
 * Ex: "Généralités.md" -> ""
 */
function extractPrefix(name) {
  const match = name.match(/^(\d+[-_])/);
  return match ? match[1] : "";
}

/**
 * Extrait le nom sans le préfixe numérique et l'extension
 * Ex: "01_Introduction.md" -> "Introduction"
 * Ex: "Généralités sur la publication.md" -> "Généralités sur la publication"
 */
function extractTitle(filename) {
  // Supprime l'extension .md si présente
  const withoutExt = filename.replace(/\.md$/, "");
  // Supprime le préfixe numérique (ex: "01_", "1_", "01-")
  return withoutExt.replace(/^\d+[-_]/, "");
}

/**
 * Génère le nouveau nom slugifié en gardant le préfixe
 * Ex: "01_Bonnes pratiques de nommage.md" -> "01_bonnes-pratiques-de-nommage.md"
 * Ex: "04_Dénomination des voies" -> "04_denomination-des-voies"
 */
function slugifyName(name, isFile = false) {
  const prefix = extractPrefix(name);
  const title = extractTitle(name);
  const slugifiedTitle = slugify(title);

  if (isFile && name.endsWith(".md")) {
    return `${prefix}${slugifiedTitle}.md`;
  }
  return `${prefix}${slugifiedTitle}`;
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
 * Vérifie si le frontmatter contient déjà un title
 */
function hasTitle(frontmatterContent) {
  if (!frontmatterContent) return false;
  return /^title\s*:/m.test(frontmatterContent);
}

/**
 * Ajoute le title au frontmatter
 */
function addTitleToFrontmatter(content, title) {
  const { raw, content: fmContent, body } = parseFrontmatter(content);
  // Escape les guillemets dans le titre
  const escapedTitle = title.replace(/"/g, '\\"');

  if (raw) {
    // Frontmatter existant, ajouter le title au début
    const newFrontmatter = `---\ntitle: "${escapedTitle}"\n${fmContent}\n---`;
    return newFrontmatter + body;
  } else {
    // Pas de frontmatter, en créer un
    return `---\ntitle: "${escapedTitle}"\n---\n\n${content}`;
  }
}

/**
 * Collecte tous les éléments (fichiers et dossiers) à renommer
 * On doit les traiter du plus profond au moins profond pour éviter les conflits
 */
function collectItems(dir, baseDir = dir, items = { files: [], dirs: [] }) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      // Récursion d'abord pour collecter les éléments enfants
      collectItems(fullPath, baseDir, items);

      // Puis ajouter ce dossier
      const newName = slugifyName(entry.name, false);
      if (newName !== entry.name) {
        items.dirs.push({
          fullPath,
          relativePath,
          oldName: entry.name,
          newName,
          parentDir: dir,
        });
      }
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const newName = slugifyName(entry.name, true);
      const title = extractTitle(entry.name);

      items.files.push({
        fullPath,
        relativePath,
        oldName: entry.name,
        newName,
        title,
        parentDir: dir,
        needsRename: newName !== entry.name,
      });
    }
  }

  return items;
}

/**
 * Traite un fichier markdown : ajoute le title au frontmatter
 */
function processFile(fileInfo) {
  const { fullPath, title, relativePath } = fileInfo;
  const content = fs.readFileSync(fullPath, "utf-8");
  const { content: fmContent } = parseFrontmatter(content);

  // Ne pas modifier si le fichier a déjà un title
  if (hasTitle(fmContent)) {
    return { titleSkipped: true };
  }

  const newContent = addTitleToFrontmatter(content, title);

  if (DRY_RUN) {
    console.log(`📝 [DRY-RUN] Ajout title: "${title}" dans ${relativePath}`);
  } else {
    fs.writeFileSync(fullPath, newContent, "utf-8");
    console.log(`✅ Title ajouté: "${title}" dans ${relativePath}`);
  }

  return { titleSkipped: false };
}

/**
 * Renomme un fichier
 */
function renameFile(fileInfo) {
  const { fullPath, oldName, newName, relativePath, parentDir } = fileInfo;

  if (!fileInfo.needsRename) {
    return { renamed: false };
  }

  const newPath = path.join(parentDir, newName);

  if (DRY_RUN) {
    console.log(`📁 [DRY-RUN] Renommer: ${oldName} → ${newName}`);
  } else {
    fs.renameSync(fullPath, newPath);
    console.log(`✅ Renommé: ${oldName} → ${newName}`);
  }

  return { renamed: true };
}

/**
 * Renomme un dossier
 */
function renameDir(dirInfo) {
  const { fullPath, oldName, newName, parentDir } = dirInfo;
  const newPath = path.join(parentDir, newName);

  if (DRY_RUN) {
    console.log(`📂 [DRY-RUN] Renommer dossier: ${oldName} → ${newName}`);
  } else {
    fs.renameSync(fullPath, newPath);
    console.log(`✅ Dossier renommé: ${oldName} → ${newName}`);
  }
}

// Exécution principale
console.log("🚀 Slugification des fichiers et dossiers...\n");

if (DRY_RUN) {
  console.log("⚠️  Mode DRY-RUN activé - aucun fichier ne sera modifié\n");
}

// Collecter tous les éléments
const items = collectItems(DOCS_DIR);

console.log("=== ÉTAPE 1: Ajout des titles dans les frontmatters ===\n");

let titlesAdded = 0;
let titlesSkipped = 0;

for (const file of items.files) {
  const result = processFile(file);
  if (result.titleSkipped) {
    titlesSkipped++;
  } else {
    titlesAdded++;
  }
}

console.log("\n=== ÉTAPE 2: Renommage des fichiers ===\n");

let filesRenamed = 0;

for (const file of items.files) {
  // Mettre à jour le chemin si le dossier parent pourrait avoir changé
  // (mais en dry-run, on utilise le chemin original)
  const result = renameFile(file);
  if (result.renamed) {
    filesRenamed++;
  }
}

console.log(
  "\n=== ÉTAPE 3: Renommage des dossiers (du plus profond au moins profond) ===\n",
);

// Trier les dossiers par profondeur décroissante pour renommer les plus profonds d'abord
items.dirs.sort(
  (a, b) =>
    b.fullPath.split(path.sep).length - a.fullPath.split(path.sep).length,
);

let dirsRenamed = 0;

for (const dir of items.dirs) {
  renameDir(dir);
  dirsRenamed++;
}

console.log("\n📊 Résumé:");
console.log(`   Titles ajoutés: ${titlesAdded}`);
console.log(`   Titles ignorés (existants): ${titlesSkipped}`);
console.log(`   Fichiers renommés: ${filesRenamed}`);
console.log(`   Dossiers renommés: ${dirsRenamed}`);

if (DRY_RUN) {
  console.log("\n💡 Exécutez sans --dry-run pour appliquer les changements.");
}
