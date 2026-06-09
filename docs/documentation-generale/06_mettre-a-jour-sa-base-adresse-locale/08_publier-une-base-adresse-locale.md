---
title: "Publier une Base Adresse Locale"
---

Méthodes de publication et caractéristiques

### Méthodes de publication

Cinq méthodes permettent de publier une Base Adresse Locale (BAL) dans la Base Adresse Nationale (BAN). L'éditeur Mes Adresses permet à la fois de mettre à jour et de publier ses adresses.

<figure><img src="/img/documentation-generale/SCHEMA V3.png" alt=""/><figcaption></figcaption></figure>

### Modalités de publications

#### Mise à jour des adresses sur une Base Adresse Locale et publication avec l'éditeur [**Mes Adresses**](https://mes-adresses.data.gouv.fr/)

- Gestion en ligne (gratuite) sur un simple navigateur web d'une Base Adresse Locale communale et transmission des modifications en temps réel à la Base Adresse Nationale. Mes Adresses est adossé à l'API de dépôt.
- Pas de gestion de fichier, aucune compétence technique requise (gestion d'une liste), authentification de la commune par un élu via FranceConnect ou d'un agent par code adressé sur le courriel officiel de la commune (tel que renseigné sur [https://lannuaire.service-public.fr](https://lannuaire.service-public.fr))

#### Publication d'une Base Adresse Locale par **formulaire de dépôt** sur [adresse.data.gouv.fr](https://adresse.data.gouv.fr/outils/formulaire-de-publication)

- Vérification (validateur intégré) et publication d'une Base Adresse Locale communale en quasi temps réel. Le dépôt par formulaire est adossé à l'API de dépôt.
- Vérification du format et publication, authentification par un élu via FranceConnect ou par jeton adressé sur le courriel officiel de la commune. Les adresses sont à gérer sur un outil local et à exporter au format .csv en respectant le format BAL.

#### Dépôt d'un jeu de données sur [**data.gouv.fr**](https://www.data.gouv.fr/)

- Publication des fichiers des adresses (préférer un fichier par commune plutôt qu'un fichier global)

1. Création d'un compte sur data.gouv.fr
2. certification du compte à demander sur [cette page](https://support.data.gouv.fr/collectivite-territoriale/certification) ("J'ai une question" > L'utilisation de data.gouv.fr > Faire certifier son organisation") en indiquant le nom de l’organisation à certifier dans le corps du texte,
3. envoie d'un mail à [adresse@data.gouv.fr](mailto:adresse@data.gouv.fr) pour activer le moissonnage
4. vérification des fichiers .csv dans le [validateur](https://adresse.data.gouv.fr/outils/validateur-bal),
5. dépôt des fichiers sur data.gouv.fr avec le mot clé "**base-adresse-locale".**

Veillez à consulter la documentation sur data.gouv.fr pour bien effectuer les mises à jour. **Les EPCI doivent adopter la** [**Charte de la Base Adresse Locale**](https://adresse.data.gouv.fr/communaute/charte-base-adresse-locale#partenaires) pour que la gouvernance soit affichée et garantisse une gestion de la certification.

#### **Moissonnage** d'un **portail open data** via [data.gouv.fr](https://www.data.gouv.fr/)

- Publication du fichier Base Adresse Locale (préférer un fichier par commune plutôt qu'un fichier global) et récupération automatique des mises à jour. La [documentation en ligne](https://github.com/BaseAdresseNationale/moissonneur-bal/wiki/01_Fonctionnement) précise toutes les spécificités.

1. Création d'un compte sur data.gouv.fr
2. certification du compte à demander sur [cette page](https://support.data.gouv.fr/collectivite-territoriale/certification) ("J'ai une question" > L'utilisation de data.gouv.fr > Faire certifier son organisation") en indiquant le nom de l’organisation à certifier dans le corps du texte,
3. référencement du moissonnage à effectuer, voir : "[Demander à data.gouv.fr de moissonner votre site](https://doc.data.gouv.fr/jeux-de-donnees/demander-a-datagouvfr-de-moisonner-votre-site/)", mot-clé à préciser : **base-adresse-locale,**
4. envoie d'un mail à [adresse@data.gouv.fr](mailto:adresse@data.gouv.fr) pour activer le moissonnage
5. vérification du fichier Base Adresse Locale .csv dans le [validateur](https://adresse.data.gouv.fr/outils/validateur-bal) avant d’automatiser. **Les EPCI doivent adopter la** [**Charte de la Base Adresse Locale**](https://adresse.data.gouv.fr/communaute/charte-base-adresse-locale#partenaires) pour que la gouvernance soit affichée et garantisse une gestion de la certification.

#### Publication avec l’[API de dépôt](https://github.com/BaseAdresseNationale/api-depot/wiki/01_Pr%C3%A9sentation)

- Publication des Bases Adresses Locales par commune, avec historicisation des dépôts
- Contacter [adresse@data.gouv.fr](mailto:adresse@data.gouv.fr) pour demander un jeton de test. **Les EPCI doivent adopter la** [**Charte de la Base Adresse Locale**](https://adresse.data.gouv.fr/communaute/charte-base-adresse-locale#partenaires) pour que la gouvernance soit affichée et garantisse une gestion de la certification.

Attention, changer de méthode de publication comporte des risques de perte de données, il faudra vous assurer de bien récupérer la dernière Base Adresse Locale publiée. \
\
&#xNAN;_&#x45;xemple_ : _si vous publiez une première BAL via le formulaire de publication, et que vous souhaitez ensuite continuer sur Mes Adresses, il vous faudra impérativement créer une nouvelle BAL Mes Adresses qui importera les données publiées dans la BAN via le formulaire._

<figure><img src="/img/documentation-generale/image (11).png" alt=""/><figcaption></figcaption></figure>

:::warning
Si les adresses sont réalisée sur un outil local et que la commune ne prévoit pas d'utiliser l'éditeur en ligne Mes Adresses pour les mettre à jour, privilégier une publication par dépôt sur data.gouv.fr ou par dépôt API. Pensez à vérifier le bon formatage de vos fichiers BAL grâce à notre [validateur](https://adresse.data.gouv.fr/outils/validateur-bal).
:::

### Caractéristiques de la publication

- **Une seule Base Adresse Locale** est publiée par commune. Si plusieurs Bases Adresses Locales sont déposées pour une même commune, une seule est publiée. Le **dépôt par API est toujours prioritaire**, parce qu’il est effectué par la commune **authentifiée**. Ce n'est pas le cas d'un dépôt sur data.gouv.fr ni du moissonnage. Pour revenir à une BAL déposée sur [data.gouv.fr](http://data.gouv.fr/), une commune doit contacter adresse@data.gouv.fr et expliquer la démarche. Si elle délègue la réalisation de sa Base Adresse Locale à un EPCI, la publication sera possible lorsque l'organisme aura adopté la Charte de la Base Adresse Locale.
- La publication d'une Base Adresse Locale **remplace** la précédente.
- Si une commune publie une Base Adresse Locale sans avoir vérifié l'ensemble de ses adresses, il est conseillé de réserver la certification aux adresses qui ont été authentifiées. Pour gérer cette certification :
  - voir le [Guide Mes Adresses](/docs/mes-adresses/publier-une-base-adresse-locale/certifier-ses-adresses)
  - lorsque la commune gère directement son fichier .csv, il convient d'ajouter le champ **certification_commune** dans le fichier et de préciser 0 si l'adresse n'est pas certifiée et 1 si elle l'est.
