### L'API adresse

Ce service public ouvert à tous permet d'interroger la base de données de l’intégralité des adresses du territoire français gratuitement. L'API Adresse enregistre moyenne 1 milliard d'appels par mois (avril 2021). L'infrastructure a un coût direct d'environ 0,35€ par million d'adresses géocodées, versus les $4000 qui seraient facturés par certains grands acteurs du numérique.

#### Couverture
France métropolitaine, départements et régions d’outremer

#### Utiliser simplement l'API
- [Page de l'API](https://geo.api.gouv.fr/adresse)
    

Rappel aux intégrateurs qui utilisent cette API : il n'est pas utile de réaliser un appel pour chaque caractère saisi par les utilisateurs. Penser "Debouncing and Throttling"

- [Informations sur l'API](https://guides.etalab.gouv.fr/apis-geo/1-api-adresse.html)
    

#### Installer l'API

- [Conteneurs Addok pour Docker](https://github.com/etalab/addok-docker#readme)
    

### L'API Base Adresse Locale

Cette API permet d'effectuer toutes les actions réalisables sur l'éditeur en ligne de Bases Adresses Locales [mes-adresses.data.gouv.fr](http://mes-adresses.data.gouv.fr/), et notamment de

- créer une Base Adresse Locale et
    
- en gérer les adresses de façon fine.
    

#### Documentation

- Page de documentation sur Github: [https://github.com/etalab/api-bal/wiki/Documentation-de-l'API](https://github.com/etalab/api-bal/wiki/Documentation-de-l'API)
    

### L'API de dépôt

Cette API permet de déposer une mise à jour d'une Base Adresse Locale dans la Base Adresse Nationale.

#### Documentation

- Page de documentation sur Github: [https://github.com/etalab/ban-api-depot/wiki/Documentation](https://github.com/etalab/ban-api-depot/wiki/Documentation)
    
- Documentation par GéoCompiégnois de son utilisation de l’API : [https://github.com/sigagglocompiegne/rva/blob/master/api/doc_api_balc_fme.md](https://github.com/sigagglocompiegne/rva/blob/master/api/doc_api_balc_fme.md)