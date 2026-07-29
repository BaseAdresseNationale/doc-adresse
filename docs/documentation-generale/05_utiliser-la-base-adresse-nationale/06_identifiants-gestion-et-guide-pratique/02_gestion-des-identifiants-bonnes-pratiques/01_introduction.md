---
title: "Introduction"
---

## Objectif du document

Définir et partager les bonnes pratiques pour garantir au mieux **l’unicité et la stabilité** des identifiants. Cette stabilité tout au long de la vie des objets est une nécessité pour un référentiel. Ce guide est complémentaire la doc de mise en œuvre ([Initialisation_des_identifiants_fiche_technique](/docs/documentation-generale/utiliser-la-base-adresse-nationale/identifiants-gestion-et-guide-pratique/initialisation-des-identifiants-fiche-technique)).

L’identifiant est une clé technique permettant aux systèmes utilisateurs de croiser la donnée BAN avec leurs données métier, et ainsi d’y intégrer de façon réactive les actualisations. L’enjeu est donc de garantir la plus grande stabilité possible des identifiants afin d’optimiser son utilisation.

## Cible

La gestion technique des identifiants doit être transparente pour les communes.\
Ce guide n’est donc pas à destination des communes, mais des producteurs en charge de la mise à disposition des BALs et responsables de mettre en œuvre et de maintenir les identifiants : les administrateurs de base de données, les éditeurs de logiciels de saisie/MAJ de BAL, etc.

NB : le vocabulaire employé dans cette doc reprend dans la mesure du possible la terminologie du standard Adresse (avec précision du terme employé dans le format BAL si besoin).

## Préambule

Cette problématique de l’identifiant renvoie directement à la définition d’une adresse et son cycle de vie. Contrairement à un bâtiment, qui est un objet qui a une existence physique sur le terrain pour lequel il est plutôt facile de dire quand il est créé ou détruit, pour l’adresse c’est plus compliqué : on parle plutôt de lieu (ou objet géographique) adressé… Et on le distinguera bien de l' « expression littérale de l’adresse » qu’est la chaine de caractère (ex: 5 la Sauvinière 85620 Rocheservière ) qui est l'’identifiant de l’adresse pour les humains.

Donc, quand on parle d’adresse c’est pour identifier des lieux : l’objet adresse de la BAN (le ponctuel) représente un lieu adressé dans la réalité.

Le standard Adresse dans son introduction parle de « concept d’adresse » .Et on parle moins d’adresse comme un objet que d’« Informations structurées permettant de caractériser un objet de manière non ambiguë à des fins d'identification et de localisation ».

Ce document n’a pas vocation à recenser tous les cas mais, à la manière des guides d’adressage, de décrire les cas les plus fréquents. Les cas particuliers n’entrent pas ~~forcément~~ dans ce cadre, mais pourront faire l’objet d’échanges au sein de la communauté (et le cas échéant viendront alimenter cette documentation en fonction de leur récurrence).

Ce principe de stabilité est valable pour les 3 identifiants décrits dans le format BAL (cf. « [Initialisation_des_identifiants_fiche_technique ](/docs/documentation-generale/utiliser-la-base-adresse-nationale/identifiants-gestion-et-guide-pratique/initialisation-des-identifiants-fiche-technique)» sur la notion des 3 identifiants).\
Ce document se concentre sur la stabilité de l’**id_ban_adresse** qui est l’enjeu principal.
