« **Si le lieu adressé reste le même sur le terrain alors l'identifiant id\_ban\_adresse reste le même » : les modifications d’une composante de l’adresse n'entraînent pas de changement d’identifiant de cette adresse. "**\
En particulier : Les modifications de la sémantique d’une adresse n’entraînent pas de changement d’identifiant, tant qu’il s’agit du même “Lieu” adressé.



Principe général : éviter les suppressions/re-créations alors qu’il ne s’agit que de modifications des attributs de l’objet.

### Exemple d’évolutions possibles d’une adresse

(identifiée par son id\_ban\_adresse sur tout son cycle de vie) qui n’a donc pas d’impact sur son identifiant :



a.      Renumérotation (exemple : passage d’un adressage classique à métrique)

Dans ce cas précis, une bonne pratique pourrait être de proposer un outil automatique qui affecte aux anciens numéros des nouveaux en indiquant juste le point de départ de la voie et le tracé de la voie (NB : cet outil a déjà été développé sur certains logiciels).

Illustration :

Cas d’une modification de numéro (passage du classique au métrique) : le 6 Impasse du Chauffour devient le 230 Impasse du Chaufour. L’uuid de l’adresse id\_ban\_adresse n’a pas changé, seule la valeur de la colonne numéro change (ainsi que la colonne cle\_interop par ricochet).


<figure><img src="/img/documentation-generale/image1_annexe_modif.JPG" alt=""/><figcaption></figcaption></figure>

b.      Ajout d’un suffixe (s’il n’y a pas eu de division d’adresse et donc qu’il ne s’agit pas d’une création : cf. cas 1.c)

c.      Création d’une nouvelle position pour une adresse : une adresse peut avoir plusieurs positions…les outils qui le permette doivent veiller à conserver l’identifiant de l’adresse sur chaque position.

d.      Déplacement d’une position pour améliorer la précision de l’existant .

Dans ce cas, une bonne pratique pourrait être de détecter une distance maximale (à définir : 50m ?) à partir de laquelle on génère un « warning » du type « vous avez déplacé cette adresse de X mètres, êtes-vous sûr qu’il s’agit toujours de la même adresse. » et proposer plutôt une suppression création.

e.      Quelle que soit la modification sur le toponyme : renommage de voie, correction orthographique, précision sur un toponyme secondaire (lieudit\_complement\_nom dans le format BAL)

f.       En cas de fusion de commune, avec ou sans changement de code INSEE

g.      Toutes les actions de démarches de fiabilisation ou amélioration de l’adresse (correction typographique, certification, ajout de lien vers une parcelle cadastrale)

***

