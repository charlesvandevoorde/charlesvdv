# Portfolio Charles Van de Voorde

Site portfolio freelance — Eleventy + Decap CMS + Netlify

## Démarrage rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer le serveur local
```bash
npm start
# → http://localhost:8080/fr/
```

### 3. Builder pour la production
```bash
npm run build
# → dossier /_site/
```

---

## Déploiement sur Netlify

### Étape 1 — Pousser sur GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TON-USER/portfolio-cvdv.git
git push -u origin main
```

### Étape 2 — Connecter Netlify
1. Aller sur [app.netlify.com](https://app.netlify.com)
2. "Add new site" → "Import an existing project" → GitHub
3. Sélectionner le repo
4. Build command : `npm run build`
5. Publish directory : `_site`
6. Cliquer "Deploy site"

### Étape 3 — Activer Netlify Identity
1. Site settings → Identity → **Enable Identity**
2. Registration : changer en **Invite only**
3. Services → **Enable Git Gateway**

### Étape 4 — Activer les notifications email du formulaire
1. Forms → `contact` → Notifications
2. Ajouter `charles.vandevoorde@gmail.com`

### Étape 5 — Accéder au CMS
1. Inviter votre email : Identity → Invite users
2. Aller sur `https://votre-site.netlify.app/admin/`
3. Accepter l'invitation → définir un mot de passe

---

## Structure des contenus éditables

| Contenu | Dossier |
|---------|---------|
| Projets FR | `content/projets/fr/` |
| Projets EN | `content/projets/en/` |
| Projets PT-BR | `content/projets/pt-br/` |
| Témoignages FR | `content/temoignages/fr/` |
| Services FR | `content/services/fr/` |

---

## Stack technique
- **Eleventy 3** — générateur de site statique
- **Decap CMS** — interface d'édition `/admin`
- **Netlify** — hébergement, Forms, Identity
- **CSS vanilla** avec variables custom
- **JS vanilla** — slider, animations, filtre portfolio
