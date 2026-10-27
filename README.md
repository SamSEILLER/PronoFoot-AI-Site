# PronoFoot AI — site public

Site public destiné à présenter les données produites par le moteur privé [PronoFoot-AI](https://github.com/SamSEILLER/PronoFoot-AI).

## État actuel — 27 octobre 2026

**L'interface a été remise à zéro.** Les anciennes pages `index.html` et `predictions.html` ont été supprimées. Le fichier `index-alternative.html` n'était pas présent dans ce dépôt. Une nouvelle interface doit être conçue avant que le site puisse être considéré comme navigable.

Cette remise à zéro concerne l'affichage uniquement. Les données récupérées et les artefacts JSON existants sont conservés comme base de travail ; ils ne doivent pas être supprimés ou remplacés manuellement dans le cadre de la refonte visuelle.

## Artefacts de données

Ces fichiers sont générés par les workflows du moteur privé et ne doivent pas être modifiés manuellement :

- `data/predictions-data.json` — rencontres, résultats et estimations expérimentales exportées.
- `data/model-history.json` — historique des versions et évaluations disponibles.
- `data/site-status.json` — état des collectes et contrôles de données.
- `data/sync-status.json` — statut de synchronisation et commit source.

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

Le workflow du dépôt privé continue de synchroniser les artefacts de données publics, mais ne copie plus de pages HTML. La synchronisation GitHub et le déploiement web sont distincts. En l'absence de nouvelle page d'accueil, une erreur 404 sur la racine du site est attendue ; elle ne signifie pas nécessairement que la collecte des données a échoué.

## Étapes avant remise en service

1. Définir l'architecture et les pages de la nouvelle interface.
2. Vérifier le contrat réel des JSON avant de développer les composants d'affichage.
3. Créer la nouvelle page d'accueil et les pages complémentaires nécessaires.
4. Tester le chargement des données, les états vides, les données manquantes et l'affichage mobile.
5. Vérifier le déploiement public et le statut des données avant d'annoncer la remise en service.
