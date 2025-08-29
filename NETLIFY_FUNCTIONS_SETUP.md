# Configuration des Fonctions Netlify pour l'Envoi d'Emails

## 🚀 Vue d'ensemble

Ce projet utilise des fonctions Netlify serverless pour gérer l'envoi d'emails de manière sécurisée, évitant ainsi les problèmes de CSP et d'exposition des clés API côté client.

## 🔧 Configuration Requise

### 1. Variables d'Environnement Netlify

Dans votre dashboard Netlify, allez dans **Site settings > Environment variables** et ajoutez :

```
RESEND_API_KEY = votre_clé_api_resend_ici
```

### 2. Configuration des Fonctions

Les fonctions sont automatiquement déployées avec votre site. Votre `netlify.toml` contient déjà :

```toml
[build]
  functions = "netlify/functions"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
```

### 3. Dépendances

Toutes les dépendances nécessaires sont installées dans le package.json principal :
- `resend` - Pour l'envoi d'emails
- `@react-email/render` - Dépendance requise par Resend
