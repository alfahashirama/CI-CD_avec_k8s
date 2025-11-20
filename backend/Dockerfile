FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Installer TOUTES les dépendances (retirer --production)
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "src/server.js"]