# Outils pour vérifier les adresses

* [L’explorateur de la Base Adresse Nationale](https://adresse.data.gouv.fr/base-adresse-nationale#4.4/46.9/1.7)\*\
  Cet explorateur montre sur un fond de carte les adresses officielles par commune (par arrondissement pour les plus grandes), avec indication des sources, de leur certification, des parcelles cadastrales associées, les lieux-dits. Un petit outil est embarqué pour ouvrir une adresse sur un navigateur sur portable ou tablette au cas où l’adresse n’est pas encore référencée dans un GPS. En cliquant sur le nom de la commune, l’utilisateur arrive à la page d’information des adresses (cf infra).\
  **Usages :** vérifier ses adresses.
* [La page d’information des adresses par commune](https://adresse.data.gouv.fr/#rechercher-une-commune)\* \
  Cette page du site contient les fichiers adresse de la commune restitués par la Base Adresse Nationale en plusieurs formats (BAL 1.3 avec les mêmes noms de colonnes que le format BAL 1.3) ou format historique (avec d’autres colonnes pour le code FANTOIR, le format AFNOR, les noms des anciennes communes), des informations de qualité des adresses par commune, les dernières mises à jour, le contact de la commune en cas de besoin de signalement.\
  **Usages :** vérifier la qualité des adresses, communiquer le lien aux partenaires de la commune pour téléchargement des adresses (SDIS, opérateurs, etc.).
* [L'explorateur FANTOIR](https://adresse.data.gouv.fr/fantoir)\
  Fichier produit par la DGFiP, le FANTOIR recense par commue, les voies, lieux-dits et ensembles immobiliers.\
  Usages : vérifier les lieux-dits, attention toutefois car la liste n'est pas forcément ex- haustive, des libellés peuvent être à corriger.
* [La documentation sur le format Base Adresse Locale](https://doc.adresse.data.gouv.fr/mettre-a-jour-sa-base-adresse-locale/le-format-base-adresse-locale)\*\*\
  Cette page technique s'adresse aux communes et EPCI qui gèrent les adresses sur leur propre outil. Les communes qui utilisent l’éditeur Mes Adresses suivent ce for- mat sans avoir à paramétrer quoi que ce soit, l’outil s'en charge.\
  **Usages :** vérifier si les champs obligatoires sont bien présents lors de l'export du fi- chier depuis le SIG avant de le passer dans le validateur de Base Adresse Locale.
* [Le validateur de Base Adresse Locale](https://adresse.data.gouv.fr/bases-locales/validateur)\*\*\
  Cet outil vérifie en ligne si les données respectent le format Base Adresse Locale. Il ne vérifie pas la conformité des latitudes et longitudes par contre.\
  **Usages :** diagnostiquer les erreurs éventuelles avant de déposer son fichier dans la BAN. Ne s'adresse pas aux communes qui utilisent Mes Adresses ou le formulaire de dépôt (le validateur est intégré dans ces outils).
* [État de la Base Adresse Nationale par commune](https://www.data.gouv.fr/fr/datasets/etat-de-la-base-adresse-nationale-par-commune/)\*\*\
  Ce jeu de données présente l'état de la Base Adresse Nationale pour chaque commune.\
  **Usages :** l'analyse de l'adressage est là pour aider les chefs de file territoriaux et les acteurs nationaux à identifier les communes les plus "en retard" en terme d'adressage. Il s'agit d'estimations basées sur le jeu de données du Nombre de locaux adressables par commune. Cette approximation n'est pertinente que pour les petites communes essentiellement résidentielles et pavillonnaires.
* [Le nombre de locaux adressables par communes](https://www.data.gouv.fr/fr/datasets/nombre-de-locaux-adressables-par-communes/)\*\*\
  Ce jeu de données propose un décompte du nombre de locaux adressables par commune, ainsi que le nombre d'adresses associées estimées.\
  **Usages :** évaluer les manques éventuels.
* [L’API FANTOIR](https://github.com/BaseAdresseNationale/api-fantoir/blob/master/README.md#api)\*\* \
  **Usages :** consulter la base FANTOIR de la DGFiP par API
