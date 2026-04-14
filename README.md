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
npm run build
npm run preview
```

## Publication GitHub Pages

Le projet est préparé pour une future publication via GitHub Pages avec le domaine personnalisé :

```text
https://cv.fabien-rouget.fr
```

### Ce qui est déjà en place

- `astro.config.mjs`
  - `site` pointe sur `https://cv.fabien-rouget.fr`
  - `base` vaut `/` par défaut, ce qui est le bon comportement pour un sous-domaine personnalisé
- `.github/workflows/deploy.yml`
  - workflow GitHub Actions basé sur l’action officielle Astro
  - build sur `main`
  - déploiement via GitHub Pages
- `public/CNAME`
  - contient `cv.fabien-rouget.fr`

### Base path

Pour le domaine personnalisé prévu, aucun `base path` supplémentaire n’est nécessaire.

Si un jour tu republies ce site sous un sous-chemin de type `https://fabienrouget.github.io/cv-fabien/`, tu peux tester ou builder avec :

```bash
PUBLIC_BASE_PATH=/cv-fabien/ npm run build
```

Le fichier `astro.config.mjs` normalise automatiquement cette valeur.

### Mise en ligne le moment venu

1. Pousser le projet sur GitHub.
2. Dans `Settings > Pages`, choisir `GitHub Actions` comme source.
3. Dans la même page, renseigner le domaine personnalisé `cv.fabien-rouget.fr`.
4. Chez le fournisseur DNS, créer un enregistrement `CNAME` :

```text
cv.fabien-rouget.fr -> fabienrouget.github.io
```

5. Une fois le domaine validé par GitHub Pages, activer HTTPS.

## Vérification production

Le build de production se vérifie localement avec :

```bash
npm run build
```
