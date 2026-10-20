# PronoFoot-AI-Site

Site public de PronoFoot-AI. Ce dépôt est distinct du moteur d'analyse privé [PronoFoot-AI](https://github.com/SamSEILLER/PronoFoot-AI).

## Objectif

Fournir une interface publique pour les informations et analyses que le moteur privé aura explicitement validées et autorisées à publier.

## Contraintes de sécurité

- Ce dépôt est public : ne jamais y ajouter de secrets, clés API, jetons, données brutes privées ou informations sous licence sans autorisation.
- Le site ne doit pas se connecter directement aux ressources internes du moteur.
- Les données affichées devront comporter leur date de mise à jour et leurs limites pertinentes.
- En cas de données absentes, périmées ou invalides, afficher un état indisponible plutôt que fabriquer un résultat.

## Exploitation

Le projet doit pouvoir être modifié depuis le navigateur GitHub et déployé sur un hébergement distant, sans installation locale obligatoire. L'hébergeur et le pipeline de déploiement restent à choisir.

## Statut

Le dépôt contient actuellement uniquement ce README. L'interface, la source des données publiques et le déploiement ne sont pas encore implémentés.
