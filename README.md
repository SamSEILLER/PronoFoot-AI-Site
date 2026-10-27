# PronoFoot AI — site public

Site public destiné à présenter les données produites par le moteur privé [PronoFoot-AI](https://github.com/SamSEILLER/PronoFoot-AI).

## État actuel — 27 octobre 2026

**La nouvelle page d'accueil `index.html` est créée** sur la base de la maquette fournie le 27 octobre 2026. Les anciennes pages `predictions.html` et `index-alternative.html` ne sont pas utilisées. La page d'accueil charge `data/predictions-data.json` et affiche les informations réellement présentes dans cet export ; elle n'invente pas les cotes, compositions, météo, forme récente ou confrontations directes manquantes. L'affichage est responsive, avec filtres par date, recherche, liste des rencontres et panneau de détail.

Cette remise à zéro concerne l'affichage uniquement. Les données récupérées et les artefacts JSON existants sont conservés comme base de travail ; ils ne doivent pas être supprimés ou remplacés manuellement dans le cadre de la refonte visuelle.

## Artefacts de données

Les fichiers JSON sont générés par le moteur privé. Le workflow de synchronisation est exécuté dans le dépôt moteur, pas dans ce dépôt public. La réussite du déploiement Pages ne valide pas le contenu statistique des JSON ; la réussite de la synchronisation ne prouve pas à elle seule que Pages a déployé le dernier commit.

Ces fichiers sont générés par les workflows du moteur privé et ne doivent pas être modifiés manuellement :

- `data/predictions-data.json` — rencontres, résultats et estimations expérimentales exportées.
- `data/model-history.json` — historique des versions et évaluations disponibles.
- `data/site-status.json` — état des collectes et contrôles de données.
- `data/sync-status.json` — statut de synchronisation et commit source.
- `data/recent-form.json` — forme récente calculée depuis la saison de référence.
- `data/head-to-head.json` — confrontations directes trouvées dans les archives.
- `data/odds-data.json` — observations de cotes retournées pour les événements associés.
- `data/match-details.json` — données complémentaires descriptives de matchs.

La présence de données ne signifie pas que le modèle est validé, que les probabilités sont calibrées ou qu'un pari est recommandé.

## Principes pour la nouvelle interface

- Construire une interface neuve sans dépendre des pages HTML supprimées.
- Séparer clairement l'affichage de la collecte et du calcul des données.
- Lire les artefacts JSON générés plutôt que coder en dur les matchs, cotes ou probabilités.
- Montrer l'horodatage, la couverture et les états d'indisponibilité lorsqu'ils sont fournis.
- Ne jamais inventer une valeur manquante ni présenter une estimation expérimentale comme un fait confirmé.
- N'exposer aucun secret, jeton, fichier brut privé ou détail opérationnel du moteur.
- Conserver les avertissements sur le caractère expérimental des prédictions tant qu'une validation hors échantillon n'a pas été approuvée.

## Synchronisation

Le workflow du dépôt privé synchronise les artefacts de données publics, mais ne copie pas de pages HTML. La synchronisation GitHub et le déploiement Pages sont distincts : vérifier l'exécution Pages après un nouveau commit public.

## Vérifications après synchronisation ou modification de l'interface

1. Vérifier le chargement de `data/predictions-data.json` sur l'hébergement public.
2. Tester les filtres, la recherche, la sélection de match, les onglets et les états vides.
3. Tester les vues ordinateur et mobile sur le site déployé.
4. Vérifier le déploiement web : un commit GitHub ne garantit pas à lui seul que l'hébergeur a publié la page.
