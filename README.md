📌 Sobre o Projeto

System_economy é um sistema de gestão financeira com foco em simplicidade, visual limpo e indicadores econômicos úteis.

Este repositório contém apenas o frontend, desenvolvido em React + Tailwind CSS, responsável por consumir a API do backend escrita em Python (FastAPI, Django ou Flask — ajusta conforme usas).

O objetivo é permitir que o usuário:

Registre suas receitas e despesas

Visualize gráficos e relatórios

Controle suas finanças pessoais de forma simples

Tenha um painel moderno, rápido e responsivo

✨ Funcionalidades (atuais e planejadas)

📁 CRUD de transações (receitas e despesas)

🗃️ Categorias e tags

🔍 Filtro por data / categoria

📊 Dashboard com gráficos (entradas x saídas)

🔐 Login e autenticação via backend Python

⚡ Interface moderna feita com Tailwind

📱 Layout totalmente responsivo

🛠️ Tecnologias Utilizadas
Frontend

React (Create React App)

Tailwind CSS

Axios (consumir API Python)

React Router (se tiver navegação)

Recharts / Chart.js (gráficos do dashboard)

Backend (consumido pelo frontend)

Python

FastAPI / Django / Flask (confirma qual estás usando para personalizar)

Banco de dados: PostgreSQL / MySQL / SQLite

Autenticação JWT (recomendado)

🚀 Como Rodar o Frontend
1️⃣ Clonar o repositório
git clone https://github.com/Vitor2209/System_economy.git
cd System_economy/frontend

2️⃣ Instalar dependências
npm install
# ou
yarn install

3️⃣ Rodar o projeto
npm start
# ou
yarn start


Acesse no navegador:
👉 http://localhost:3000

🔧 Configuração da API (Python Backend)

No arquivo onde faz a conexão com a API (ex: services/api.js):

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api", // porta do backend Python
});


Ajuste conforme tua API real (FastAPI normalmente roda em 8000).

🗂 Estrutura do projeto
frontend/
├── public/
├── src/
│   ├── components/        # Componentes React
│   ├── pages/             # Telas principais
│   ├── services/          # Conexão com API Python
│   ├── hooks/             # Hooks personalizados
│   ├── styles/            # Configurações Tailwind
│   ├── App.js
│   └── index.js
├── tailwind.config.js
└── package.json

📊 Dashboard (exemplo das futuras seções)

Total de receitas / despesas

Gráfico comparativo mensal

Lista de transações filtrável

Indicadores: saldo atual, média por categoria etc.

📈 Roadmap

 Criar layout completo com Tailwind

 Conectar API Python real

 Criar sistema de login

 Criar CRUD de transações

 Adicionar gráficos (Recharts ou Chart.js)

 Melhorar acessibilidade e SEO

 Deploy em Vercel (frontend) e Railway / Render (backend)

🤝 Como Contribuir
git checkout -b feat/nova-feature
git commit -m "Minha nova funcionalidade"
git push origin feat/nova-feature


Depois abre um Pull Request.

👤 Autor

Vitor Melo
GitHub: https://github.com/Vitor2209

📄 Licença
MIT License © 2025 Vitor Melo