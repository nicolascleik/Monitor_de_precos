# Monitor de Preços - Sistema Híbrido (Python & Node.js)

> Um sistema full-stack para gestão e monitoramento de estoque, combinando a robustez do Python para operações de ETL (CLI) e a performance do Node.js para distribuição de dados via API REST.

![Badge Concluído](https://img.shields.io/badge/Status-Concluído-green)
![Python Coverage](https://img.shields.io/badge/Python_Cov-87%25-blue)
![Node Coverage](https://img.shields.io/badge/Node_Cov-83%25-success)
![Node](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python)

## Arquitetura do Projeto

O projeto adota uma **Arquitetura Híbrida** para aproveitar o melhor de cada linguagem:

1.  **Gestão de Dados (Python):**
    * Interface de Linha de Comando (CLI) para inserção rápida de dados.
    * Pipeline de ETL: Extrai dados de arquivos JSON temporários, transforma e carrega para um banco de dados SQLite persistente.
    * Foco em segurança de dados com transações SQL e Rollback.

2.  **API de Consumo (Node.js):**
    * Servidor Express performático para leitura dos dados.
    * Rotas otimizadas com filtros dinâmicos (Preço, Nome, Quantidade) e ordenação.
    * Middlewares de log para monitoramento de requisições.

## Estrutura de Pastas

```text
MONITOR_DE_PRECOS/
├── 📂 data/                 # Banco de Dados SQLite (storage.db) e JSONs
├── 📂 public/               # Front-end estático (HTML/CSS)
├── 📂 src_node/             # API Backend (Express)
│   ├── 📂 config/           # Configurações de DB
│   ├── 📂 controllers/      # Regras de negócio da API
│   ├── 📂 middlewares/      # Logs e tratamento de erros
│   ├── 📂 models/           # Queries SQL e acesso a dados
│   └── 📂 routes/           # Rotas da API
├── 📂 src_python/           # CLI e Scripts de Gestão
│   ├── db_handler.py        # Gerenciador de Banco de Dados
│   ├── json_handler.py      # Gerenciador de Arquivos
│   └── TerminalCLI.py       # Interface do Usuário
├── 📂 tests_node/           # Testes de Integração (Jest)
├── 📂 tests_python/         # Testes Unitários (Pytest)
├── index.js                 # Ponto de entrada da API Node
├── main.py                  # Ponto de entrada da CLI Python
└── package.json             # Dependências e Scripts Node

```

## Instalação e Configuração

### Pré-requisitos

* Node.js instalado.
* Python 3.10+ instalado.

### 1. Configurando a API (Node.js)

```bash
# Instale as dependências
npm install

```

### 2. Configurando a CLI (Python)

```bash
# Crie e ative o ambiente virtual
python -m venv .venv

# Windows
source .venv/Scripts/activate 
# Linux/Mac: source .venv/bin/activate

# Instale as dependências de teste
pip install pytest pytest-cov

```

---

## Como Usar

### Modo Gestão (Python CLI)

Utilize o terminal para gerenciar o estoque.

```bash
# Execute na raiz do projeto
python main.py

```

**Funcionalidades do Menu:**

1. **Adicionar Produto:** Insere dados em um lote temporário (JSON).
2. **Listar Lote:** Visualiza o que está pendente no JSON.
3. **Migrar para DB:** Transfere o lote do JSON para o Banco de Dados oficial (SQLite).
4. **Limpar Dados:** Ferramentas para zerar o JSON ou o Banco.

### Modo API (Node.js)

Inicie o servidor para disponibilizar os dados.

```bash
# Inicia o servidor na porta 3000
npm start

```

Acesse `http://localhost:3000` para ver a documentação visual ou consuma as rotas abaixo.

---

## Documentação da API

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/` | Retorna a página HTML principal. |
| `GET` | `/retornarTodosProdutos` | Lista todo o estoque do banco de dados. |
| `GET` | `/filtrarProdutosPorNome` | Busca produtos por nome (Parâmetro: `?nome=...`). |
| `GET` | `/filtrarProdutosPorPreco` | Busca produtos por preço exato ou maior (Parâmetro: `?preco=...`). |
| `GET` | `/filtrarProdutosPorQuantidade` | Busca por quantidade em estoque (Parâmetro: `?estoque=...`). |
| `GET` | `/filtrarProdutosPrecoCrescente` | Ordena produtos do mais barato ao mais caro. |
| `GET` | `/filtrarProdutosPrecoDescrecente` | Ordena produtos do mais caro ao mais barato. |
| `GET` | `/valorDoEstoque` | Retorna o KPI de valor total investido no estoque. |

---

## Testes e Qualidade (Hard Mode)

O projeto segue rigorosos padrões de qualidade com **alta cobertura de testes** em ambas as pontas.

### Testes de Integração (Node.js)

Validam se as rotas, controllers e models estão conversando corretamente com o banco de dados.

* **Ferramentas:** Jest, Supertest.
* **Cobertura:** ~83% (Controllers e Rotas validados).

```bash
# Rodar testes e gerar relatório
npm run test:coverage

```

### Testes Unitários e Mocks (Python)

Validam a lógica de ETL e garantem que o sistema lida com falhas de banco de dados (Rollback) sem quebrar.

* **Ferramentas:** Pytest, Pytest-Cov, Unittest Mock.
* **Cobertura:** ~95% (Core do sistema validado).
* **Destaques:** Uso de `monkeypatch` para simular inputs do usuário no terminal e `MagicMock` para simular falhas de SQL.

```bash
# Rodar testes Python
python -m pytest --cov=src_python tests_python/ --cov-report=html

```

## Stack Tecnológico

* **Linguagens:** Python 3, JavaScript (ES6 Modules).
* **Backend:** Node.js, Express.
* **Database:** SQLite3.
* **Testes:** Pytest, Pytest-Cov, Jest, Supertest.
* **Utilitários:** Dotenv, Pathlib.

---

Desenvolvido por **Nicolas Cleik de Andrade** como parte do desafio de estudos "Hard Mode" em Desenvolvimento de Software.

```

```