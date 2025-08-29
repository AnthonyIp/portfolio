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

Les fonctions sont automatiquement déployées avec votre site. Assurez-vous que votre `netlify.toml` contient :

```toml
[build]
  functions = "netlify/functions"
```
