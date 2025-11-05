# Stage: Static web with Nginx
FROM nginx:alpine

# Copier le contenu HTML/JS/CSS dans le dossier nginx
COPY ./src /usr/share/nginx/html

# Port par défaut
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
