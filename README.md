# PronoFoot-AI-Site

Site public de PronoFoot AI. Le moteur d'analyse reste dans le dépôt privé [PronoFoot-AI](https://github.com/SamSEILLER/PronoFoot-AI).

## Pages

- `index.html` : présentation du projet et état des données.
- `predictions.html` : estimations expérimentales et comparaison aux scores réels.
- `predictions-data.json` : jeu de données public généré par le moteur privé.
- `site-status.json` et `sync-status.json` : état de fraîcheur des données et dernière synchronisation.

## Statut du modèle

Les estimations utilisent une baseline Poisson expérimentale. Le backtest chronologique sur les archives réelles est descriptif ; calibration, comparaison à une baseline de marché et validation restent à faire. Aucune prédiction n'est déclarée validée et la porte de publication du modèle reste fermée.

## Contraintes de sécurité

- Ne jamais ajouter de secrets, clés API, jetons ou données brutes privées.
- Ne publier que des résultats dérivés explicitement produits par le workflow de synchronisation.
- Afficher les limites du modèle et les scores réels uniquement lorsqu'ils sont présents dans les archives.
- Si les données sont absentes ou invalides, afficher un état indisponible plutôt que fabriquer un résultat.

## Synchronisation

Le workflow du dépôt privé copie les pages et régénère le jeu de données public lors des changements du site, du modèle ou des archives. Le déploiement sur un hébergement web reste distinct de la synchronisation GitHub.
