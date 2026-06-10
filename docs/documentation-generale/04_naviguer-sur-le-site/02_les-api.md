---
title: "Les API"
---

### L'API adresse

Ce service public ouvert à tous permet d'interroger la base de données de l’intégralité des adresses du territoire français gratuitement. L'API Adresse enregistre moyenne 1 milliard d'appels par mois (avril 2021). L'infrastructure a un coût direct d'environ 0,35€ par million d'adresses géocodées, versus les $4000 qui seraient facturés par certains grands acteurs du numérique.

#### Couverture

France métropolitaine, départements et régions d’outremer

#### Utiliser simplement l'API

- [Page de l'API](https://adresse.data.gouv.fr/outils/api-doc/adresse)

Rappel aux intégrateurs qui utilisent cette API : il n'est pas utile de réaliser un appel pour chaque caractère saisi par les utilisateurs. Penser "Debouncing and Throttling"

- [Informations sur l'API](https://guides.etalab.gouv.fr/apis-geo/1-api-adresse.html)

#### Installer l'API

- [Conteneurs Addok pour Docker](https://github.com/BaseAdresseNationale/addok-docker#readme)

### L'API Base Adresse Locale

Cette API permet d'effectuer toutes les actions réalisables sur l'éditeur en ligne de Bases Adresses Locales [mes-adresses.data.gouv.fr](https://mes-adresses.data.gouv.fr/), et notamment de

- créer une Base Adresse Locale et
- en gérer les adresses de façon fine.

#### Documentation

- Page de documentation sur Github : [https://github.com/BaseAdresseNationale/mes-adresses-api/wiki](https://github.com/BaseAdresseNationale/mes-adresses-api/wiki)

### L'API de dépôt

Cette API permet de déposer une mise à jour d'une Base Adresse Locale dans la Base Adresse Nationale.

#### Documentation

- Page de documentation sur Github : [https://github.com/etalab/ban-api-depot/wiki/Documentation](https://github.com/BaseAdresseNationale/api-depot/wiki/01_Pr%C3%A9sentation)
- Documentation par GéoCompiégnois de son utilisation de l’API : [https://github.com/sigagglocompiegne/rva/blob/master/api/doc_api_balc_fme.md](https://github.com/sigagglocompiegne/rva/blob/master/api/doc_api_balc_fme.md)
- Swagger : [https://plateforme-bal.adresse.data.gouv.fr/api-depot/api](https://plateforme-bal.adresse.data.gouv.fr/api-depot/api)

### L'API de signalement

L'API de Signalement permet de centraliser les demandes de corrections sur les adresses présentent dans la BAN et de les mettre à disposition des communes et producteurs de données adresse.

#### Documentation

- Page de documentation sur Github : [https://github.com/BaseAdresseNationale/api-signalement/wiki](https://github.com/BaseAdresseNationale/api-signalement/wiki)
- Swagger : [https://plateforme-bal.adresse.data.gouv.fr/api-signalement/api](https://plateforme-bal.adresse.data.gouv.fr/api-signalement/api)

### L'API validateur

Cette API permet de vérifier la conformité des fichiers au [format BAL](https://aitf-sig-topo.github.io/voies-adresses/). Elle détecte automatiquement si les fichiers sont au format BAL 1.3, 1.4 ou 1.5 et affiche en conséquence les éventuelles erreurs bloquantes et avertissements de non conformité.

#### Documentation

- Page Github : [https://github.com/BaseAdresseNationale/validateur-api](https://github.com/BaseAdresseNationale/validateur-api)
- swagger : [https://plateforme-bal.adresse.data.gouv.fr/validateur-api/api](https://plateforme-bal.adresse.data.gouv.fr/validateur-api/api)
