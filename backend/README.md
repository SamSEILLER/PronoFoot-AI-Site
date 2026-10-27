# Backend d’analyse IA — PronoFoot AI

Le site GitHub Pages reste statique. L’analyse IA est servie par un Cloudflare Worker séparé afin qu'aucune clé fournisseur ne soit envoyée au navigateur.

## Architecture

1. GitHub Pages sert `index.html` et `data/predictions-data.json`.
2. Le navigateur calcule les cotes justes et le ROI théorique à partir des probabilités et cotes du JSON. Ces calculs ne prouvent pas que le modèle est calibré.
3. Le navigateur envoie uniquement le match sélectionné au Worker.
4. Le Worker valide la requête et appelle l'API OpenAI à l'aide du secret serveur `OPENAI_API_KEY`.
5. Le Worker renvoie l'analyse. La clé API ne doit jamais être placée dans les fichiers du site.

## Déploiement (à faire une fois)

Prérequis : compte Cloudflare, Node.js et Wrangler.

1. Depuis la racine de ce dépôt, installe Wrangler si nécessaire : `npm install --save-dev wrangler`.
2. Connecte-toi : `npx wrangler login`.
3. Ajoute le secret au Worker, sans le committer :
   `npx wrangler secret put OPENAI_API_KEY`
4. Déploie :
   `npx wrangler deploy`
5. Dans Cloudflare, vérifie que la variable `ALLOWED_ORIGIN` vaut exactement `https://samseiller.github.io`. Si le site est servi depuis un autre domaine, remplace-la par l'origine réelle, sans chemin final.
6. Copie l'URL HTTPS du Worker affichée par Wrangler.
7. Ouvre le site, sélectionne un match, clique sur « Configurer le backend sécurisé » et colle uniquement l'URL du Worker. Cette URL est stockée dans le navigateur ; ne colle jamais la clé API dans le site.

Le déploiement Cloudflare n'est pas exécuté par GitHub Pages et doit être réalisé séparément. La fonctionnalité statistique locale fonctionne même si le backend n'est pas configuré.

## Sécurité et limites

- La clé `OPENAI_API_KEY` est un secret Cloudflare, jamais une variable frontend.
- CORS restreint le navigateur à l'origine définie par `ALLOWED_ORIGIN`. CORS n'est pas une authentification et ne protège pas contre les appels directs abusifs ; avant un usage public, ajouter une protection anti-abus/rate limiting Cloudflare et des plafonds de dépenses.
- L'endpoint n'accepte que POST JSON et limite les champs de texte.
- L'appel fournisseur utilise `store: false`.
- L'IA ne consulte pas automatiquement les blessures, compositions, météo ou sources externes. Elle analyse les champs fournis et doit signaler les manques.
- Le modèle de prédiction du site est expérimental. Les cotes peuvent être absentes ou anciennes. Les résultats ne constituent pas un conseil financier ni une garantie de gain.

## Variables

- Secret : `OPENAI_API_KEY` (obligatoire).
- Variable : `ALLOWED_ORIGIN` (origine exacte du site public).
- Variable : `OPENAI_MODEL` (optionnelle ; défaut `gpt-4.1-mini`).
