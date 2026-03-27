# Projet : Portfolio Charles Van de Voorde

## Stack
- Eleventy (11ty) v3 — SSG
- Decap CMS — interface /admin, auth via Netlify Identity
- Netlify — hébergement + Forms + Identity
- CSS vanilla avec variables custom (style.css)
- JS vanilla (main.js) — zéro librairie
- Netlify Forms pour le formulaire de contact
- Multilingue FR / EN / PT-BR via collections séparées

## Assets
- Photo de profil : `/assets-source/photo-profil.png`
- CV PDF téléchargeable : `/public/cv-charles-vdv.pdf`
- Logo nav (CVDV) : `/assets-source/assets_oldsite/CVDV.png`
- Favicon : `/assets-source/assets_oldsite/CV.png`
- Logos employeurs : `/assets-source/assets_oldsite/` (Oresys, Approach People, Adecco, Parkours)
- Photos personnelles : `/assets-source/assets_oldsite/` (voyages, portraits)

## Structure
```
src/
  _includes/    → base.njk, nav.njk, footer.njk
  fr/           → index.njk, cv.njk, projets/projet.njk
  en/           → index.njk, cv.njk, projects/project.njk
  pt-br/        → index.njk, cv.njk, projetos/projeto.njk
  assets/css/   → style.css
  assets/js/    → main.js
content/
  projets/fr|en|pt-br/   → .md par projet
  temoignages/fr|en|pt-br/ → .md par témoignage
  services/fr|en|pt-br/  → .md par service
admin/
  index.html    → Decap CMS
  config.yml    → Collections éditables
public/
  cv-charles-vdv.pdf
```

## Conventions
- Toutes les couleurs et polices via variables CSS dans `:root {}` (style.css)
- Contenus éditables dans `/content/` au format Markdown + frontmatter YAML
- Layouts dans `src/_includes/`
- Pages FR → `/src/fr/` | EN → `/src/en/` | PT-BR → `/src/pt-br/`

## Décisions prises
- Slider témoignages : vanilla JS, autoplay 5s, pause au hover, dots + flèches
- Projets internes : pages dédiées avec contexte / problématique / solution / résultats
- Projets externes : lien direct nouvel onglet depuis la grille portfolio
- Multilingue : 3 collections Eleventy séparées, pas de plugin i18n
- Switcher de langue : drapeaux emoji 🇫🇷 🇬🇧 🇧🇷 dans la nav
- Formulaire : Netlify Forms natif (data-netlify="true"), envoi vers charles.vandevoorde@gmail.com
- Redirect racine `/` → `/fr/` via meta refresh + netlify.toml

## Pour modifier le design
- Couleurs → `--color-bg`, `--color-accent`, `--color-text` dans `style.css`
- Typographie → `--font-title` (Fraunces), `--font-body` (DM Sans) dans `style.css`
- Couleur accent actuelle : `#B5813A` (or chaud)

## Commandes
```bash
npm install        # installer les dépendances
npm start          # serveur local http://localhost:8080
npm run build      # build production dans /_site/
```

## Déploiement Netlify
1. Pousser le repo sur GitHub
2. Connecter le repo sur app.netlify.com (Build command: `npm run build`, Publish: `_site`)
3. Activer Netlify Identity (Site settings → Identity → Enable)
4. Activer Git Gateway (Identity → Services → Enable Git Gateway)
5. Inviter un utilisateur admin et accéder à `/admin/`

## Formulaire de contact
- Les soumissions arrivent dans Netlify → Forms
- Pour recevoir les emails : Netlify → Forms → Notifications → ajouter charles.vandevoorde@gmail.com
