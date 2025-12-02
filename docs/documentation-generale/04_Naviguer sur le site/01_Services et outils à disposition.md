# Services et outils à disposition

### Disponibilité des services

- [Disponibilité des différents services de l'adresse](https://status.adresse.data.gouv.fr/) (les API, le géodocodeur, Mes Adresses...)

### Consulter les adresses des communes

- [La page d'information sur la commune](https://adresse.data.gouv.fr/#rechercher-une-commune) : permet de connaître l'avancée des adresses de la commune, le nombre d'adresses certifiées et de télécharger le **fichier de la Base Adresse Nationale** pour cette commune.
- [L'Explorateur de Base Adresse Nationale](https://adresse.data.gouv.fr/base-adresse-nationale#4.4/46.9/1.7) avec visualisation des adresses par commune, leur certification, les sources des adresses, les parcelles cadastrales associées. Sur mobile ou tablette : sélectionner le point GPS associé l'ouvre dans un navigateur GPS.

### Utiliser la Base Adresse Nationale

- [Les fichiers](https://adresse.data.gouv.fr/donnees-nationales) de la Base Adresse Nationale en plusieurs formats, actualisés une fois par semaine. Ces fichiers sont découpés par département - pour une recherche de fichier par commune voir supra.
- [L'API Adresse](https://geo.api.gouv.fr/adresse) et sa [documentation](https://guides.etalab.gouv.fr/apis-geo/1-api-adresse.html#les-donnees-d-adresses). Pour héberger sa propre instance, voir[ ici.](https://github.com/BaseAdresseNationale/addok-docker)
- [L'Explorateur de Base Adresse Nationale](https://adresse.data.gouv.fr/base-adresse-nationale#4.4/46.9/1.7), avec visualisation des adresses dans la Base Adresse Nationale qui précise les adresses certifiées par la commune, les sources des adresses, les parcelles cadastrales associées. Sur mobile ou tablette : sélectionner le point GPS associé l'ouvre dans un navigateur GPS.

### Suivre l'actualité de l'adresse

- La page [Événements autour de l'adresse](https://adresse.data.gouv.fr/evenements)
- Fil Twitter [@AdresseDataGouv](https://twitter.com/adressedatagouv?lang=fr)
- [Infolettre](https://adresse.data.gouv.fr/#newsletter)
- [Le blog](https://adresse.data.gouv.fr/blog)

### Découvrir le sujet de l'adresse, ses bonnes pratiques

- Le Guide des bonnes pratiques de l'adresse détaille les règles et normes en vigueur ([format texte](https://guide-bonnes-pratiques.adresse.data.gouv.fr/) et [PDF](https://adresse.data.gouv.fr/data/docs/guide-bonnes-pratiques-v2.1.pdf)).
- Les [Témoignages en ligne](https://adresse.data.gouv.fr/bases-locales/temoignages) exposent des cas concrets d'adressage par les communes et des EPCI.
- [La plaquette de communication](https://www.amenagement-numerique.gouv.fr/files/2021-04/BAL%20plaquette%20pr%C3%A9fecture.pdf) sur l'adresse

### Outils grand public : l'éditeur national de Bases Adresses Locales pour mettre à jour ses adresses

- Page de l'éditeur national [Mes Adresses](https://mes-adresses.data.gouv.fr/) avec son tutoriel embarqué
- Les [films tutoriels sur Peertube](https://peertube.adresse.data.gouv.fr/videos/overview), également embarqués dans l'aide en ligne de l'éditeur
- Le Guide de l'éditeur en [format texte](/docs/mes-adresses/À%20propos%20du%20Guide%20de%20Mes%20Adresses) ou en [PDF](https://adresse.data.gouv.fr/data/docs/guide-mes-adresses-v4.0.pdf)
- Le [Forum des Bases Adresses Locales](https://forum.incubateur.anct.gouv.fr/c/bases-adresses-locales/43) **réservé aux élus et agents des communes** (prestataires s'abstenir).
- [La FAQ](https://adresse-data-gouv-fr.gitbook.io/faq/) réalisée à partir des questions des communes lors des webinaires
- [La page Github](https://github.com/BaseAdresseNationale/mes-adresses/issues) pour suivre l'avancée de l'éditeur et proposer des évolutions

#### Contacter un organisme pour être accompagné

- [Page de la Charte de la Base Adresse Locale et de ses partenaires ](https://adresse.data.gouv.fr/bases-locales/charte)
- [Moteur de recherche des partenaires](https://adresse.data.gouv.fr/gerer-mes-adresses#recherche-partenaires)

#### Publier une Base Adresse Locale par formulaire

- [Formulaire de dépôt d'une Base Adresse Locale](https://adresse.data.gouv.fr/bases-locales/publication) réalisée sur un autre outil (validateur intégré)

### Outils experts

- [Le géocodeur .csv](https://adresse.data.gouv.fr/csv) : uploader un fichier .csv et définir les colonnes à utiliser pour le géocodage
- [Le validateur BAL](https://adresse.data.gouv.fr/bases-locales/validateur) : valider son fichier Base Adresse Locale avant de le publier dans la BAN par dépôt sur [data.gouv.fr ](https://www.data.gouv.fr/fr/)
- API de dépôt d'une Base Adresse Locale : lien vers la [documentation](https://github.com/BaseAdresseNationale/api-depot/wiki/Documentation)
- Moissonneur d'une Base Adresse Locale : lien vers la [documentation](https://github.com/BaseAdresseNationale/moissonneur-bal/wiki/Fonctionnement-du-moissonneur-bal)
- [Le projet sur Github](https://github.com/etalab/adresse.data.gouv.fr/projects/1) pour contribuer
- [Nombre de locaux adressables par commune](https://www.data.gouv.fr/fr/datasets/nombre-de-locaux-adressables-par-communes/) : décompte du nombre de locaux adressables par commune, ainsi que le nombre d'adresses associées estimées
- [État de la Base Adresse Nationale par commune](https://www.data.gouv.fr/fr/datasets/etat-de-la-base-adresse-nationale-par-commune/) : état de la Base Adresse Nationale pour chaque commune. Fichier produit en temps réel à partir de la plateforme BAN.

### Suivre le déploiement des Bases Adresses Locales

- [Tableau de bord du déploiement des Bases Adresses Locales](https://adresse.data.gouv.fr/deploiement-bal) : sélection par commune, EPCI, département, statistiques détaillées pour chaque échelon et fichier .csv téléchargeable.

### Naviguer dans la base FANTOIR de la DGFiP

- [L'explorateur FANTOIR](https://adresse.data.gouv.fr/fantoir) permet de consulter par commune le nom des voies, des lieux-dits ; des ensembles immobiliers (voies situées dans les lotissements et les copropriétés) ; et des pseudo-voies (canaux, etc.). L'[API FANTOIR](https://github.com/BaseAdresseNationale/api-fantoir/blob/master/README.md#api) permet une consultation avancée.
