---
title: "Ressources Notion de référentiel et identifiant"
---

### a.     Notion de référentiel et identifiant

Pour ceux qui veulent aller plus loin, en lien avec ce principe, voici quelques règles/exigences issues du document "Cadre Commun d'Architecture des Référentiel de données v1.0\_0" règle RF4 page 28 \* :

"Règle RF4 : Séparer les données d’identités (ou d’identification métier), des identifiants des données de\
référence... identifiant ... aisément partageable,\
non ambigus, non signifiant ..., non modifiables, non-réaffectable, non supprimable et persistant.

La notion d’identifiant, donnée permettant d’identifier avec certitude un objet métier (une personne par exemple, ou une\
entreprise), doit très clairement être dissociée des données d’identités de l’objet métier....

La mise en place d’identifiant, ou de clé, permettant de retrouver avec certitude un objet métier, doit répondre à des exigences précises :

- cet identifiant doit être facilement partageable (dans un format interopérable) ;

- il doit être non ambigu ;

- il doit être non signifiant, c’est-à-dire ne contenant pas de données métiers ou techniques susceptible d’évoluer dans le temps, ne contenant pas de données à caractères personnels ou confidentielles ;

- il doit être non modifiable : une fois défini et attribué, il ne doit plus changer ;

- il ne doit pas être réaffecté à un autre objet métier, même si le précédent objet n’a plus lieu d’être (quelle qu’en soit la raison) ;

- Il ne doit pas être supprimable, même si l’objet n’a plus lieux d’être. (ex. L’identifiant d’une entreprise qui fait faillite, ne doit pas être supprimé, il est conservé jusqu’à la date légale de conservation, et même probablement au-delà dans cet exemple).

- Il doit être persistant : c’est-à-dire qu’il doit être réellement stocké, conservé et archivé dans le temps."
       


### b.     COROLLAIRE :  Ce qui ne peut pas être l'identifiant technique

o   Pas l'expression littérale de l'adresse (5 la Sauvinière 85620 ROCHESERVIERE) qui est l'identifiant de l'adresse 'à destination des êtres humains‘ et qui normalement possède la caractéristique de l'unicité mais ni la non signifiance ni la stabilité (ex fusion de commune)

o   Pas la clé d'interopérabilité\
Plus ou moins les mêmes caractéristiques que l'expression littérale avec l'avantage d'être une seule entité donc plus facilement comparable/appairable mais toujours pas de stabilité ... (signifiante et donc à synchroniser avec une référence externe)

o   Pas une clé primaire (cadre national nécessaire pour la cohérence)\
Qui possède les bonnes caractéristiques mais qui est interne à un système et à une base de donnée.  (s'il n'y avait qu'un seul producteur ça aurait peut-être pu être le cas, mais pas avec 35000 car en conséquence aucune garantie que 2 producteurs n'aient pas le même....). L'unicité ne peut être garantie or c'est la caractéristique principale et essentielle.\
\
