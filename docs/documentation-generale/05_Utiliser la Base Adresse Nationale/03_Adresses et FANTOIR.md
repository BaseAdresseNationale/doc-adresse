La base FANTOIR répertorie le nom des voies des lieux-dits; des ensembles
immobiliers (voie dans les lotissements, etc.); des pseudo-voies (canaux,
etc). La DGFiP attribue un code à chaque adresse.

# Adresses et FANTOIR

La Base Adresse Nationale ne conserve pas le code FANTOIR fourni dans le fichier Base Adresse Locale. L'éditeur de Bases Adresses Locales [Mes Adresses](https://mes-adresses.data.gouv.fr/) ne permet pas de gérer le code FANTOIR. 

La BAN recalcule la clé d'interopérabilité à partir de l'association avec les codes FANTOIR des fichiers provenant de la DGFIP. La BAN attribue un code automatiquement à chaque mise à jour. Si aucun code n’est trouvé en correspondance, un pseudo\_code spécifique transitoire à 6 caractères est généré.

Si la commune ne connait pas le code FANTOIR ou n’a pas les moyens de le renseigner, elle peut laisser le code à vide « 0000 » ou « xxxx ».

Un [explorateur FANTOIR](https://adresse.data.gouv.fr/fantoir) est à disposition pour retrouver le code. Pour un usage avancé, l'[API FANTOIR](https://github.com/BaseAdresseNationale/api-fantoir/blob/master/README.md#api) est à disposition à partir de la page des [outils](https://adresse.data.gouv.fr/outils).
