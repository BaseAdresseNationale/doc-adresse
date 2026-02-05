---
title: "Cas des voies et lieudits"
---

## Création d’une voie

Lors de la création d’une nouvelle voie, il faut générer un nouvel identifiant _id\_ban\_toponyme_

exemple : nouveau lotissement qui sort de terre, etc.



## Cas des homonymes lors de fusions de communes

Pour l’id\_ban\_toponyme, on se concentrera sur la stabilité des identifiants lors du cas de fusion de communes et ce pour permettre de s’affranchir du problème des homonymies (les seules exceptions à cette stabilité lors des fusions de communes concernent les voies en limite de communes que la commune pourrait vouloir fusionner).

En effet cela permettra de ne pas confondre les toponymes identiques (mais à des endroits différents) et dans ce cas on encouragera le fournisseur de BAL à bien renseigner la commune historique (commune\_deleguee\_insee et commune\_deleguee\_nom dans le format BAL 1.4).



Il sera difficile d’aller plus loin dans cette première version car l’objet toponyme (voie ou lieu-dit) n’est pas présent comme tel dans les BAL 1.4.

_NB : Le format BAL1.4 ne définit pas de toponyme en tant que tel… Le toponyme (voie ou lieu-dit) est donc construit dans la BAN en regroupant les adresses qui ont le même « voie\_nom »dans le fichier de la commune._

Des travaux sont en cours autour d’un référentiel national de voies (GT du CNIG Routes (Voies)). L’articulation avec la BAN sera essentielle. En attendant, il existe deux pratiques différentes parmi les producteurs de BAL :

1\.     La première consiste à considérer que l’objet est le nom lui-même et donc en cas de renommage, l’_id\_ban\_toponyme_ change (par contre pas de changement en cas de correction orthographique, accent, etc.).

2\.     A l’instar de la considération de « lieu adressé » pour les adresses, la seconde considère que les toponymes (voies ou lieux-dits qui regroupent un ensemble d’adresse) représentent un lieu nommé et donc qu’en cas de renommage de voie, l’_id\_ban\_toponyme_ ne changera pas.

Les deux façons de voir correspondent à des cas d’usages différents, les deux permettent dans tous les cas de bien identifier les mêmes objets à un instant t. La différence tiendra donc essentiellement dans le suivi des modifications et du cycle de vie des objets et surtout le cas (somme toute peu fréquent) de renommage de voie.

Considérant le besoin utilisateur de s’appuyer sur la plus grande stabilité possible de l’identifiant afin d’avoir un meilleur historique des objets et l’orientation évoquée du GT Routes CNIG de s’appuyer sur un principe de voies nommées, **la deuxième solution est recommandée**.

_En résumé, les 2 visions peuvent coexister sans que cela ne soit bloquant. Cependant les utilisateurs devront en tenir compte dans leur processus d’exploitation de la BAN._

_Dans le cas d’un producteur qui mettrait en place son système, on conseillera plutôt la deuxième option._
