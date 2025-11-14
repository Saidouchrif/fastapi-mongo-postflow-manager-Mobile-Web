# 🐳 Guide Docker - PostFlow Manager

Ce guide explique comment utiliser Docker pour déployer l'ensemble du projet PostFlow Manager.

## 📋 Prérequis

- Docker Engine 20.10+
- Docker Compose 2.0+
- Au moins 2GB de RAM disponible
- Ports disponibles : 3000, 3001, 5000, 27017, 8081

## 🚀 Démarrage Rapide

### 1. Cloner le projet (si pas déjà fait)
```bash
git clone <votre-repo>
cd fastapi-mongo-postflow-manager-Mobile-Web-
```

### 2. Lancer tous les services
```bash
docker-compose up -d
```

### 3. Vérifier le statut
```bash
docker-compose ps
```

### 4. Voir les logs
```bash
# Tous les services
docker-compose logs -f

# Un service spécifique
docker-compose logs -f api
docker-compose logs -f mongodb
```

## 🌐 Accès aux Services

Une fois les conteneurs démarrés, vous pouvez accéder aux services suivants :

| Service | URL | Description |
|---------|-----|-------------|
| 🌐 **Frontend Web** | http://localhost:3000 | Interface web HTML/CSS/JS |
| 📱 **Frontend Mobile** | http://localhost:3001 | Application Flutter Web |
| 🔧 **API Backend** | http://localhost:5000 | API FastAPI |
| 📖 **API Docs (Swagger)** | http://localhost:5000/docs | Documentation interactive |
| 📚 **API Docs (ReDoc)** | http://localhost:5000/redoc | Documentation alternative |
| 🗄️ **Mongo Express** | http://localhost:8081 | Interface d'administration MongoDB |
| 🍃 **MongoDB** | localhost:27017 | Base de données (connexion directe) |

### Identifiants Mongo Express
- **Username**: `admin`
- **Password**: `admin`

### Identifiants MongoDB
- **Username**: `root`
- **Password**: `example`
- **Database**: `postflow_db`

## 🛠️ Commandes Utiles

### Démarrer les services
```bash
docker-compose up -d
```

### Arrêter les services
```bash
docker-compose down
```

### Redémarrer un service spécifique
```bash
docker-compose restart api
docker-compose restart frontend-web
docker-compose restart frontend-mobile
```

### Reconstruire les images
```bash
# Reconstruire toutes les images
docker-compose build

# Reconstruire sans cache
docker-compose build --no-cache

# Reconstruire un service spécifique
docker-compose build api
```

### Voir les logs
```bash
# Logs en temps réel
docker-compose logs -f

# Logs d'un service
docker-compose logs -f api
docker-compose logs -f mongodb

# Dernières 100 lignes
docker-compose logs --tail=100 api
```

### Accéder au shell d'un conteneur
```bash
# Backend
docker-compose exec api bash

# MongoDB
docker-compose exec mongodb mongosh -u root -p example

# Frontend Web
docker-compose exec frontend-web sh
```

### Nettoyer
```bash
# Arrêter et supprimer les conteneurs
docker-compose down

# Supprimer aussi les volumes (⚠️ supprime les données)
docker-compose down -v

# Supprimer les images
docker-compose down --rmi all
```

## 📦 Architecture des Services

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                        │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Frontend Web │  │Frontend Mobile│  │     API      │ │
│  │   (Nginx)    │  │   (Nginx)     │  │  (FastAPI)   │ │
│  │   Port 3000  │  │   Port 3001   │  │   Port 5000  │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
│         │                  │                  │         │
│         └──────────────────┼──────────────────┘         │
│                            │                            │
│                  ┌─────────▼─────────┐                  │
│                  │     MongoDB       │                  │
│                  │    Port 27017     │                  │
│                  └─────────┬─────────┘                  │
│                            │                            │
│                  ┌─────────▼─────────┐                  │
│                  │  Mongo Express    │                  │
│                  │    Port 8081      │                  │
│                  └───────────────────┘                  │
└─────────────────────────────────────────────────────────┘
```

## 🔧 Configuration

### Variables d'Environnement

Les variables d'environnement sont définies dans `docker-compose.yml`. Pour les modifier, vous pouvez :

1. **Modifier directement `docker-compose.yml`**
2. **Créer un fichier `.env`** à la racine du projet :
```env
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=example
MONGO_INITDB_DATABASE=postflow_db
API_PORT=5000
FRONTEND_WEB_PORT=3000
FRONTEND_MOBILE_PORT=3001
MONGO_EXPRESS_PORT=8081
```

### Modifier les Ports

Pour changer les ports exposés, modifiez la section `ports` dans `docker-compose.yml` :

```yaml
services:
  api:
    ports:
      - "5000:5000"  # Format: "HOST:CONTAINER"
```

## 🐛 Dépannage

### Les conteneurs ne démarrent pas
```bash
# Vérifier les logs
docker-compose logs

# Vérifier les ports disponibles
netstat -an | grep LISTEN  # Linux/Mac
netstat -an | findstr LISTEN  # Windows
```

### MongoDB ne démarre pas
```bash
# Vérifier les logs MongoDB
docker-compose logs mongodb

# Supprimer les volumes et redémarrer
docker-compose down -v
docker-compose up -d
```

### L'API ne peut pas se connecter à MongoDB
- Vérifiez que MongoDB est démarré : `docker-compose ps`
- Vérifiez les variables d'environnement dans `docker-compose.yml`
- Vérifiez les logs : `docker-compose logs api`

### Les frontends ne peuvent pas accéder à l'API
- Vérifiez que l'API est accessible : http://localhost:5000
- Vérifiez les logs de l'API : `docker-compose logs api`
- Vérifiez la configuration CORS dans `Backend/app/main.py`

### Reconstruire après modification du code
```bash
# Reconstruire et redémarrer
docker-compose up -d --build

# Ou pour un service spécifique
docker-compose up -d --build api
```

## 📝 Notes Importantes

1. **Données persistantes** : Les données MongoDB sont stockées dans un volume Docker nommé `mongodb_data`. Pour supprimer toutes les données, utilisez `docker-compose down -v`.

2. **Hot Reload** : Le backend FastAPI est configuré avec `--reload` pour le développement. Les modifications du code Python seront automatiquement rechargées.

3. **Flutter Web** : Le frontend mobile est compilé lors du build Docker. Pour voir les modifications, vous devez reconstruire l'image.

4. **Réseau Docker** : Tous les services communiquent via le réseau Docker `postflow-network`. Les services peuvent s'appeler par leur nom (ex: `api`, `mongodb`).

## 🚀 Production

Pour la production, considérez :

1. **Sécurité** : Changez tous les mots de passe par défaut
2. **HTTPS** : Configurez un reverse proxy (Nginx/Traefik) avec SSL
3. **Monitoring** : Ajoutez des outils de monitoring (Prometheus, Grafana)
4. **Backup** : Configurez des sauvegardes automatiques pour MongoDB
5. **Scaling** : Utilisez Docker Swarm ou Kubernetes pour la mise à l'échelle

## 📚 Ressources

- [Documentation Docker](https://docs.docker.com/)
- [Documentation Docker Compose](https://docs.docker.com/compose/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Flutter Web](https://docs.flutter.dev/platform-integration/web)
- [MongoDB Docker](https://hub.docker.com/_/mongo)
- [Mongo Express](https://hub.docker.com/_/mongo-express)

