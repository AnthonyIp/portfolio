# Portfolio Anthony IP - Développeur Full-Stack

Un portfolio moderne et interactif construit avec React 18, TypeScript, Vite et TailwindCSS.

## 🚀 Fonctionnalités

### ✨ Interface utilisateur
- **Mode sombre/clair** avec persistance des préférences
- **Design responsive** optimisé pour tous les appareils
- **Animations fluides** et transitions CSS
- **Particules interactives** en arrière-plan avec particles.js

### 🌍 Internationalisation
- **Support FR/EN** avec détection automatique de la langue du navigateur
- **Traductions centralisées** dans des fichiers JSON
- **Meta tags hreflang** pour le SEO international
- **Contenu localisé** pour chaque projet et section

### 📱 Architecture modulaire
- **Architecture composant** réutilisable et maintenable
- **Props typées** avec TypeScript
- **Hooks personnalisés** pour la logique métier
- **Composants atomiques** pour une meilleure réutilisabilité
- **Clean Code** et principes SOLID

### 🎯 Section Projets
- **Filtrage par technologie** avec boutons interactifs
- **Pagination par pastilles** (6 projets par page)
- **Modale détaillée** au clic sur une carte de projet
- **Informations enrichies** : fonctionnalités, durée, équipe, rôle, défis
- **Liens externes** GitHub et démo en direct
- **Contenu multilingue** pour chaque projet

### 📊 Section Timeline
- **Parcours chronologique** avec icônes distinctives
- **Badges de technologies** pour chaque expérience
- **Compétences transverses** (DevOps, Agile, Architecture, etc.)
- **Design alterné** gauche/droite pour une meilleure lisibilité

### 📞 Section Contact
- **Liens cliquables** : email (mailto), téléphone (tel), GitHub, LinkedIn
- **Bouton CV** avec téléchargement en français/anglais
- **Formulaire de contact** stylisé et accessible

### 🔍 SEO et Accessibilité
- **Meta tags complets** : description, OpenGraph, Twitter Cards
- **Balises sémantiques** HTML5 avec ARIA labels
- **Navigation clavier** et lecteurs d'écran
- **Images alt** et attributs d'accessibilité

### ⚡ Performance
- **Lazy loading** des composants
- **Optimisation des images** et assets
- **Code splitting** avec Vite
- **Service Worker** pour le cache offline

## 🛠️ Technologies utilisées

- **Frontend** : React 18, TypeScript, TailwindCSS
- **Build** : Vite, ESLint
- **Icons** : Lucide React
- **Particules** : particles.js
- **État** : React Hooks (useState, useEffect, useMemo)
- **Stockage** : LocalStorage pour les préférences

## 📁 Structure du projet

```
src/
├── components/          # Composants React réutilisables
│   ├── shared/         # Composants partagés
│   ├── projects/       # Composants liés aux projets
│   │   ├── Projects.tsx       # Composant principal
│   │   ├── ProjectModal.tsx   # Modale détaillée
│   │   ├── ProjectCard.tsx    # Carte de projet
│   │   ├── TechnologyButton.tsx # Bouton de filtrage
│   │   └── PaginationDots.tsx  # Pagination
│   ├── Navbar.tsx      # Navigation avec toggle thème/langue
│   ├── Hero.tsx        # Section d'accueil
│   ├── About.tsx       # À propos avec compétences
│   ├── Timeline.tsx    # Parcours avec badges tech/skills
│   ├── Contact.tsx     # Contact avec liens cliquables
│   ├── Footer.tsx      # Pied de page
│   ├── ParticlesBackground.tsx # Arrière-plan animé
│   └── BackToTop.tsx   # Bouton retour en haut
├── hooks/              # Hooks personnalisés
│   ├── useProjects.ts  # Logique des projets
│   └── useLocalStorage.ts # Gestion du stockage local
├── types/             # Types TypeScript
│   └── projects.ts    # Types liés aux projets
├── constants/         # Constantes de l'application
│   └── projects.ts    # Constantes des projets
└── App.tsx            # Composant principal

public/
├── datas/              # Données JSON
│   ├── i18n.json       # Traductions FR/EN
│   ├── data-timeline.json # Données timeline
│   └── data-projects.json # Données projets enrichies
├── images/             # Images des projets
└── index.html          # Template HTML avec meta tags
```

## 🚀 Installation et démarrage

```bash
# Cloner le projet
git clone <repository-url>
cd project

# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 📊 Structure des données

### Projets
```typescript
type Project = {
    title_fr: string;
    title_en: string;
    description_fr: string;
    description_en: string;
    tech: string[];
    image?: string;
    github?: string;
    live?: string;
    category: 'web' | 'mobile' | 'api' | string;
    features_fr?: string[];
    features_en?: string[];
    duration_fr?: string;
    duration_en?: string;
    team_fr?: string;
    team_en?: string;
    role_fr?: string;
    role_en?: string;
    challenges_fr?: string;
    challenges_en?: string;
};
```

## 🎨 Personnalisation

### Couleurs et thème
- Modifiez les classes Tailwind dans les composants
- Ajustez les gradients dans `bg-gradient-to-r from-blue-400 to-purple-500`

### Particules
- Configurez l'apparence dans `ParticlesBackground.tsx`
- Ajustez la densité et l'interactivité

### Données
- Modifiez les fichiers JSON dans `public/datas/`
- Ajoutez vos propres projets et expériences

## 🔧 Développement

### Ajouter un nouveau composant
1. Créez le fichier dans le dossier approprié sous `src/components/`
2. Créez les types associés dans `src/types/`
3. Ajoutez les constantes nécessaires dans `src/constants/`
4. Créez un hook personnalisé si nécessaire dans `src/hooks/`
5. Importez et utilisez le composant où nécessaire

### Ajouter une nouvelle langue
1. Créez une nouvelle section dans `i18n.json`
2. Ajoutez les traductions dans `data-projects.json`
3. Mettez à jour les types dans `types/projects.ts`
4. Ajoutez la logique de détection dans `App.tsx`

## 📱 Responsive Design

- **Mobile First** : Design optimisé pour les petits écrans
- **Breakpoints** : sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid adaptatif** : Colonnes qui s'adaptent à la taille d'écran

## 🚀 Déploiement

Le projet est optimisé pour le déploiement sur :
- **Vercel** (recommandé)
- **Netlify**
- **GitHub Pages**
- **Serveur statique**

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📞 Contact

- **Email** : **anthonyip@hotmail.fr**
- **GitHub** : [@AnthonyIp](https://github.com/AnthonyIp)
- **LinkedIn** : [Anthony IP](https://linkedin.com/in/anthony-ip-1206)

---
