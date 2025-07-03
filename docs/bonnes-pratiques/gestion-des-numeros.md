# Gestion des numéros

Les numéros s’échelonnent de 1 à 9999. Une adresse comportant un zéro ou un numéro de 10000 ou au-delà n’est pas prise en compte.

- Les numéros se suivent **depuis le centre vers la périphérie** et en cas d’ambiguïté, il convient de choisir le sens de l’Est vers l’Ouest et du Nord vers le Sud ;
- Les **numéros pairs et impairs ne se succèdent pas d’un même côté de voie**. Les pairs sont positionnés à droite, les impairs à gauche depuis le début de la voie (**ce n'est pas une obligation**, mais une pratique courante, la commune peut donc adapter les numéros à la réalité du terrain) ;&#x20;
- **Prévoir des numéros** pour de nouvelles habitations à venir ;&#x20;
- Ne pas mélanger les suffixes bis, ter, quater et les lettres A, B, C, D dans la numérotation d'une même voie. En cas de numérotation métrique, éviter totalement les suffixes et ajouter ou supprimer un mètre.
- Le numérotage procède de **proche en proche sur les voies comme dans les lieux-dits** :

<figure><img src=".gitbook/assets/Capture d’écran 2022-12-30 à 11.35.55.png" alt=""/><figcaption></figcaption></figure>

La commune a le choix de placer le nom du lieu-dit dans la liste des voies (voie_nom du format base Adresse Locale) ou dans la liste des lieux-dits (liste des toponymes dans l’éditeur Mes Adresses ou lieu-dit_complement_nom du format Base Adresse Locale). La limite est celle de la cohérences des numéros :

- &#x20;le lieux-dit comprend quelques numéros qui pourront conserver une cohérence si le nom reste dans la liste des voies : il peut figurer dans la liste des voies, inutile de tout recommencer, de perturber les habitants sans gain de précision.
- le lieu-dit comprend des voies qui se croisent, avec des numéros qui ne pourraient pas se suivre s'ils restaient affectés au lieu-dit : les lieux-dits sont créés dans la liste des lieux-dits (lieu-dit_complement_nom du format BAL, liste des toponymes dans Mes Adresses) et associés aux numéros (voir [https://doc.adresse.data.gouv.fr/mettre-a-jour-sa-base-adresse-locale/le-format-base-adresse-locale/la-gestion-des-hameaux-et-lieux-dits](https://doc.adresse.data.gouv.fr/mettre-a-jour-sa-base-adresse-locale/le-format-base-adresse-locale/la-gestion-des-hameaux-et-lieux-dits))

Dans un lieu-dit, si les numéros ne peuvent pas se suivre sur le même tronçon, ils sont affectés à ses voies et non au lieu-dit directement.

<figure><img src=".gitbook/assets/Capture d’écran 2022-12-30 à 11.37.59.png" alt=""/><figcaption></figcaption></figure>

La commune doit dénommer toutes ses voies, y compris celles qui traversent des lieux- dits. Aucun texte ne l’oblige à numéroter les locaux seulement sur les voies et pas sur les lieux-dits, et encore moins à supprimer les lieux-dits.
