---
title: "Résumé des règles de bonnes pratiques"
---


**Principe directeur de stabilité et perennité** : 
l'identifiant est affecté à l'objet pour toute la durée du cycle de vie de l'objet


* Primordial : après initialisation des ID, s’assurer pour les publications suivantes de **repartir de l’état validé précédent dans la BAN**. Attention aux conflits de versions de BAL, notamment en cas de changement de mode de publication. 
* L’id\_ban\_adresse est porté par l’objet adresse de la BAN (qui représente un lieu adressé), il a pour objectif de suivre le cycle de vie de ce lieu adressé.
* Si le lieu adressé sur le terrain reste le même, alors l'identifiant id\_ban\_adresse doit rester le même. Donc les modifications d’un attribut de l’adresse n'entraînent pas de changement d’identifiant de cette adresse.
* Lors de la création d’une nouvelle adresse, il faut générer un nouvel identifiant d’adresse id\_ban\_adresse.
* Éviter les suppressions/re-créations d’objets alors qu’il ne s’agit que de modifications.
* L’identifiant d’un objet détruit ne doit pas être réutilisé pour un autre objet.
* Un identifiant supprimé reste stocké dans la base, il ne doit pas être réutilisé pour un autre objet. 
* En cas de fusion de communes :
  - un nouvel identifiant de commune doit être associé à la commune nouvelle --> à récupérer dans le registre BAN
  - les identifiants des adresses ET des toponymes des communes concernées restent les mêmes (sauf exception/cas particulier en limite de communes).
