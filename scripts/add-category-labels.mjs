#!/usr/bin/env node
/**
 * Script pour ajouter des fichiers _category_.json dans chaque dossier
 * afin de définir le label affiché dans la sidebar Docusaurus.
 *
 * Usage: node scripts/add-category-labels.mjs [--dry-run]
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
 * Mapping des noms de dossiers slugifiés vers les labels lisibles avec accents
 * Ce mapping est généré manuellement ou peut être extrait des fichiers index
 */
const LABEL_MAPPING = {
  // Dossiers principaux
  "bonnes-pratiques": "Bonnes Pratiques",
  "documentation-generale": "Documentation Générale",
  "mes-adresses": "Mes Adresses",

  // Bonnes pratiques
  "denomination-des-voies-et-lieux-dits":
    "Dénomination des voies et lieux-dits",
  "bonnes-pratiques-pour-nommer-les-lieux-dits-et-hameaux":
    "Bonnes pratiques pour nommer les lieux-dits et hameaux",
  "denommer-en-francais-et-dans-les-langues-regionales":
    "Dénommer en français et dans les langues régionales",
  "numerotage-des-locaux-dans-les-voies-et-lieux-dits":
    "Numérotage des locaux dans les voies et lieux-dits",
  "gestion-des-positions": "Gestion des positions",
  "acter-en-conseil-municipal-le-nommage-et-le-numerotage":
    "Acter en conseil municipal le nommage et le numérotage",
  "transmettre-les-information-a-la-base-adresse-nationale":
    "Transmettre les informations à la Base Adresse Nationale",
  "signaletique-et-information-des-habitants":
    "Signalétique et information des habitants",
  "les-outils-de-la-fabrique-de-l-adresse":
    "Les outils de la fabrique de l'adresse",

  // Documentation générale
  "naviguer-sur-le-site": "Naviguer sur le site",
  "utiliser-la-base-adresse-nationale": "Utiliser la Base Adresse Nationale",
  "identifiants-gestion-et-guide-pratique":
    "Identifiants gestion et guide pratique",
  "gestion-des-identifiants-bonnes-pratiques":
    "Gestion des identifiants - Bonnes pratiques",
  "mettre-a-jour-sa-base-adresse-locale":
    "Mettre à jour sa Base Adresse Locale",
  "le-format-base-adresse-locale": "Le format Base Adresse Locale",
  "adresse-en-region": "Adresse en région",

  // Mes adresses
  "creer-une-base-adresse-locale": "Créer une Base Adresse Locale",
  "publier-une-base-adresse-locale": "Publier une Base Adresse Locale",
  "editer-une-base-adresse-locale": "Éditer une Base Adresse Locale",
  "generalites-sur-l-edition": "Généralités sur l'édition",
  "ajouter-une-voie-ou-un-lieu-dit-simple":
    "Ajouter une voie ou un lieu-dit simple",
  "gestion-des-numeros-et-des-positions":
    "Gestion des numéros et des positions",
  "les-demandes-d-ameliorations": "Les demandes d'améliorations",
  "traiter-les-signalements": "Traiter les signalements",
};

/**
 * Extrait le nom sans le préfixe numérique
 */
function extractNameWithoutPrefix(dirname) {
  return dirname.replace(/^\d+[-_]/, "");
}

/**
 * Extrait le label lisible à partir du mapping ou génère un label par défaut
 */
function extractLabel(dirname) {
  const nameWithoutPrefix = extractNameWithoutPrefix(dirname);

  // Chercher dans le mapping
  if (LABEL_MAPPING[nameWithoutPrefix]) {
    return LABEL_MAPPING[nameWithoutPrefix];
  }

  // Fallback: générer un label à partir du nom slugifié
  return nameWithoutPrefix
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Extrait la position depuis le préfixe numérique
 * Ex: "04_denomination-des-voies" -> 4
 */
function extractPosition(dirname) {
  const match = dirname.match(/^(\d+)[-_]/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Parcourt récursivement un dossier et retourne tous les sous-dossiers
 */
function getDirectories(dir, baseDir = dir, dirs = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);

      dirs.push({
        fullPath,
        relativePath,
        name: entry.name,
      });

      // Récursion pour les sous-dossiers
      getDirectories(fullPath, baseDir, dirs);
    }
  }

  return dirs;
}

/**
 * Crée ou met à jour le fichier _category_.json dans un dossier
 */
function processCategoryFile(dirInfo) {
  const { fullPath, relativePath, name } = dirInfo;
  const categoryFilePath = path.join(fullPath, "_category_.json");

  const label = extractLabel(name);
  const position = extractPosition(name);

  // Vérifie si le fichier existe déjà
  let existingCategory = null;
  if (fs.existsSync(categoryFilePath)) {
    try {
      existingCategory = JSON.parse(fs.readFileSync(categoryFilePath, "utf-8"));
    } catch (e) {
      // Fichier invalide, on le remplace
    }
  }

  // Si le fichier existe et a déjà un label, on skip
  if (existingCategory && existingCategory.label) {
    console.log(`⏭️  Skip (existe déjà): ${relativePath}/_category_.json`);
    return { skipped: true };
  }

  // Créer le contenu du fichier _category_.json
  const categoryContent = {
    label,
    ...(position !== null && { position }),
    collapsed: true,
  };

  if (DRY_RUN) {
    console.log(`📝 [DRY-RUN] Créer: ${relativePath}/_category_.json`);
    console.log(
      `   Label: "${label}"${position !== null ? `, Position: ${position}` : ""}`,
    );
  } else {
    fs.writeFileSync(
      categoryFilePath,
      JSON.stringify(categoryContent, null, 2) + "\n",
      "utf-8",
    );
    console.log(`✅ Créé: ${relativePath}/_category_.json`);
    console.log(
      `   Label: "${label}"${position !== null ? `, Position: ${position}` : ""}`,
    );
  }

  return { skipped: false };
}

// Exécution principale
console.log("🚀 Ajout des fichiers _category_.json...\n");

if (DRY_RUN) {
  console.log("⚠️  Mode DRY-RUN activé - aucun fichier ne sera créé\n");
}

const directories = getDirectories(DOCS_DIR);
let created = 0;
let skipped = 0;

for (const dir of directories) {
  const result = processCategoryFile(dir);
  if (result.skipped) {
    skipped++;
  } else {
    created++;
  }
}

console.log("\n📊 Résumé:");
console.log(`   Fichiers créés: ${created}`);
console.log(`   Fichiers ignorés: ${skipped}`);
console.log(`   Total dossiers: ${directories.length}`);

if (DRY_RUN) {
  console.log("\n💡 Exécutez sans --dry-run pour appliquer les changements.");
}
