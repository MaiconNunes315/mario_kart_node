# 🚀 Aplicação Node.js + JSON Server com Docker

Este projeto demonstra como rodar **uma aplicação Node.js** juntamente com o **JSON Server** usando **Docker** e **Docker Compose**, com configurações dinâmicas via `.env`.

---

## 📂 Estrutura do Projeto

.
├─ .env
├─ Dockerfile
├─ docker-compose.yml
├─ package.json
├─ server.js
└─ db.json

---

## ⚙️ Configuração do `.env`

Defina as variáveis de ambiente da sua aplicação no arquivo `.env`:

```env
# Informações da aplicação
APP_NAME=meu-app-node
APP_VERSION=1.0.0

# Configurações do Node.js
NODE_ENV=development
APP_PORT=3000

# Configurações do JSON Server
JSON_SERVER_PORT=4000
JSON_SERVER_HOST=0.0.0.0
```

🛠️ Passo a Passo para rodar

```
1. Instale o Docker e Docker Compose
```

Docker

Docker Compose

2. Monte os containers
   docker-compose up --build

3. Acesse a aplicação

Aplicação Node.js: http://localhost:3000

JSON Server: http://localhost:4000

🧰 Comandos úteis
Subir os containers em modo detached (segundo plano)
docker-compose up -d --build

Parar todos os containers
docker-compose down

Ver logs em tempo real
docker-compose logs -f

Recriar containers do zero (limpando cache)
docker-compose build --no-cache

📡 Endpoints de teste

Aplicação Node.js:

GET http://localhost:3000/

JSON Server (fake API):

GET http://localhost:4000/posts
POST http://localhost:4000/posts

(os endpoints dependem da estrutura do seu db.json)

🧩 Tecnologias usadas

Node.js 20 (Alpine)

Express.js (API principal)

JSON Server (mock de API)

Docker & Docker Compose (orquestração de containers)

📜 Licença

Este projeto é apenas um exemplo educativo e pode ser utilizado livremente.
Feito com ❤️ e ☕ para quem ama Node + Docker!

---

Quer que eu faça \*\*uma versão ainda mais profissional com badges (shields.io), emojis de status, e links

```

```
