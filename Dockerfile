# Imagem base
FROM node:alpine

# Diretório de trabalho
WORKDIR /usr/src/mario_kart

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Expõe a porta da aplicação (configurada via .env e passada pelo docker-compose)
EXPOSE 3000

# Comando padrão
CMD ["npm", "start"]
