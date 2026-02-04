import sqlite3
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
DB_PATH = CURRENT_DIR.parent / "data" / "storage.db"

class DbHandler:
    def __init__(self):
        print("Iniciando conexão com Banco de Dados...")
        DB_PATH.parent.mkdir(parents=True, exist_ok=True)
        
        self.conn = sqlite3.connect(DB_PATH)
        self.cur = self.conn.cursor()

        self.cur.execute("""
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                produto TEXT NOT NULL,
                preco REAL NOT NULL,
                estoque INTEGER DEFAULT 0
            )
        """)
        self.conn.commit()

    def inserir_lote_json_para_db (self, db_file):
        query = "INSERT INTO produtos (produto, preco, estoque) VALUES (:nome, :preco, :quantidade)"
        
        try:
            self.cur.executemany(query, db_file)
            self.conn.commit()
            print(f"{len(db_file)} produtos inseridos com sucesso!")
            return True
        except Exception as e:
            print(f"Erro ao inserir no banco: {e}")
            self.conn.rollback()
            return False

    def limpar_db (self):
        query_limpar_db = "DELETE FROM produtos"
        qyert_resetar_ids = "DELETE FROM sqlite_sequence WHERE name='produtos'"

        try:
            self.cur.execute(query_limpar_db)
            self.cur.execute(qyert_resetar_ids)
            self.conn.commit()
            print("Banco de dados zerado com sucesso!")
            return True
        except Exception as e:
            print(f"Erro ao excluir banco de dados: {e}")
            self.conn.rollback()
            return False

    def fechar_conexao(self):
        self.conn.close()