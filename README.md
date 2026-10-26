# PronoFoot AI — site public

Site statique public de **PronoFoot AI**. Le moteur d'analyse et ses pipelines restent dans le dépôt privé [PronoFoot-AI](https://github.com/SamSEILLER/PronoFoot-AI).

## Navigation du site

| Page | Rôle |
| --- | --- |
| [Prédictions](index.html) | Rencontres à venir, probabilités 1/N/2 et cotes lorsqu'elles sont disponibles. |
| [Historique & bilan](predictions.html) | Résultats, prédictions pré-match archivées et suivi descriptif des versions. |
| [Prototype éditorial](index-alternative.html) | Piste visuelle alternative conservée séparément, hors navigation principale. |

## Organisation des fichiers

### Pages

- `index.html` — interface principale des rencontres : recherche, filtre compétition, détail par match et thème clair/sombre.
- `predictions.html` — historique et bilan expérimental.
- `index-alternative.html` — prototype éditorial non relié à la navigation principale.

### Données générées (ne pas modifier manuellement)

- `predictions-data.json` — données publiques exportées par le moteur privé.
- `model-history.json` — historique des versions du modèle.
- `site-status.json` — fraîcheur et contrôles des données (base, statistiques et cotes).
- `sync-status.json` — dernière synchronisation et commit source.

Ces JSON sont des artefacts de publication. Leurs valeurs doivent provenir des workflows ou du moteur, jamais d'une saisie manuelle.

## Statut scientifique du modèle

Les estimations reposent sur une baseline Poisson expérimentale. Le backtest chronologique actuel est descriptif : calibration, comparaison à une baseline de marché et validation hors échantillon restent nécessaires. Aucune prédiction n'est déclarée validée et aucune rentabilité n'est garantie.

## Contrat de publication et sécurité

- Ne jamais ajouter de secrets, clés API, jetons, identifiants privés ou données brutes confidentielles.
- Ne publier que des résultats dérivés explicitement exportés par le workflow prévu.
- N'afficher scores, cotes et probabilités que lorsqu'ils sont présents et valides dans les données.
- En cas d'absence ou d'incohérence, afficher un état indisponible plutôt que fabriquer un résultat.
- Conserver la mention du caractère expérimental du modèle.

## Synchronisation et déploiement

Le dépôt privé synchronise les pages et régénère les données publiques lors des changements pertinents du site, du modèle ou des archives. La synchronisation GitHub et le déploiement sur l'hébergement web sont deux opérations distinctes.

### Vérifications avant publication

1. Les deux pages principales chargent sans erreur les données JSON.
2. La navigation, les filtres et les détails fonctionnent sur ordinateur et mobile.
3. Les cotes absentes restent affichées comme indisponibles.
4. Les statuts de fraîcheur correspondent aux fichiers générés.
