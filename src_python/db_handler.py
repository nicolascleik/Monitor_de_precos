import sqlite3
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
DEFAULT_DB_PATH = CURRENT_DIR.parent / "data" / "storage.db"

class DbHandler:
    def __init__(self, db_path=DEFAULT_DB_PATH):
        self.db_path = Path(db_path)
        self._conectar()
    
    def _conectar(self):
        if not self.db_path.parent.exists():
            self.db_path.parent.mkdir(parents=True, exist_ok=True)
        
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row 
        self.cur = self.conn.cursor()
        self._criar_tabela()
    
    def _criar_tabela(self):
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
        query = "INSERT INTO produtos (produto, preco, estoque) VALUES (:produto, :preco, :quantidade)"
        
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
        query_resetar_ids = "DELETE FROM sqlite_sequence WHERE name='produtos'"

        try:
            self.cur.execute(query_limpar_db)
            self.cur.execute(query_resetar_ids)
            self.conn.commit()
            print("Banco de dados zerado com sucesso!")
            return True
        except Exception as e:
            print(f"Erro ao excluir banco de dados: {e}")
            self.conn.rollback()
            return False

    def fechar_conexao(self):
        self.conn.close()