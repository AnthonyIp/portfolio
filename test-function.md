# Test de la Fonction Netlify

## 🧪 Test Local

1. **Démarrer le serveur de développement** :
   ```bash
   npx netlify dev
   ```

2. **Tester la fonction** :
   ```bash
   curl -X POST http://localhost:8888/.netlify/functions/send-email \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "message": "Ceci est un test de la fonction d'envoi d'email."
     }'
   ```

## 🔍 Vérifications

### ✅ Fonction Démarre
- Le serveur Netlify démarre sans erreur
- La fonction est accessible sur `/.netlify/functions/send-email`

### ✅ Validation des Données
- Rejet des données invalides (400 Bad Request)
- Acceptation des données valides

### ✅ Envoi d'Email
- Vérifier que l'email est reçu
- Vérifier le format et le contenu

## 🐛 Dépannage

### Erreur "Function not found"
- Vérifier que le dossier `netlify/functions/` existe
- Vérifier que `send-email.ts` est présent

### Erreur de dépendances
- Vérifier que `resend` et `@react-email/render` sont installés
- Vérifier la configuration dans `netlify.toml`

### Erreur de build
- Exécuter `npm run build` pour vérifier la compilation
- Vérifier les logs d'erreur
