# CV Fabien Rouget

CV / site personnel statique bilingue (**anglais par défaut** `/en/` et **français** `/fr/`) construit avec Astro.

## Développement local

Depuis la racine du projet :

```bash
npm install
npm run dev
```

Commandes utiles :

```bash
npm run pdf
npm run build
npm run preview
```

La commande `npm run pdf` régénère les fichiers statiques `public/cv-fabien-rouget-en.pdf` et `public/cv-fabien-rouget-fr.pdf` à partir des données de `src/data/en/*.ts` et `src/data/fr/*.ts`. Elle est également exécutée automatiquement lors de `npm run build`.

## Documentation & Architecture

Voir [`AGENTS.md`](./AGENTS.md) pour la cartographie complète du code, le fonctionnement du générateur PDF et les règles d'évolution.

## Publication GitHub Pages

Le site est publié automatiquement sur GitHub Pages avec le domaine personnalisé :

- `https://cv.fabien-rouget.fr/` (redirige vers `/en/`)
- `https://cv.fabien-rouget.fr/en/` (version anglaise)
- `https://cv.fabien-rouget.fr/fr/` (version française)

### Configuration en place

- `astro.config.mjs` : `site` pointe sur `https://cv.fabien-rouget.fr` avec configuration `i18n` (`en` par défaut, `fr`)
- `.github/workflows/deploy.yml` : workflow GitHub Actions basé sur l’action officielle Astro (`withastro/action@v6`), exécuté à chaque push sur `main`
- `public/CNAME` : contient `cv.fabien-rouget.fr`

## Vérification production

Le build complet (régénération des 2 PDF + compilation Astro) se vérifie localement avec :

```bash
npm run build
```
