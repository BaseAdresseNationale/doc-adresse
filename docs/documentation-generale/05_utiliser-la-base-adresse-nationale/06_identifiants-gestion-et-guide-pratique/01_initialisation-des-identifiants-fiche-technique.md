---
title: "Initialisation des identifiants - Fiche technique"
---

v1.3 de Février 2025


# Initialisation des identifiants - Fiche technique



<table><thead><tr><th width="250">Suivi des modifications</th><th>Texte</th></tr></thead><tbody><tr><td>v1.1 de Juin 2024</td><td>Version initiale</td></tr><tr><td>v1.2 de Septembre 2024</td><td>Chap 4/id_ban_toponyme  : Ajout d'une précision sur le cas des voies à cheval sur 2 communes</td></tr><tr><td>v1.3 de Fev 2025</td><td>Chap 1 : ajout retro-compatibilité BAL 1.3, chap 3 :  ajout précisions</td></tr><tr><td>v1.4 de Fev 2026</td><td>Recommandations pour l'intégrité des identifiants</td></tr></tbody></table>



**Préambule** : cette doc a pour vocation de guider **le gestionnaire de fichiers BAL** qui souhaite initialiser les identifiants BAN dans les Bases Adresses Locales. _Il ne concerne donc pas les communes qui utilisent un outil comme MesAdresses ou un autre outil « local » (geopal ou autre)._

**Vocabulaire** : on parlera dans ce document d’adresse et d’id\_ban\_adresse pour être cohérent avec le format BAL _(même si quand on parle d’identifiant il serait plus juste de parler d’identifiant de lieu adressé : on détaillera cette notion dans la documentation sur les bonnes pratiques des identifiants_).

## 1.    Le format BAL 1.4

C’est la version 1.4 de la spécification BAL qui permet de renseigner  distinctement  les 3 identifiants BAN  `id_ban_commune`  ,  `id_ban_toponyme`  et  `id_ban_adresse` .

<figure><img src="/img/documentation-generale/image.png" alt=""/><figcaption><p>Modèle de données Spec BAL 1.4 avec les 3 identifiants BAN</p></figcaption></figure>

La description de ce format est dans la documentation (page 7 à 11 pour les identifiants BAN), disponible ici :

Format BAL 1.4 :  [https://aitf-sig-topo.github.io/voies-adresses/files/AITF\_SIG\_Topo\_Format\_Base\_Adresse\_Locale\_v1.4.pdf](https://aitf-sig-topo.github.io/voies-adresses/files/AITF_SIG_Topo_Format_Base_Adresse_Locale_v1.4.pdf)



La version du **format BAL 1.3** permet également d'embarquer les identifiants de façon conservatoire.  Pour cela, vous devez utiliser le champ `uid_adresse`, et le remplir en concaténant les 3 identifiants, et en les faisant précéder des suffixes @a: @v: @c: pour gérer les associations.

A l'intérieur de la colonne uid-adresse, l'ordre des éléments n'est pas important.

@a: pour l'`id_ban_adresse`

@v: pour l'`id_ban_toponyme`

@c: pour l'`id_ban_commune`

<figure><img src="/img/documentation-generale/image (1).png" alt=""/><figcaption><p>Exemple de transmission d'identifiants dans le champ uid_adresse de la spec BAL 1.3</p></figcaption></figure>



## 2.    Comment générer l’ id\_ban\_commune (API)

La première étape à réaliser est de récupérer l’ « `id_ban_commune` », qui est le seul fourni et maintenu par la BAN, en utilisant l’url :

`https://plateforme.adresse.data.gouv.fr/api/district/cog/codeInsee`

et en remplaçant « codeInsee» par le **code INSEE** de votre commune.

Par exemple [https://plateforme.adresse.data.gouv.fr/api/district/cog/31555](https://plateforme.adresse.data.gouv.fr/api/district/cog/31555) pour récupérer l' `id_ban_commune` de Toulouse

Si besoin, la doc de l'API (en version Beta) est ici : [DRAFT # API BAN Plateforme · BaseAdresseNationale/ban-plateforme Wiki · GitHub](https://github.com/BaseAdresseNationale/ban-plateforme/wiki/3%E2%80%90-DRAFT-%23-API-BAN-Plateforme)

## 3.    Comment générer des uuid v4 pour les adresses « id\_ban\_adresse » et les odonymes (voies et lieudits) « id\_ban\_toponyme »

NB : le modèle BAN ne fait pas de distinction entre les voies et les lieudits

Les identifiants BAN suivent le format standard UUID v4.

Pour générer des identifiants BAN, vous pouvez :

* utiliser l’API BAN-plateforme :

·        [https://plateforme.adresse.data.gouv.fr/api/ban-id](https://plateforme.adresse.data.gouv.fr/api/ban-id) pour en générer **un**

·        [https://plateforme.adresse.data.gouv.fr/api/ban-id?quantity=10000](https://plateforme.adresse.data.gouv.fr/api/ban-id?quantity=10000) pour en générer 10000 (maxi fixé à 100000)

* ou sinon un site « indépendant » [Online UUID Generator Tool](https://www.uuidgenerator.net/version4)
* ou des outils internes à des bases de données (ex : possible avec Postgres).

## 4.    Règles d’affectation des identifiants

En suivant le format BAL 1.4, chaque ligne du format BAL csv possède les attributs :

·        `id_ban_commune` : c’est la valeur récupérée à l’étape 2. Elle est la même pour toutes les adresses de la commune.  
En cas de fusion de communes : la commune nouvelle devra, lors de sa première publication avvec les BAL fusionnées, récupérer le nouvel `id_ban_commune` dans le registre BAN. Ce nouvel identifiant devra être actualisé sur l'ensemble des adresses des communes fusionnées. 

·        `id_ban_toponyme` : c’est l’identifiant du toponyme (voie ou lieudit). Il est le même pour toutes les lignes qui concernent cette voie ou lieudit. Il est le même si la voie possède des `lieu-dit_complément_nom` différents sur certaines lignes. 


Précisions de traitement : 
_Des voies homonymes mais distinctes sur une même commune_ doivent bien avoir des `id_ban_toponyme` distincts
_pour les voies  à cheval sur 2 communes qui auraient le même libellé_  : la maille de gestion des BAL étant la commune, il est nécessaire d'avoir 2 `id_ban_toponyme` différents, afin de ne pas créer de doublons dans la base quand on agrège les BAL. Ce principe s'applique pour les voies traversantes comme sur les voies limitrophes, à cheval sur deux ou plusieurs communes. 

**Cas particulier des****fusions de voies lors de fusion de communes :** En cas de fusion de communes, il est recommandé d'éviter les doublons d'identifiants pour une même voie qui se retrouverait fusionnée. Plusieurs options de gestion en fonction des scénarios : 
  - "Fusionner" les identifiants en n'en gardant qu'un des deux, qui doit alors être répercuté sur l'ensemble des lignes des adresses de la voie "absorbée" : il est préconisé de garder l'id de la voie de la commune absorbante, ou celui de la voie qui porte le plus grand nombre d'adresses. Le second id est supprimé du fichier. 
  - Créer un nouvel `id_ban_toponyme` pour la nouvelle voie fusionnée, à répercuter sur l'ensemble des lignes des adresses des deux voies initiales. Les deux précédents id sont supprimés. 


·        `id_ban_adresse` : c’est l’identifiant de l’adresse. Il est le même pour toutes les positions de l’adresse (pour ceux qui souhaitent gérer plusieurs positions).

**Cas particulier des****voies sans numéro :** il vous faudra générer un id\_ban\_toponyme pour l'odonyme (voie ou lieu-dit sans numéro). L'id\_ban\_adresse ne sera pas rempli pour ces lignes de voies sans numéro. 


## 5.    …Et republier la BAL

Si jamais vous rencontrez une difficulté : [adresse@data.gouv.fr](mailto:adresse@data.gouv.fr)

## 6.    Enjeu de l'intégrité des identifiants

Ces clés techniques sont la base du calcul des informations de généalogie de l'adresse, il est essentiel de s'assurer de leur conformité, intégrité et pérennnité dans le temps. L'introduction d'identifiants erronés dans la base d'historique entrainerait une inexploitabilité des données. 
Une analogie simple pour comprendre le rôle des identifiants est de le considérer comme le "numéro de sécurité sociale" de l'adresse. Les identifiants une fois affectés aux objets doivent rester les mêmes tout au long de leur cycle de vie pour en permettre la gestion au cours de leur différentes évolutions.  
Des contrôles d'intégrité des identifiants à la publication dans la BAN sont en place, pour garantir leur conformité, et leur pérennité dans le temps. Les erreurs détectées par ces contrôles sont signalées dans les rapports de publication, et devront être corrigées avant la publication effective dans la BAN. 

Les contrôles détectent notamment comme des erreurs :  
- un `id_ban_commune` qui ne correspond pas à celui du registre de la BAN
- des champs identifiants partiellement vides dans le fichier : lorsque les identifiants sont pris en charge, ils doivent l'être de façon conforme sur l'ensemble du fichier BAL, quelque soit la version de la spécification BAL utilisée.
- des identifiants différents sur un même libellé de voie
- des identifiants déjà utilisés dans la base. L'ensemble des identifiants utilisés est stocké en base, même s'il est supprimé. Un identifiant supprimé ne peut donc pas être réutilisé pour un autre objet.
- des modifications d'identifiants en masse par rapport à la précédente publication. Un seuil de 80% est appliqué. Les identifiants une fois affectés aux objets doivent rester les mêmes tout au long de leur cycle de vie. Il faut donc veiller pour une mise à jour des fichiers d'adresses, et notamment en cas de changement d'outil de publication, **à repartir de la version de référence du fichier telle qu'elle est publiée dans la BAN.** 


