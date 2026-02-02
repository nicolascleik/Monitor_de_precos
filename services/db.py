import sqlite3
from pathlib import Path
from services.file_manager import FileManager

ROOT_DIR = Path(__file__).parent.parent
DB_NAME = "database.db"
DB_FILE = ROOT_DIR / ".." / "data" / DB_NAME

class Database:
    def __init__(self):
        print("Iniciando conexão...")

        with sqlite3.connect(DB_NAME) as conn:
            cur = conn.cursor()
            cur.execute("""
                CREATE TABLE IF NOT EXISTS produtos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    produto TEXT NOT NULL,
                    preco REAL NOT NULL,
                    estoque INTEGER DEFAULT 0
                )
            """)
            conn.commit()
            print("Tabela verificada/criada com sucesso.")

    def inserir_lote_no_db (self):
        inserir_query = "INSERT INTO produtos (produto, preco, estoque) VALUES (?, ?, ?)"
        
        json = FileManager()
        lote = json.lote_json()
        with sqlite3.connect(DB_NAME) as conn:
            cur = conn.cursor()
            for produto in lote:
                produto_gravado = (produto['nome'], produto['preco'], produto['quantidade'])
                cur.execute(inserir_query, produto_gravado)
            json.deletar_lote_admin()