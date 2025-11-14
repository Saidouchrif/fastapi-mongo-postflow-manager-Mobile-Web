@echo off
REM Script de démarrage rapide pour PostFlow Manager avec Docker (Windows)

echo 🚀 Démarrage de PostFlow Manager...
echo.

REM Vérifier si Docker est installé
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker n'est pas installé. Veuillez installer Docker d'abord.
    exit /b 1
)

REM Vérifier si Docker Compose est installé
where docker-compose >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord.
    exit /b 1
)

REM Construire et démarrer les conteneurs
echo 📦 Construction des images Docker...
docker-compose build

echo.
echo 🚀 Démarrage des services...
docker-compose up -d

echo.
echo ⏳ Attente du démarrage des services...
timeout /t 10 /nobreak >nul

echo.
echo ✅ Services démarrés !
echo.
echo 🌐 Accès aux services :
echo    - Frontend Web:      http://localhost:3000
echo    - Frontend Mobile:   http://localhost:3001
echo    - API Backend:       http://localhost:5000
echo    - API Docs:          http://localhost:5000/docs
echo    - Mongo Express:     http://localhost:8081
echo.
echo 📊 Vérification du statut des services...
docker-compose ps

echo.
echo 📝 Pour voir les logs : docker-compose logs -f
echo 🛑 Pour arrêter : docker-compose down

pause

