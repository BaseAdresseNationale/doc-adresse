---
title: "Faq identifiants"
---

# FAQ Identifiants



### ·        Format uuid\_v4 : avez-vous étudié la possibilité d'utiliser des nano-id, plus compact et utilisables par des humains ? C'est le choix fait coté référentiel national des bâtiments.

L'objectif est différent :

* Le RNB a bien pour objectif d'être partagé par des humains, l’identifiant bâtiment c’est un peu la « plaque d’immatriculation » du bâtiment.
* Sur la BAN, l’information échangée par les humains c’est l’adresse elle-même, l'ID est considéré comme une donnée technique, pour des besoins de gestion. De plus, une contrainte était de pouvoir les produire par de multiples systèmes. Le standard UUID est plus universel à ce niveau.



### ·        L'id BAN actuel sera t'il différent de celui visible sur la BAN ?

Oui, ce nouvel identifiant à vocation à remplacer la clé d'interopérabilité.

Cohabitation du nouvel identifiant avec la clé d’interopérabilité pendant une période transitoire.

L'identifiant est défini dans la version 1.4 de la spécification BAL.



### ·        Est-il prévu de faire disparaitre le champ cle\_interop une fois les identifiants bien en place?

Prévu de le conserver en parallèle pour l'instant



### ·        Le code Fantoir sera-t-il maintenu à l'avenir ?

Il est bien dans notre objectif de conserver dans les informations associées à l’adresse la clé de liaison avec le référentiel FANTOIR, devenu **code\_TOPO**.

La clé d’interopérabilité, qui intègre en dur la clé RIVOLI, sera conservée dans un premier temps, pendant une période transitoire encore non déterminée.  Réflexion ultérieure à tenir en coordination avec le travail du GT route pour permettre la jointure du référentiel adresse avec le référentiel de routes.



## ·        id\_BAN uniquement pour les adresses certifiées ?

Non sur toutes les adresses, ces deux informations sont indépendantes.
