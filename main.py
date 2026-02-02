from services.file_manager import FileManager
from services.db import Database
import json

lote = [{
        "nome": "cimento",
        "preco": 35.50,
        "quantidade": 100
    },
    {
        "nome": "argamassa",
        "preco": 0.80,
        "quantidade": 5000
    }]

db = Database()

db.inserir_lote_no_db()
