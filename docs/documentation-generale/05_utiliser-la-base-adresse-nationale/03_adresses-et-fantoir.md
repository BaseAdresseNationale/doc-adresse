---
title: "Adresses et FANTOIR"
---

# base FANTOIR de la DGFIP

La base FANTOIR répertorie le nom des voies des lieux-dits; des ensembles
immobiliers (voie dans les lotissements, etc.); des pseudo-voies (canaux,
etc). La DGFiP attribue un code à chaque voie.
Note : Cette base est dépréciée depuis 2023 et remplacée par la base TOPO.

# Adresses et FANTOIR, la clé d'interopérabilité

La clé d'intéropérabilité, clé technique associée à chaque adresse et voie de la BAN, s'appuie sur le code FANTOIR. Cette clé d'intéropérabilité est définie dans la spécification BAL.
La Base Adresse Nationale ne conserve pas le code FANTOIR fourni dans le fichier Base Adresse Locale.
L'éditeur de Bases Adresses Locales [Mes Adresses](https://mes-adresses.data.gouv.fr/) ne permet pas de gérer le code FANTOIR.

La BAN recalcule donc la clé d'interopérabilité à partir de l'association avec les codes FANTOIR des fichiers provenant de la DGFIP. La BAN attribue un code automatiquement à chaque mise à jour. Si aucun code n’est trouvé en correspondance, un pseudo_code spécifique transitoire à 6 caractères est généré.

Si la commune ne connait pas le code FANTOIR ou n’a pas les moyens de le renseigner, elle peut laisser le code à vide « 0000 » ou « xxxx ».

Un [explorateur FANTOIR](https://adresse.data.gouv.fr/outils/fantoir) est à disposition pour retrouver le code. Pour un usage avancé, l'[API FANTOIR](https://github.com/BaseAdresseNationale/api-fantoir/blob/master/README.md#api) est à disposition à partir de la page des [outils](https://adresse.data.gouv.fr/outils).

La clé d'interopérabilité ayant montré des limites en terme de stabilité, un travail de définition de nuveaux identifiants techniques a été lancé en 2023. La clé d'intéropérabilité est dépréciée dans la BAL à partir de la version BAL 1.5, au profit des nouveaux identifiants BAN. Elle continue a être prise en charge par la BAN pendant une période transitoire pour assurer la continuité de service.
