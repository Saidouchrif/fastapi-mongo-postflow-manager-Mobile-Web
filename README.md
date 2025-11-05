<div align="center">
  <img src="Frontend-Web/src/images/postflow.png" alt="PostFlow Logo" width="200" height="200" />
  
  # 🚀 PostFlow Manager
  
  **Une plateforme complète et moderne pour gérer, publier et consulter des posts**
  
  *Architecture microservices robuste avec interfaces web et mobile*
</div>

<div align="center">
  
![PostFlow Architecture](https://img.shields.io/badge/Architecture-Microservices-blue)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)
![Flutter](https://img.shields.io/badge/Mobile-Flutter-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Docker](https://img.shields.io/badge/Deployment-Docker-blue)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)
[![API](https://img.shields.io/badge/API-REST-green)](http://localhost:5050/docs)

</div>

## 📋 Table des Matières

- [🎯 Aperçu du Projet](#-aperçu-du-projet)
- [🏗️ Architecture du Système](#️-architecture-du-système)
- [🛠️ Technologies Utilisées](#️-technologies-utilisées)
- [📱 Interfaces Utilisateur](#-interfaces-utilisateur)
- [🚀 Démarrage Rapide](#-démarrage-rapide)
- [📊 Diagrammes d'Architecture](#-diagrammes-darchitecture)
- [🔧 Configuration](#-configuration)
- [📖 Documentation API](#-documentation-api)
- [🧪 Tests](#-tests)
- [🤝 Contribution](#-contribution)

## 🎯 Aperçu du Projet

PostFlow est une application de gestion de posts (CRUD) avec une architecture moderne composée de :

- **Backend API** : FastAPI avec MongoDB pour la persistance des données
- **Frontend Web** : Interface web responsive avec Tailwind CSS
- **Application Mobile** : Application Flutter multiplateforme
- **Base de Données** : MongoDB avec réplication et monitoring
- **Déploiement** : Containerisation Docker avec orchestration

### ✨ Fonctionnalités Principales

- ✅ **CRUD complet** : Créer, lire, modifier, supprimer des posts
- 🎨 **Interface moderne** : Design Material 3 avec animations fluides
- 📱 **Multi-plateforme** : Web, iOS, Android
- 🔄 **Temps réel** : Synchronisation automatique des données
- 🛡️ **Sécurisé** : Validation des données et protection CORS
- 🚀 **Performant** : API optimisée avec mise en cache
- 📊 **Monitoring** : Interface d'administration MongoDB

## 🏗️ Architecture du Système

```mermaid
graph TB
    subgraph "Frontend Layer"
        FW[Frontend Web<br/>Tailwind CSS]
        FM[Frontend Mobile<br/>Flutter]
    end
    
    subgraph "API Gateway"
        API[FastAPI Backend<br/>Port 5050]
    end
    
    subgraph "Database Layer"
        DB[(MongoDB<br/>Port 27017)]
        ME[Mongo Express<br/>Port 8081]
    end
    
    subgraph "Infrastructure"
        NGINX[Nginx<br/>Load Balancer]
        DOCKER[Docker Containers]
    end
    
    FW -->|HTTP/REST| API
    FM -->|HTTP/REST| API
    API -->|CRUD Operations| DB
    ME -->|Admin Interface| DB
    
    NGINX --> FW
    NGINX --> FM
    
    DOCKER -.-> API
    DOCKER -.-> DB
    DOCKER -.-> FW
    DOCKER -.-> FM
    DOCKER -.-> ME
```

### 🔄 Flux de Données

```mermaid
sequenceDiagram
    participant U as Utilisateur
    participant F as Frontend
    participant A as API FastAPI
    participant D as MongoDB
    
    U->>F: Interaction utilisateur
    F->>A: Requête HTTP/REST
    A->>A: Validation des données
    A->>D: Opération CRUD
    D->>A: Réponse base de données
    A->>F: Réponse JSON
    F->>U: Mise à jour interface
```

## 🛠️ Technologies Utilisées

### Backend
- **FastAPI** 0.104+ - Framework web moderne et rapide
- **MongoDB** 7.0 - Base de données NoSQL
- **Pydantic** - Validation et sérialisation des données
- **Motor** - Driver MongoDB asynchrone
- **Uvicorn** - Serveur ASGI haute performance

### Frontend Web
- **HTML5/CSS3** - Structure et style
- **Tailwind CSS** - Framework CSS utilitaire
- **JavaScript ES6+** - Logique côté client
- **Fetch API** - Communication avec l'API

### Frontend Mobile
- **Flutter** 3.24+ - Framework multiplateforme
- **Dart** 3.8+ - Langage de programmation
- **Material Design 3** - Système de design
- **HTTP/Dio** - Client HTTP pour API
- **Retrofit** - Client REST typé

### Infrastructure
- **Docker** & **Docker Compose** - Containerisation
- **Nginx** - Serveur web et proxy inverse
- **Mongo Express** - Interface d'administration MongoDB

## 📱 Interfaces Utilisateur

### 🖥️ Interface Web
- Design responsive adaptatif
- Navigation intuitive
- Animations CSS fluides
- Thème sombre/clair

### 📱 Application Mobile
- Design Material 3
- Navigation par gestes
- Animations natives
- Support multiplateforme

## 🚀 Démarrage Rapide

### 📋 Prérequis
- **Docker** & **Docker Compose** (version 20.10+)
- **Git** (pour cloner le repository)
- **Ports disponibles** : 3000, 3001, 5050, 8081, 27017

### ⚡ Installation Rapide (Recommandée)

1. **Cloner le repository**
```bash
git clone https://github.com/Saidouchrif/fastapi-mongo-postflow-manager-Mobile-Web.git
cd fastapi-mongo-postflow-manager-Mobile-Web
```

2. **Configuration des variables d'environnement (optionnel)**
```bash
# Copier le fichier .env et modifier si nécessaire
cp .env .env.local
# Éditer .env.local pour personnaliser les ports et configurations
```

3. **Lancer l'application complète**
```bash
# Démarrer tous les services
docker-compose up -d

# Vérifier le statut des services
docker-compose ps

# Voir les logs en temps réel
docker-compose logs -f
```

4. **Accéder aux services**

| Service | URL | Description |
|---------|-----|-------------|
| 🌐 **Frontend Web** | http://localhost:3000 | Interface web Tailwind CSS |
| 📱 **Frontend Mobile** | http://localhost:3001 | Application Flutter (Web) |
| 🔧 **API Backend** | http://localhost:5050 | API FastAPI |
| 📊 **MongoDB Admin** | http://localhost:8081 | Interface d'administration MongoDB |
| 📖 **API Documentation** | http://localhost:5050/docs | Documentation Swagger |
| 📚 **API ReDoc** | http://localhost:5050/redoc | Documentation ReDoc |

### 🛠️ Développement Local

#### Backend API (FastAPI)
```bash
cd Backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 5050
```

#### Frontend Web
```bash
cd Frontend-Web
# Ouvrir index.html dans un serveur local
python -m http.server 3000  # ou utiliser Live Server
```

#### Frontend Mobile (Flutter)
```bash
cd frontend_mobile
flutter pub get
flutter run -d web --web-port 3001
```

### 🔧 Commandes Utiles

```bash
# Arrêter tous les services
docker-compose down

# Redémarrer un service spécifique
docker-compose restart api

# Voir les logs d'un service
docker-compose logs -f api

# Reconstruire les images
docker-compose build --no-cache

# Nettoyer les volumes (⚠️ supprime les données)
docker-compose down -v

# Mise à jour des images
docker-compose pull
docker-compose up -d
```

## 📊 Diagrammes d'Architecture

### 🏛️ Architecture Microservices

```mermaid
graph LR
    subgraph "Client Layer"
        W[Web Browser]
        M[Mobile App]
    end
    
    subgraph "Load Balancer"
        LB[Nginx]
    end
    
    subgraph "Application Layer"
        API[FastAPI Service]
    end
    
    subgraph "Data Layer"
        DB[(MongoDB)]
        CACHE[(Redis Cache)]
    end
    
    subgraph "Monitoring"
        LOGS[Logs]
        METRICS[Metrics]
    end
    
    W --> LB
    M --> LB
    LB --> API
    API --> DB
    API --> CACHE
    API --> LOGS
    API --> METRICS
```

### 🗄️ Modèle de Données

```mermaid
erDiagram
    POST {
        ObjectId _id PK
        string title
        string content
        datetime created_at
        datetime updated_at
        string author_id
        array tags
        int views_count
        boolean is_published
    }
    
    USER {
        ObjectId _id PK
        string username
        string email
        string password_hash
        datetime created_at
        datetime last_login
        boolean is_active
    }
    
    COMMENT {
        ObjectId _id PK
        ObjectId post_id FK
        ObjectId user_id FK
        string content
        datetime created_at
        ObjectId parent_id FK
    }
    
    POST ||--o{ COMMENT : has
    USER ||--o{ POST : creates
    USER ||--o{ COMMENT : writes
    COMMENT ||--o{ COMMENT : replies_to
```

### 🔄 Cycle de Vie d'une Requête

```mermaid
flowchart TD
    A[Requête Client] --> B{Type de Requête}
    B -->|GET| C[Lecture Cache]
    B -->|POST/PUT/DELETE| D[Validation Données]
    
    C --> E{Cache Hit?}
    E -->|Oui| F[Retour Cache]
    E -->|Non| G[Requête Database]
    
    D --> H[Autorisation]
    H --> I[Opération Database]
    
    G --> J[Mise à jour Cache]
    I --> K[Invalidation Cache]
    
    F --> L[Réponse Client]
    J --> L
    K --> L
    
    L --> M[Log & Metrics]
```

## 🔧 Configuration

### Variables d'Environnement

#### Backend (.env)
```env
# Database
MONGO_URL=mongodb://root:example@localhost:27017/?authSource=admin
MONGO_DB=postflow_db

# API Configuration
API_HOST=0.0.0.0
API_PORT=5050
DEBUG=false

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:3001"]
```

#### Docker Compose (.env)
```env
# Ports
API_PORT=5050
WEB_PORT=3000
MOBILE_PORT=3001
MONGO_PORT=27017
MONGO_EXPRESS_PORT=8081

# MongoDB
MONGO_ROOT_USERNAME=root
MONGO_ROOT_PASSWORD=example
MONGO_DB=postflow_db
```

### Configuration Nginx

```nginx
upstream backend {
    server api:5050;
}

upstream frontend_web {
    server frontend-web:80;
}

upstream frontend_mobile {
    server frontend-mobile:80;
}

server {
    listen 80;
    server_name localhost;

    location /api/ {
        proxy_pass http://backend/;
    }
    
    location /web/ {
        proxy_pass http://frontend_web/;
    }
    
    location /mobile/ {
        proxy_pass http://frontend_mobile/;
    }
}
```

## 📖 Documentation API

### Endpoints Principaux

#### Posts
- `GET /api/posts` - Liste tous les posts
- `POST /api/posts` - Crée un nouveau post
- `GET /api/posts/{id}` - Récupère un post spécifique
- `PUT /api/posts/{id}` - Met à jour un post
- `DELETE /api/posts/{id}` - Supprime un post

#### Modèle Post
```json
{
  "_id": "ObjectId",
  "title": "string",
  "content": "string",
  "created_at": "datetime",
  "updated_at": "datetime",
  "author_id": "string",
  "tags": ["string"],
  "views_count": 0,
  "is_published": true
}
```

### Documentation Interactive
- **Swagger UI** : http://localhost:5050/docs
- **ReDoc** : http://localhost:5050/redoc

## 🧪 Tests

### Backend Tests
```bash
cd Backend
pytest tests/ -v --cov=app
```

### Frontend Tests
```bash
cd frontend_mobile
flutter test
```

### Tests d'Intégration
```bash
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 🚀 Déploiement en Production

### 1. Configuration Production
```bash
# Copier les fichiers de configuration
cp .env.example .env.prod
cp docker-compose.yml docker-compose.prod.yml
```

### 2. Build et Deploy
```bash
# Build des images
docker-compose -f docker-compose.prod.yml build

# Déploiement
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Monitoring
```bash
# Vérifier les logs
docker-compose logs -f

# Monitoring des containers
docker stats
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de Code
- **Backend** : PEP 8, type hints, docstrings
- **Frontend** : ESLint, Prettier
- **Mobile** : Dart style guide, effective Dart

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Backend** : FastAPI + MongoDB
- **Frontend Web** : HTML/CSS/JS + Tailwind
- **Frontend Mobile** : Flutter + Dart
- **DevOps** : Docker + Nginx

---

<div align="center">
  <p>Fait avec ❤️ par Said Ouchrif</p>
  <p>
    <a href="#-table-des-matières">⬆️ Retour en haut</a>
  </p>
</div>
