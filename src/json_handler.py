from pathlib import Path
import json
import os

CURRENT_DIR = Path(__file__).resolve().parent
DATA_FILE_PATH = CURRENT_DIR.parent / "data" / "inventory.json"

class JsonHandler:
    def __init__(self):
        if not os.path.exists(DATA_FILE_PATH):
            with open(DATA_FILE_PATH, 'w') as file:
                json.dump([], file)
                print("Novo arquivo JSON criado.")
        else:
            print("Arquivo JSON já existe. Mantendo dados.")
    
    def obter_todos_produtos(self):
        with open(DATA_FILE_PATH, 'r') as json_file:
            data = json.load(json_file)
            print(json.dumps(data, indent=4))
        return data

    def deletar_lote_json(self):
        confirmacao = input("Voce realmente quer deletar todo lote? S / N ").upper()

        deletado = False

        if confirmacao == "S":
            frase_de_confirmacao = input("Digite a seguinte frase para deletar - 'DELETARTODOLOTE': ").upper()
            if frase_de_confirmacao == "DELETARTODOLOTE":
                with open(DATA_FILE_PATH, 'w') as file:
                    json.dump([], file)
                    print("Lote deletado com sucesso")
                    deletado = True

        if not deletado:
            print("Deleção de lote cancelada")

    def limpar_dados(self):
        with open(DATA_FILE_PATH, 'w') as file:
                    json.dump([], file)

    def inserir_novo_lote(self, lote):
        with open(DATA_FILE_PATH, 'r', encoding='utf-8') as file:
            dados = json.load(file)

        dados.extend(lote)

        with open(DATA_FILE_PATH, 'w', encoding='utf-8') as file:
            json.dump(dados, file, indent=4)

        