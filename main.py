from src_python.TerminalCLI import TerminalCLI
from src_python.json_handler import JsonHandler
from src_python.db_handler import DbHandler

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

json = JsonHandler()
#json.inserir_novo_lote(lote)

if __name__ == "__main__":
    cli = TerminalCLI()
    cli.executar()