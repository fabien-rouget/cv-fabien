# AGENTS.md — Contexte & Cartographie du projet `cv-fabien`

Ce fichier sert de mémoire persistante et de guide d'architecture pour toutes les sessions d'agents IA (Antigravity, Claude Code, Codex, Cursor). Il est chargé automatiquement à l'ouverture du workspace.

---

## 1. Vue d'ensemble & Dépôts GitHub

- **Objet du projet** : Site CV statique bilingue (**Anglais par défaut + Français**) et générateur de CV PDF de **Fabien Rouget** (*Software Engineer • Tech Lead • C# • Freelance*).
- **URLs de production** :
  - `https://cv.fabien-rouget.fr/` : Redirige instantanément vers `https://cv.fabien-rouget.fr/en/`.
  - `https://cv.fabien-rouget.fr/en/` : Version anglaise (langue par défaut).
  - `https://cv.fabien-rouget.fr/fr/` : Version française.
- **Architecture des dépôts GitHub (1 seul dépôt actif)** :
  - **Dépôt unique (Code + Publication)** : [`https://github.com/fabien-rouget/cv-fabien`](https://github.com/fabien-rouget/cv-fabien) (dépôt **public**, branche `main`).
  - Contrairement au projet `obsidian-vault` (privé) + `obsidian-vault-pages` (public), **il n'y a pas de second dépôt de publication séparé pour le CV**. La publication est assurée directement depuis `fabien-rouget/cv-fabien` par le workflow GitHub Actions `.github/workflows/deploy.yml` (`build_type: workflow`, via `withastro/action@v6` et `actions/deploy-pages@v5`).

---

## 2. Stack Technique & Commandes

- **Framework Web** : [Astro v6](https://astro.build/) (`^6.1.5`), rendu 100 % statique, TypeScript `strict`, configuration i18n (`defaultLocale: 'en'`, `locales: ['en', 'fr']`).
- **Runtime** : Node.js `>=22.12.0` (requis pour le flag `--experimental-strip-types` utilisé par le script PDF).
- **Commandes (`package.json`)** :
  - `npm run dev` : Serveur de développement Astro (`http://localhost:4321`).
  - `npm run pdf` : Exécute `node --experimental-strip-types scripts/generate-pdf.mjs` pour régénérer `public/cv-fabien-rouget-en.pdf` et `public/cv-fabien-rouget-fr.pdf` à partir de `src/data/en/*.ts` et `src/data/fr/*.ts`.
  - `npm run build` : Exécute `npm run pdf && astro build` (régénère les 2 PDF puis compile le site statique dans `dist/`).
  - `npm run preview` : Prévisualise le build de production localement.

---

## 3. Cartographie du Code

```text
cv-fabien/
├── .github/workflows/
│   └── deploy.yml               # CI/CD GitHub Actions : build Astro (inclut les 2 PDF) + deploy sur GitHub Pages (push sur main)
├── public/                      # Assets statiques copiés tels quels à la racine du build
│   ├── CNAME                    # Domaine personnalisé : cv.fabien-rouget.fr
│   ├── cv-fabien-rouget-en.pdf  # CV PDF anglais généré par `npm run pdf`
│   ├── cv-fabien-rouget-fr.pdf  # CV PDF français généré par `npm run pdf`
│   ├── favicon.ico / favicon.svg
│   ├── images/
│   │   └── fabien-rouget.jpeg   # Photo de profil (400x400, JPEG) utilisée sur le site ET dans les PDF
│   └── logos/                   # Logos entreprises (betclic.svg, floa.png, believe.svg, cdiscount.svg + ATTRIBUTIONS.md)
├── scripts/
│   └── generate-pdf.mjs         # Générateur PDF 100 % custom (sans librairie externe) générant les versions EN et FR
├── src/
│   ├── data/                    # SOURCE DE VÉRITÉ UNIQUE (partagée par le site Astro et les PDF)
│   │   ├── types.ts             # Interfaces TypeScript partagées (Locale, Profile, ContactLink, Experience, SkillCategory, Education, UiLabels)
│   │   ├── index.ts             # Point d'entrée `getCvData(locale)` et dictionnaire des libellés d'interface (`uiByLocale`)
│   │   ├── en/                  # Données du CV en anglais (profile.ts, contact.ts, experience.ts, skills.ts, education.ts)
│   │   └── fr/                  # Données du CV en français (profile.ts, contact.ts, experience.ts, skills.ts, education.ts)
│   ├── layouts/
│   │   └── MainLayout.astro     # Squelette HTML5 (`lang={locale}`), SEO/OpenGraph/hreflang, Google Fonts (Manrope & Sora), import `global.css`
│   ├── components/
│   │   ├── CvPage.astro         # Composant de page complet paramétré par `locale: "en" | "fr"`
│   │   ├── TopNav.astro         # Barre de navigation sticky par ancres + sélecteur de langue `EN | FR`
│   │   ├── Hero.astro           # En-tête : nom, titre, accroche, boutons de contact/PDF, photo de profil
│   │   ├── Section.astro        # Conteneur générique de section (`<section id=... aria-labelledby=...>`)
│   │   ├── ExperienceCard.astro # Carte d'expérience : logo, rôle, méta (société, lieu, période compactée), contexte, impacts, TagList
│   │   ├── SkillGroup.astro     # Carte de catégorie de compétences + TagList
│   │   └── TagList.astro        # Liste de badges/pills (`<ul class="tag-list"><li class="tag">...`)
│   ├── pages/
│   │   ├── index.astro          # Redirection instantanée `/` -> `/en/`
│   │   ├── en/index.astro       # Page CV en anglais (`<CvPage locale="en" />`)
│   │   └── fr/index.astro       # Page CV en français (`<CvPage locale="fr" />`)
│   └── styles/
│       └── global.css           # Design system complet (variables CSS, glassmorphism, sélecteur de langue, responsive <960px et <720px)
├── AGENTS.md                    # Documentation d'architecture et contexte persistant pour les agents IA
├── astro.config.mjs             # Configuration Astro (`site: 'https://cv.fabien-rouget.fr'`, i18n `en` / `fr`)
└── tsconfig.json                # Config TypeScript (`astro/tsconfigs/strict`)
```

---

## 4. Fonctionnement détaillé & Règles d'évolution

### A. Modifier le contenu du CV (Textes, Expériences, Compétences, Formations)
1. **Modifier les fichiers dans `src/data/en/` et `src/data/fr/`** (`profile.ts`, `experience.ts`, `skills.ts`, `education.ts`, `contact.ts`). Toute modification de structure doit respecter les interfaces de `src/data/types.ts` et être répercutée dans les deux langues.
2. **Libellés d'interface (titres de sections, boutons)** : Centralisés dans `uiByLocale` au sein de `src/data/index.ts`.
3. **Régénérer les PDF après une modification de `src/data/`** :
   - Lancer `npm run pdf` (ou `npm run build`, qui enchaîne automatiquement `npm run pdf && astro build`).
   - Vérifier le rendu de `public/cv-fabien-rouget-en.pdf` et `public/cv-fabien-rouget-fr.pdf` et les inclure dans le commit Git.

### B. Particularités et contraintes du générateur PDF (`scripts/generate-pdf.mjs`)
Le script `scripts/generate-pdf.mjs` génère des fichiers `%PDF-1.4` bas niveau sans dépendance externe :
- **Boucle multi-langues** : Appelle `generatePdfForLocale(locale)` pour chaque langue de `locales` (`["en", "fr"]`).
- **Encodage & Caractères spéciaux** : Utilise `WinAnsiEncoding` (`latin1`) avec les polices standard PDF `/Helvetica` (`F1`) et `/Helvetica-Bold` (`F2`). La fonction `sanitize()` convertit les caractères typographiques (`’` -> `'`, `→` -> `->`, `œ` -> `oe`, `µ` -> `micro`, `…` -> `...`) et supprime tout caractère hors plage Latin-1.
- **Photo de profil** : L'image `public/images/fabien-rouget.jpeg` est intégrée directement sous forme de flux JPEG brut (`/Filter /DCTDecode`) avec des dimensions codées en dur (`/Width 400 /Height 400`). Si la photo change de format (ex. PNG) ou de dimensions, il faut adapter l'objet PDF n°5 dans `buildPdf()`.
- **Formatage des périodes (`compactPeriod`)** : Transforme `"de X à Y"` (FR) et `"from X to Y"` (EN) en `"X -> Y"` dans le PDF (et `"X → Y"` sur le web dans `ExperienceCard.astro`).

### C. Design System & Styles (`src/styles/global.css`)
- **Palette** : Thème clair uniquement (`color-scheme: light`), fond chaud (`#f7f4ee` -> `#edf3f0`), texte principal `#1c2733`, accent principal bleu-vert `#406f74` (`--color-accent`), accent fort `#213344`, accent secondaire doré `#c7a34b` (`--color-accent-secondary`).
- **Typographie** : `Sora` pour les titres (`h1`, `h3`) et `Manrope` pour le corps de texte et les `h2` de section.
- **Breakpoints Responsive** :
  - `@media (max-width: 960px)` : Passage de `.strength-grid` et `.closing-grid` en 1 colonne.
  - `@media (max-width: 720px)` : Adaptation mobile (barre `.page-nav` en grille 2 colonnes 3x2 regroupant les 5 ancres de section et le sélecteur `EN | FR`, photo du Hero replacée au-dessus du texte avec `order: -1`, en-tête des cartes d'expérience compacté en grille `display: contents`).
