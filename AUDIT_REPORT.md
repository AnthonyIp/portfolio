# Audit complet du projet portfolio

_Date: 2026-03-02_

## Périmètre de l'audit
- Qualité du code (lint/type-check/build)
- Sécurité applicative (headers, validation, dépendances)
- Architecture & maintenabilité
- Performance front-end
- SEO / accessibilité

## Résultats exécutifs
- **État global**: bon niveau de qualité et base saine (TypeScript + ESLint + build OK).
- **Risque principal identifié**: incohérence i18n sur la période d'expérience (`year`) qui n'était pas localisée côté langue.
- **Contrainte environnement**: audit npm registry bloqué (HTTP 403), empêchant un scan CVE complet en ligne.

## Vérifications automatisées
- `npm run lint` ✅
- `npm run type-check` ✅
- `npm run build` ✅
- `npm audit --audit-level moderate` ⚠️ (403 Forbidden depuis npm registry)
- `npm outdated` ⚠️ (403 Forbidden depuis npm registry)

## Constats détaillés

### 1) Internationalisation des périodes d'expérience
**Constat**
- Le champ de période était unique (`year`) dans la timeline. Le passage à `"2024-Présent"` impactait aussi l'affichage anglais.

**Correction appliquée**
- Ajout de champs localisés `year_fr` / `year_en` pour l'entrée freelance.
- Adaptation du mapping front pour choisir la valeur selon la langue avec fallback.
- Alignement de la validation Zod pour accepter `year`, `year_fr`, `year_en` et le type `experience`.

**Niveau de risque**: moyen (cohérence UX/i18n)

### 2) Validation des données timeline
**Constat**
- Le schéma Zod de timeline n'acceptait pas explicitement le type `experience` (présence de `work`), alors que les données utilisent `experience`.

**Correction appliquée**
- Extension du schéma pour accepter `education | experience | work`.

**Niveau de risque**: moyen (fallback silencieux possible si hook sécurisé activé)

### 3) Sécurité HTTP/CSP
**Constat**
- Configuration de headers de sécurité globalement bonne (CSP, HSTS, Permissions-Policy, X-Frame-Options).
- La CSP autorise `unsafe-inline` pour scripts/styles: acceptable pour compatibilité mais à réduire à terme (nonce/hash) pour durcissement.

**Niveau de risque**: faible à moyen

### 4) Performance
**Constat**
- Build Vite performant, bundles raisonnables pour un portfolio.
- Avertissement `browserslist` obsolète (base caniuse-lite à mettre à jour).

**Niveau de risque**: faible

### 5) Qualité / maintenabilité
**Constat**
- Bon socle: composants structurés, TS strict, lint strict.
- Quelques `any` persistent (notamment sur données JSON) et peuvent être progressivement typés davantage.

**Niveau de risque**: faible

## Recommandations priorisées
1. **P1**: maintenir la localisation des périodes via `year_fr/year_en` pour toutes les entrées si besoin d'affichage parfaitement bilingue.
2. **P1**: mettre à jour `caniuse-lite` (`npx update-browserslist-db@latest`) quand l'accès registry est disponible.
3. **P2**: migrer CSP vers nonce/hash (réduction de `unsafe-inline`).
4. **P2**: renforcer le typage des payloads JSON (réduction des `any`).
5. **P3**: ajouter un job CI dédié audit sécurité (avec réseau autorisé) + rapport dépendances.

## Conclusion
Le projet est globalement propre et exploitable en production pour un portfolio. Les corrections appliquées dans cette itération lèvent l'incohérence i18n constatée sur la timeline et améliorent la robustesse de la validation des données.
