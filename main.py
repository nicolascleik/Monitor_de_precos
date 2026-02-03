from src_python.db_handler import DbHandler
from src_python.json_handler import JsonHandler

lote = [
    {
        'nome': "cimento",
        'preco': 44.00,
        'quantidade': 30
    },
    {
        'nome': "bloco",
        'preco': 0.90,
        'quantidade': 1000
    }
]

db = DbHandler()
db.inserir_lote(lote)