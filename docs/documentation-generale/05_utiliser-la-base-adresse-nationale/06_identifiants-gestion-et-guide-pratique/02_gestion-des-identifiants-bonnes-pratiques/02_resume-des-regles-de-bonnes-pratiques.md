---
title: "Résumé des règles de bonnes pratiques"
---

* L’id\_ban\_adresse est porté par l’objet adresse de la BAN (qui représente un lieu adressé), il a pour objectif de suivre le cycle de vie de ce lieu adressé.
* Primordial : après initialisation des ID, s’assurer de repartir de l’état validé précédent dans la BAN. (attention aux conflits de BAL)
* Si le lieu adressé sur le terrain reste le même alors l'identifiant id\_ban\_adresse doit rester le même. Donc les modifications d’un attribut de l’adresse n'entraînent pas de changement d’identifiant de cette adresse.
* Lors de la création d’une nouvelle adresse, il faut générer un nouvel identifiant d’adresse id\_ban\_adresse.
* L’identifiant d’un objet détruit ne doit pas être réutilisé pour un autre objet.
* Éviter les suppressions/re-créations d’objets alors qu’il ne s’agit que de modifications.
* En cas de fusion de communes : les identifiants des adresses ET des toponymes des communes concernées restent les mêmes (sauf exception/cas particulier en limite de communes).
