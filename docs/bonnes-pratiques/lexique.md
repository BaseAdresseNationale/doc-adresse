# Lexique

### API Adresse

cette API permet d'interroger facilement la Base Adresse Nationale pour faire de l’autocomplétion et de la vérification d’adresse, géolocaliser une adresse sur une carte ou encore faire une recherche géographique inversée (trouver la rue la plus proche de coordonnées géographiques).

### API de dépôt&#x20;

Techniquement, l’un des deux modes d’alimentation de la Base Adresse Nationale par une Base Adresse Locale (l’autre étant par dépôt sur data.gouv.- fr). L’API de dépôt est utilisable directement greffée à son outil SIG, ou via des outils comme Mes Adresses, le formulaire de dépôt, le moissonneur V2.

### Arrêté

Le maire prend des arrêtés dans le cadre de ses pouvoirs de police et dans le cadre des compétences qui lui ont été déléguées en début de mandat par le conseil municipal. Le numérotage des locaux fait l’objet d’un arrêté.

### Base Adresse Locale (BAL)&#x20;

À l’origine, nom donné à un format de données défini par l’AITF et choisi pour alimenter la Base Adresse Nationale pour son interopérabillité. Par extension, une Base Adresse Locale est le fichier qui contient l’ensemble des adresses d’une commune.

### Base Adresse Nationale (BAN)

La base d’adresses du Service Public de la Donnée. Seule base d’adresses nationales à faire partie du socle de souveraineté de l’État, elle est libre et gratuite.

### Certification d’une adresse

Information obligatoire du format Base Adresse Locale qui permet d’afficher dans la Base Adresse Nationale qu’une adresse est authentifiée par la commune. Gérée automatiquement dans Mes Adresses, à préciser par un champ (0 non certifié, 1 non certifié) lors de l’export si la commune utilise un SIG.

### Certification d’un organisme

Un organisme doit être certifié par data.gouv.fr pour que la Base Adresse Locale qu’il dépose puisse être versée dans la Base Adresse Nationale. Peuvent être certifiés : les communes et EPCI ayant mandat pour déposer une Base Adresse Locale.

### Délibération

Les délibérations sont les actes qui retranscrivent les décisions du conseil municipal. Elles sont exécutoires lorsqu’elles ont été publiées ou affichées (décisions réglementaires) ou notifiées aux intéressés (décisions individuelles) et trans- mises au contrôle de légalité. Les noms des voies et lieux-dits font l’objet de délibérations.

### « Dites-le-nous une fois »

« Pilier » de la loi pour un État au service d’une société de confiance du 10 août 2018, il oblige « une administration à se procurer des informations concernant un usager, non plus en les lui réclamant, mais en prenant attache au- près d’une autre administration » qui détient ces informations.

### FANTOIR

Fichier provenant de l’application MAJIC (Mise A Jour des Informations Cadastrales) qui est implantée dans les services de la DGFiP exerçant des missions cadastrales. Ce fichier des voies et lieux-dits recense par commune différents types de « voies » (au-delà de celles que les communes doivent dénommer)\
\- les voies (rues, avenues, ...) ;\
\- les lieux-dits (utilisés surtout dans les zones rurales) ;\
\- les ensembles immobiliers (voiries situées dans les copropriétés, les lotissements) ; \
\- les pseudo-voies (par exemple canaux ou stations de métro). _Les pseudo voies ne sont pas à renseigner pas les communes_

### Fichier BAN au format BAL 1.3

Fichier d’adresses après publication dans la BAN respectant les intitulés prévus dans le format BAL 1.3, y compris les adresses en langue régional. Il est disponible à l’échelle communale sur la page d’information par commune ou par département sur la page « données nationales ».

### Fichier BAN historique

Fichier historique de la BAN, comprenant les adresses au format BAN et AFNOR, le code FANTOIR, mais pas les adresses en langue régionale. Il est disponible à l’échelle communale sur la page d’information par commune ou par département sur la page « données nationales ».

### Formulaire de dépôt

méthode de publication d’une Base Adresse Locale directement dans la Base Adresse Nationale par simple authentification de la commune (par jeton ou via FranceConnect pour un élu de la commune), incluant le validateur et adossée à l’API de dépôt.

### Hameau

Lieu-dit habité.

### Lieu-dit

lieu portant un nom, pas forcément habité, identifié par un panneau.

### Loi 3DS

Loi relative à la différenciation, la décentralisation, la déconcentration et portant diverses mesures de simplification de l’action publique locale, dite loi 3DS, du 21 février qui reconnaît la commune comme échelon de compétence sur l’adresse (article 169) et réaffirme le principe du « Dites-le nous une fois ».

### Mes Adresses/éditeur Mes Adresses

Outil en ligne libre et gratuit accessible sans compétence technique permettant de créer, mettre à jour, certifier et publier ses adresses dans la Base Adresse Nationale via une Base Adresse Locale qui respecte les lieux-dits, les langues régionales et précise le lien avec les parcelles cadastrales.

### Moissonnage

Méthode de diffusion des Bases Adresses Locales dans la Base Adresse Nationale automatisée à partir d’un portail open-data. Les moissonneur V2 est adossé à l’API de dépôt.

**Position**

La position d’une adresse donne sa géolocalisation. Selon que la commune choisit une position à l’entrée ou sur le bâtiment (positions les plus utilisées), le point GPS sera différent. Elle doit être renseignée obligatoirement. Dans Mes Adresses, il suffit de déplacer le pointeur et de choisir dans une liste de proposition, par défaut l’outil propose l’entrée (position la plus utilisée).

### Programme Bases Adresses Locales/Startup d’État Bases Adresses Locales

Programme adossé au programme France Très Haut Débit et à l’incubateur des territoires de l’ANCT en charge du déploiement des Bases Adresses Locales (support, webinaires, guides, ateliers...) et de l’éditeur Mes Adresses. Lancé en septembre 2020 pour accompagner les communes dans la mise à jour des adresses, son objectif final est la montée qualitative de la Base Adresse Nationale. À ce titre, l’ANCT co-pilote la Base Adresse Nationale.

### Publication

Action de diffuser la Base Adresse Locale dans la Base Adresse Nationale.

### Répertoire d’immeubles localisés (RIL)

Disponible pour les communes de 10 000 habitants ou plus, le RIL de l'INSEE contient l’ensemble des adresses de logements (les habitations, les établissements touristiques et les communautés) nécessaires au recensement de la population et au calcul des populations légales. Il intègre notamment le nombre de logements, le type d'habitation, le caractère habitable des adresses et leur géolocali- sation. À la différence de la Base Adresse Nationale, il ne comprend pas les locaux d’activités.

### Toponyme

Nom de lieu. Par extension, la liste des toponymes de l’éditeur Mes Adresses recueille les noms des lieux-dits et des voies sans adresse.&#x20;

### Voie

Tronçon carrossable faisant l’objet d’une dénomination.\
