# 📱 PostFlow Mobile Frontend

Application mobile Flutter pour la plateforme PostFlow Manager avec design Material 3 moderne.

## 🎯 Aperçu

Cette application mobile offre une interface utilisateur moderne et intuitive pour gérer les posts avec :

- ✨ **Design Material 3** avec thème personnalisé
- 🎨 **Interface moderne** avec animations fluides
- 📱 **Navigation optimisée** pour mobile
- 🔄 **Synchronisation temps réel** avec l'API
- 🌐 **Support Web** via Flutter Web

## 🚀 Démarrage Rapide

### Prérequis
- Flutter SDK 3.24+
- Dart 3.8+
- Un éditeur (VS Code, Android Studio, IntelliJ)

### Installation

1. **Installer les dépendances**
```bash
flutter pub get
```

2. **Lancer l'application**
```bash
# Pour le web
flutter run -d web --web-port 3001

# Pour Android
flutter run -d android

# Pour iOS
flutter run -d ios
```

3. **Build pour production**
```bash
# Web
flutter build web --release

# Android APK
flutter build apk --release

# iOS
flutter build ios --release
```

## 🏗️ Architecture

```
lib/
├── main.dart                 # Point d'entrée avec thème Material 3
├── ui/                      # Interfaces utilisateur
│   ├── posts_page.dart      # Liste des posts avec stats
│   ├── add_post_page.dart   # Création de posts
│   ├── edit_post_page.dart  # Modification de posts
│   └── delete_confirm_page.dart # Confirmation suppression
└── data/                    # Couche de données
    ├── models/              # Modèles de données
    └── network/             # Client API REST
```

## 🎨 Design System

### Thème Material 3
- **Couleur principale** : Purple (#6750A4)
- **Cartes** : Coins arrondis 16px, élévation 2
- **Boutons** : Coins arrondis 12px, padding optimisé
- **Champs de saisie** : Style filled avec focus personnalisé

### Composants Principaux
- **Header avec gradient** : Information contextuelle
- **Cartes modernes** : Affichage des posts avec icônes
- **Formulaires structurés** : Validation et feedback utilisateur
- **États de chargement** : Indicateurs visuels appropriés

## 🔧 Configuration

### Variables d'environnement
Modifier l'URL de l'API dans `lib/ui/posts_page.dart` :
```dart
api = RestClient(dio, baseUrl: 'http://votre-api:5050/api/');
```

### Personnalisation du thème
Le thème est configuré dans `lib/main.dart` :
```dart
colorScheme: ColorScheme.fromSeed(
  seedColor: const Color(0xFF6750A4), // Changer cette couleur
  brightness: Brightness.light,
),
```

## 📦 Dépendances

### Production
- `flutter` : Framework principal
- `dio` : Client HTTP
- `retrofit` : Client REST typé
- `json_annotation` : Sérialisation JSON

### Développement
- `retrofit_generator` : Génération de code REST
- `build_runner` : Outils de build
- `json_serializable` : Génération sérialisation
- `flutter_lints` : Règles de qualité code

## 🐳 Docker

L'application peut être déployée via Docker pour le web :

```bash
# Build de l'image
docker build -t postflow-mobile .

# Lancement du container
docker run -p 3001:80 postflow-mobile
```

## 🧪 Tests

```bash
# Lancer tous les tests
flutter test

# Tests avec couverture
flutter test --coverage

# Tests d'intégration
flutter drive --target=test_driver/app.dart
```

## 📱 Plateformes Supportées

- ✅ **Web** (Chrome, Firefox, Safari, Edge)
- ✅ **Android** (API 21+)
- ✅ **iOS** (iOS 12+)
- ✅ **macOS** (macOS 10.14+)
- ✅ **Windows** (Windows 10+)
- ✅ **Linux** (Ubuntu 18.04+)

## 🔗 Liens Utiles

- [Documentation Flutter](https://docs.flutter.dev/)
- [Material Design 3](https://m3.material.io/)
- [Dart Language](https://dart.dev/)
- [API PostFlow](http://localhost:5050/docs)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

---

<div align="center">
  <p>Développé avec ❤️ et Flutter</p>
</div>
