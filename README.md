📋 API de Gerenciamento de Tarefas com Usuário e Senha
Esta é uma API RESTful desenvolvida em Node.js com Express, que permite o gerenciamento de tarefas pessoais. Cada usuário pode se cadastrar, fazer login e gerenciar suas próprias tarefas (CRUD de tarefas).

A API conta com sistema de autenticação baseado em usuário e senha, garantindo que cada usuário tenha acesso apenas às suas próprias informações.

🎯 Funcionalidades
👤 Usuários
✔️ Cadastro de usuário (nome, email e senha)

✔️ Login com email e senha

✔️ Autenticação via token (JWT ou sessão — [especificar aqui se desejar])

✔️ Validação de dados de entrada com Zod

✅ Tarefas
✔️ Criar uma nova tarefa

✔️ Listar todas as tarefas do usuário autenticado

✔️ Atualizar uma tarefa existente

✔️ Excluir uma tarefa

✔️ Cada tarefa está vinculada a um usuário, garantindo segurança dos dados

🔒 Segurança
🔐 As rotas de tarefas são protegidas.

🔐 Somente usuários autenticados podem acessar, criar, editar ou excluir suas próprias tarefas.

🔐 As senhas são armazenadas de forma segura (criptografadas — [informar se usa bcrypt ou outro método]).

🗂️ Estrutura do Projeto
bash
Copiar
Editar
NodeJs/
├── bancodedados/         # Configurações e conexão com o banco
├── controlador/          # Controladores: lógica das rotas (usuários e tarefas)
├── middleware/           # Middlewares (autenticação, erros, etc.)
├── rotas/                # Rotas da aplicação (usuários e tarefas)
├── zod/                  # Esquemas de validação de dados
├── index.js              # Arquivo principal, inicializa o servidor
├── package.json          # Dependências do projeto
└── README.md             # Documentação do projeto
🧰 Tecnologias e Ferramentas
Node.js

Express

Zod — Validação de dados

Banco de dados: (especifique, exemplo: SQLite, MongoDB, PostgreSQL)

JWT ou outro método para autenticação — (especifique se estiver usando)

bcrypt — Para criptografia de senhas (se estiver usando)

🚀 Como Executar
1. Clone o repositório:
git clone https://github.com/aeasoythiago/NodeJs.git

2. Acesse a pasta:
cd NodeJs

3. Instale as dependências:
npm install

4. Configure as variáveis de ambiente (exemplo: conexão do banco, secret do JWT):
DATABASE_URL=...
JWT_SECRET=...

5. Rode a aplicação:
npm start

6. A API estará disponível em:
http://localhost:3000

📬 Endpoints Principais
🔐 Autenticação de Usuário
POST /usuarios/cadastrar → Cria um novo usuário

POST /usuarios/login → Faz login e retorna token

📄 Tarefas (Requer Token)
POST /tarefas → Cria uma nova tarefa

GET /tarefas → Lista todas as tarefas do usuário autenticado

PUT /tarefas/:id → Atualiza uma tarefa específica

DELETE /tarefas/:id → Exclui uma tarefa específica

📌 Contribuição
Contribuições são muito bem-vindas! Sinta-se livre para abrir issues, propor melhorias ou enviar pull requests.
