---
title: "Le Format Base Adresse Locale"
---

Informations techniques et préconisations

Un fichier Base Adresse Locale correspond à un [format d'échange aujourd'hui en version 1.5](https://aitf-sig-topo.github.io/voies-adresses/) (les formats 1.3 et 1.4 restent acceptés). Issu des travaux du groupe de travail mis en place par l’Association des Ingénieurs Territoriaux de France (AITF), ce format garantit une intégration réussie des Bases Adresse Locales dans la Base Adresse Nationale. L'éditeur en ligne de Base Adresse Locale [Mes Adresses](https://mes-adresses.data.gouv.fr/) gère ces informations et les transfère directement à la Base Adresse Nationale sans que la commune ait à manipuler de fichiers. Les spécifications présentées ci-dessous sont utiles pour gérer une Base Adresse Locale sur un outil dédié. 

### Tableau simplifié du format BAL 1.5 proposé par l'AITF :

| **Attribut**             | **Obligatoire** | **Description**                                                                              |
| ------------------------ | --------------- | -------------------------------------------------------------------------------------------- |
| id\_ban\_commune         | Oui             | identifiant unique de la commune fourni par la BAN (format 1.4)                              |
| id\_ban\_toponyme        | Oui             | identifiant unique du toponyme auquel est rattaché l’adresse (format 1.4)                    |
| id\_ban\_adresse         | Conditionnel    | identifiant unique de l’adresse (format 1.4)                                                 |
| commune\_insee           | Oui             | code INSEE de la commune                                                                     |
| commune\_nom             | Oui             | nom de la commune                                                                            |
| commune\_deleguee\_insee |                 | code INSEE de la commune déléguée                                                            |
| commune\_deleguee\_nom   |                 | nom de la commune déléguée                                                                   |
| toponyme                 | Oui             | nom complet du toponyme                                                                     |
| lieudit\_complement\_nom |                 | nom du lieu-dit historique ou complémentaire                                                 |
| numero                   | Oui             | numéro                                                                                       |
| suffixe                  |                 | informations qui complètent et précisent les numéros d’adresses                              |
| position                 | Oui             | décrit la position d’une adresse (liste de valeurs)                                          |
| x                        | Oui             | système de projection légal en vigueur sur le territoire concerné                            |
| y                        | Oui             | système de projection légal en vigueur sur le territoire concerné                            |
| long                     | Oui             | coordonnées exprimées en WGS84                                                               |
| lat                      | Oui             | coordonnées exprimées en WGS84                                                               |
| cad\_parcelles           |                 | liste des parcelles, séparées par un pipe (\|), desservies ou représentées par cette adresse |
| source                   | Oui             | organisme ayant créé ou diffusé cette adresse                                                |
| date\_der\_maj           | Oui             | Date de la dernière mise à jour de la donnée au format AAAA-MM-JJ                            |
| certification\_commune   | Oui             | Certification communale                                                                      |

:::info
[Des outils en ligne permettent de valider les fichiers Base Adresse Locale ](https://adresse.data.gouv.fr/tools)\
La Base Adresse Nationale gère des alias à l'import :\
**lon, longitude** => long\
**latitude** => lat
:::

### Bonnes pratiques pour faciliter la réutilisation des adresses

#### Bien rédiger une adresse

* **voie\_nom, numero, suffixe:** \
  Le nom de la voie et de son complément sont rédigés en toutes lettres, en **minuscules accentuées**, la première lettre de la voie et du nom seulement étant écrites en majuscule. Le complément est réservé aux hameaux et lieux-dits historiques. Il est conseillé de **limiter le champ suffixe** aux indices de répétition du type bis, ter : même si ce champ est relativement libre dans les spécifications, y placer trop d'informations dégrade l'adresse.
* **cad\_parcelles:**\
  La commune délivrant un certificat de numérotage associe une numérotation à une parcelle. Le registre de filiation parcellaire de DGFiP, disponible en open-data, permet de connaître les parcelles associées à une adresse :

:::info
[Documents de filiation informatisés (DFI) des parcelles](https://www.data.gouv.fr/fr/datasets/documents-de-filiation-informatises-dfi-des-parcelles/)
:::

* **Voies sans adresse :** le numéro attendu pour les voies sans adresse est **99999** et non 0. Le numéro 0 n'est pas accepté dans la Base Adresse Nationale.

#### Le format BAL dans l'éditeur Mes Adresses

L'éditeur en ligne de Bases Adresses Locales [Mes Adresses](https://mes-adresses.data.gouv.fr/) est fondé sur le format BAL ci-dessus avec quelques adaptations qui permettent de conserver un outil léger, même en cas de connexion médiocre. Par exemple, le champ **uid\_adresses** est géré lors de l'importation des adresses dans la Base Adresse Nationale et doit rester vide. 
