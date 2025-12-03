# Les adresses certifiées

### Les adresses certifiées dans la Base Adresse Nationale

Les adresses certifiées sont présentées en vert dans l'outil d'exploration de la Base Adresse Nationale. Elles ont été authentifiées par la commune et proviennent d'une Base Adresse Locale ou du Guichet adresse de l'IGN. Les autres sources d'adresses ne garantissent pas une remontée sans retraitement des adresses telles que validées par la commune. \
Dans le cas d'une Base Adresse Locale, les adresses restant à certifier sont indiquées dans un compteur et figurent en gris.

### La certification dans une Base Adresse Locale

Le champ **certification_commune** est un champ obligatoire du [format Base Adresse Locale 1.3](https://doc.adresse.data.gouv.fr/mettre-a-jour-sa-base-adresse-locale/le-format-base-adresse-locale) qui permet de renseigner le statut de certification. Une commune qui gère ses adresses sur son propre outil complète ce champ par des 0 lorsque l'adresse n'est pas certifiée ou 1 lorsqu'elle est certifiée.

L'éditeur en ligne [Mes Adresses](https://mes-adresses.data.gouv.fr/) permet certifier une adresse (un numéro), une voie complète (tous ses numéros) ou la totalité d'une Base Adresse Locale. Lorsqu'une commune publie une Base Adresse Locale sans avoir vérifié l'ensemble de ses adresses, la certification doit être réservée aux adresses qui ont été vérifiées, les autres pouvant rester "non certifiées" le temps de la vérification.

### Certifier une Base Adresse Locale en un clic

Sur Mes Adresses, cette action doit être réservée aux Bases Adresses Locales dont les adresses ont été vérifiées et qui ne comportent plus d'anomalie (positions renseignées par exemple).

<figure><img src="/img/documentation-generale/20230525 Certification.gif" alt=""/><figcaption><p>Capture d'écran Mes Adresses 25/05/2023</p></figcaption></figure>

Pour plus de détail sur les autres modes de certification, adresse par adresse ou par voie, consulter [la documentation de Mes Adresses](/docs/mes-adresses/Publier%20une%20Base%20Adresse%20Locale/Certifier%20ses%20adresses).
