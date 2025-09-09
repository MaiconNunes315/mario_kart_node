# Mario Kart Node (API Fake com JSON-Server)

Este projeto utiliza o **[json-server](https://github.com/typicode/json-server)** para simular uma API REST a partir de um arquivo JSON.  
É útil para prototipar, testar e desenvolver aplicações sem precisar de um backend completo.

---

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/mario_kart_node.git
   cd mario_kart_node
   ```

bash
Copiar código
npm install
Instale o json-server (global ou local)

Global (recomendado se for usar em vários projetos):

bash
Copiar código
npm install -g json-server
Local (dentro do projeto):

bash
Copiar código
npm install json-server --save-dev
▶️ Uso

### Execute o json-server:

npm run json-server_run

### Execute o servidor:

npm run start

📚 Exemplos de Rotas
GET /players → Lista todos os jogadores

GET /players/1 → Retorna um jogador específico

POST /players → Cria um novo jogador

PUT /players/1 → Atualiza todos os dados do jogador com ID 1

PATCH /players/1 → Atualiza parcialmente o jogador com ID 1

DELETE /players/1 → Remove o jogador com ID 1

Assim, basta rodar:

npm start

🏁 Tecnologias
Node.js
JSON-Server
