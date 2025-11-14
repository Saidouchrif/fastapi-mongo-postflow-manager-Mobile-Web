#!/bin/bash

# Script de démarrage rapide pour PostFlow Manager avec Docker

echo "🚀 Démarrage de PostFlow Manager..."
echo ""

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord."
    exit 1
fi

# Construire et démarrer les conteneurs
echo "📦 Construction des images Docker..."
docker-compose build

echo ""
echo "🚀 Démarrage des services..."
docker-compose up -d

echo ""
echo "⏳ Attente du démarrage des services..."
sleep 10

echo ""
echo "✅ Services démarrés !"
echo ""
echo "🌐 Accès aux services :"
echo "   - Frontend Web:      http://localhost:3000"
echo "   - Frontend Mobile:   http://localhost:3001"
echo "   - API Backend:       http://localhost:5000"
echo "   - API Docs:          http://localhost:5000/docs"
echo "   - Mongo Express:     http://localhost:8081"
echo ""
echo "📊 Vérification du statut des services..."
docker-compose ps

echo ""
echo "📝 Pour voir les logs : docker-compose logs -f"
echo "🛑 Pour arrêter : docker-compose down"

