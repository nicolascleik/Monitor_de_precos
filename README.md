## Sistema de Gerenciamento de Estoque (JSON → SQL)

Um sistema robusto para migração de dados de estoque, demonstrando a evolução de scripts simples para uma arquitetura organizada em camadas.

### Estrutura do Projeto

O projeto foi refatorado para seguir boas práticas de mercado:

```text
PROJETO/
├── data/                  # Área isolada para persistência de dados
│   ├── inventory.json     # Buffer temporário (Staging)
│   └── storage.db         # Banco de Dados Oficial
├── src/                   # Lógica de Negócio
│   ├── db_handler.py      # Gerenciador de Banco de Dados
│   └── json_handler.py    # Gerenciador de Arquivos
└── main.py                # Orquestrador do Fluxo

```

### Como Funciona

O sistema resolve o problema de **integridade de dados** ao separar o processo em etapas:

1. **Entrada:** O usuário (ou sistema) preenche o arquivo `inventory.json` com novos produtos.
2. **Processamento:** O `main.py` instancia os controladores e inicia a migração.
3. **Segurança:**
* O banco de dados recebe o lote completo.
* Se o banco confirmar o salvamento (`Commit`), o JSON é limpo automaticamente.
* Se houver erro no banco (`Rollback`), o JSON é mantido intacto para nova tentativa.