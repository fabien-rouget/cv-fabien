# CV Fabien Rouget

CV / site personnel statique construit avec Astro.

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

La commande `npm run pdf` régénère le fichier statique `public/cv-fabien-rouget.pdf` à partir des données de `src/data/*.ts`. Elle est également exécutée automatiquement lors de `npm run build`.

## Documentation & Architecture

Voir [`AGENTS.md`](./AGENTS.md) pour la cartographie complète du code, le fonctionnement du générateur PDF et les règles d'évolution.

## Publication GitHub Pages

Le site est publié automatiquement sur GitHub Pages avec le domaine personnalisé :

```text
https://cv.fabien-rouget.fr
```

### Configuration en place

- `astro.config.mjs` : `site` pointe sur `https://cv.fabien-rouget.fr`
- `.github/workflows/deploy.yml` : workflow GitHub Actions basé sur l’action officielle Astro (`withastro/action@v6`), exécuté à chaque push sur `main`
- `public/CNAME` : contient `cv.fabien-rouget.fr`

## Vérification production

Le build complet (régénération du PDF + compilation Astro) se vérifie localement avec :

```bash
npm run build
```
