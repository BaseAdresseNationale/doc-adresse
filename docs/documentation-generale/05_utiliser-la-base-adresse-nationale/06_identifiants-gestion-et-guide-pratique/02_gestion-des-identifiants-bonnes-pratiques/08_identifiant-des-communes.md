---
title: "Identifiant des communes"
---

L’_id\_ban\_commune_ est fourni par la BAN (API).

C'est un identifiant essentiellement de gestion, il permet notamment dans le cadre de l’opération de la BAN, de suivre le cycle de vie des communes en cas de fusion ou scission de commune. \
Il n'est pas signifiant pour les utilisateurs.


**En cas de fusion de communes** : 
La commune nouvelle devra, lors de sa première publication avvec les BAL fusionnées, récupérer le nouvel id_ban_commune dans le registre BAN. 
Ce nouvel identifiant devra être actualisé sur l'ensemble des adresses des communes fusionnées.
