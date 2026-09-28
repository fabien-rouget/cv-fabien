# AGENTS.md — Contexte & Cartographie du projet `cv-fabien`

Ce fichier sert de mémoire persistante et de guide d'architecture pour toutes les sessions d'agents IA (Antigravity, Claude Code, Codex, Cursor). Il est chargé automatiquement à l'ouverture du workspace.

---

## 1. Vue d'ensemble & Dépôts GitHub

- **Objet du projet** : Site CV statique et générateur de CV PDF de **Fabien Rouget** (*Ingénieur logiciel • Lead tech • C# • Freelance*).
- **URL de production** : `https://cv.fabien-rouget.fr/` (hébergé sur GitHub Pages avec HTTPS activé et domaine personnalisé via `public/CNAME`).
- **Architecture des dépôts GitHub (Attention — 1 seul dépôt actif)** :
  - **Dépôt unique (Code + Publication)** : [`https://github.com/fabien-rouget/cv-fabien`](https://github.com/fabien-rouget/cv-fabien) (dépôt **public**, branche `main`).
  - Contrairement au projet `obsidian-vault` (privé) + `obsidian-vault-pages` (public), **il n'y a pas de second dépôt de publication séparé pour le CV**. La publication est assurée directement depuis `fabien-rouget/cv-fabien` par le workflow GitHub Actions `.github/workflows/deploy.yml` (`build_type: workflow`, via `withastro/action@v6` et `actions/deploy-pages@v5`).

---

## 2. Stack Technique & Commandes

- **Framework Web** : [Astro v6](https://astro.build/) (`^6.1.5`), rendu 100 % statique (zéro JavaScript client), TypeScript `strict`.
- **Runtime** : Node.js `>=22.12.0` (requis pour le flag `--experimental-strip-types` utilisé par le script PDF).
- **Commandes (`package.json`)** :
  - `npm run dev` : Serveur de développement Astro (`http://localhost:4321`).
  - `npm run pdf` : Exécute `node --experimental-strip-types scripts/generate-pdf.mjs` pour régénérer `public/cv-fabien-rouget.pdf` à partir de `src/data/*.ts`.
  - `npm run build` : Exécute `npm run pdf && astro build` (régénère le PDF puis compile le site statique dans `dist/`).
  - `npm run preview` : Prévisualise le build de production localement.

---

## 3. Cartographie du Code

```text
cv-fabien/
├── .github/workflows/
│   └── deploy.yml               # CI/CD GitHub Actions : build Astro (inclut PDF) + deploy sur GitHub Pages (push sur main)
├── public/                      # Assets statiques copiés tels quels à la racine du build
│   ├── CNAME                    # Domaine personnalisé : cv.fabien-rouget.fr
│   ├── cv-fabien-rouget.pdf     # CV PDF généré par `npm run pdf` (servi au téléchargement)
│   ├── favicon.ico / favicon.svg
│   ├── images/
│   │   └── fabien-rouget.jpeg   # Photo de profil (400x400, JPEG) utilisée sur le site ET dans le PDF
│   └── logos/                   # Logos entreprises (betclic.svg, floa.png, believe.svg, cdiscount.svg + ATTRIBUTIONS.md)
├── scripts/
│   └── generate-pdf.mjs         # Générateur PDF 100 % custom (sans librairie externe) lisant `src/data/*.ts`
├── src/
│   ├── data/                    # SOURCE DE VÉRITÉ UNIQUE (partagée par le site Astro et le PDF)
│   │   ├── profile.ts           # Identité, titre, résumé hero, photo, 4 piliers d'expertise (`strengths`), notes perso
│   │   ├── contact.ts           # Liens d'action du Hero (Email, LinkedIn, téléchargement PDF)
│   │   ├── experience.ts        # Liste ordonnée des 6 expériences professionnelles (rôle, société, logo, contexte, impacts, stack)
│   │   ├── skills.ts            # 4 catégories de compétences (Langages/frameworks, IA, BDD, Outils/plateformes)
│   │   └── education.ts         # Liste des diplômes / formations (3iL 2016, Licence 2014)
│   ├── layouts/
│   │   └── MainLayout.astro     # Squelette HTML5 (`lang="fr"`), SEO/OpenGraph, Google Fonts (Manrope & Sora), import `global.css`
│   ├── components/
│   │   ├── TopNav.astro         # Barre de navigation sticky par ancres (#top, #presentation, #experiences, #competences, #formations)
│   │   ├── Hero.astro           # En-tête : nom, titre, accroche, boutons de contact/PDF, photo de profil
│   │   ├── Section.astro        # Conteneur générique de section (`<section id=... aria-labelledby=...>`)
│   │   ├── ExperienceCard.astro # Carte d'expérience : logo, rôle, méta (société, lieu, période compactée), contexte, impacts, TagList
│   │   ├── SkillGroup.astro     # Carte de catégorie de compétences + TagList
│   │   └── TagList.astro        # Liste de badges/pills (`<ul class="tag-list"><li class="tag">...`)
│   ├── pages/
│   │   └── index.astro          # Page unique assemblant tous les composants et la grille de fin (Formations + En dehors du code)
│   └── styles/
│       └── global.css           # Design system complet (variables CSS, glassmorphism, responsive <960px et <720px)
├── AGENTS.md                    # Documentation d'architecture et contexte persistant pour les agents IA
├── astro.config.mjs             # Configuration Astro (`site: 'https://cv.fabien-rouget.fr'`)
└── tsconfig.json                # Config TypeScript (`astro/tsconfigs/strict`)
```

---

## 4. Fonctionnement détaillé & Règles d'évolution

### A. Modifier le contenu du CV (Textes, Expériences, Compétences, Formations)
1. **Toujours modifier les fichiers dans `src/data/`** (`profile.ts`, `experience.ts`, `skills.ts`, `education.ts`, `contact.ts`). Aucun texte métier (hors titres de sections dans `index.astro` et `generate-pdf.mjs`) n'est codé en dur dans les composants `.astro`.
2. **Régénérer le PDF après une modification de `src/data/`** :
   - Lancer `npm run pdf` (ou `npm run build`, qui enchaîne automatiquement `npm run pdf && astro build`).
   - Vérifier le rendu de `public/cv-fabien-rouget.pdf` et l'inclure dans le commit Git pour garder le dépôt synchronisé.

### B. Particularités et contraintes du générateur PDF (`scripts/generate-pdf.mjs`)
Le script `scripts/generate-pdf.mjs` génère un fichier `%PDF-1.4` bas niveau sans dépendance externe :
- **Encodage & Caractères spéciaux** : Utilise `WinAnsiEncoding` (`latin1`) avec les polices standard PDF `/Helvetica` (`F1`) et `/Helvetica-Bold` (`F2`). La fonction `sanitize()` convertit les caractères typographiques (`’` -> `'`, `→` -> `->`, `œ` -> `oe`, `µ` -> `micro`, `…` -> `...`) et supprime tout caractère hors plage Latin-1. Si vous ajoutez des symboles Unicode particuliers dans `src/data/`, vérifiez leur rendu via `sanitize()`.
- **Photo de profil** : L'image `public/images/fabien-rouget.jpeg` est intégrée directement sous forme de flux JPEG brut (`/Filter /DCTDecode`) avec des dimensions codées en dur (`/Width 400 /Height 400` à la ligne 401). Si la photo change de format (ex. PNG) ou de dimensions, il faut adapter l'objet PDF n°5 dans `buildPdf()`.
- **Logos entreprises** : Utilisés uniquement sur le web (`ExperienceCard.astro`), ignorés dans le PDF.
- **Mise en page & Pagination** : Calculée manuellement via `y`, `ensureSpace()`, `estimateExperienceHeight()`, et `estimateClosingSectionsHeight()`. Les sections de fin (`Compétences`, `Formations`, `En dehors du code`) sont groupées via `drawClosingSections()` pour éviter d'être coupées maladroitement si elles tiennent ensemble.

### C. Design System & Styles (`src/styles/global.css`)
- **Palette** : Thème clair uniquement (`color-scheme: light`), fond chaud (`#f7f4ee` -> `#edf3f0`), texte principal `#1c2733`, accent principal bleu-vert `#406f74` (`--color-accent`), accent fort `#213344`, accent secondaire doré `#c7a34b` (`--color-accent-secondary`, utilisé notamment pour les liserés supérieurs des sections et les puces).
- **Typographie** : `Sora` pour les titres (`h1`, `h3`) et `Manrope` pour le corps de texte et les `h2` de section.
- **Breakpoints Responsive** :
  - `@media (max-width: 960px)` : Passage de `.strength-grid` et `.closing-grid` en 1 colonne.
  - `@media (max-width: 720px)` : Adaptation mobile (navigation en grille 2 colonnes avec dernier élément impair sur toute la largeur, photo du Hero replacée au-dessus du texte avec `order: -1`, en-tête des cartes d'expérience compacté en grille `display: contents`).
