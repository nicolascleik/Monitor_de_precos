from pathlib import Path
import json
import os

ROOT_DIR = Path(__file__).parent.parent
JSON_NAME = "json.json"
JSON_FILE = ROOT_DIR / ".." / "json" / JSON_NAME

class FileManager:
    def __init__(self):
        self.filename = "json.json"

        if not os.path.exists(self.filename):
            with open(self.filename, 'w') as file:
                json.dump([], file)
                print("Novo arquivo JSON criado.")
        else:
            print("Arquivo JSON já existe. Mantendo dados.")
    
    def lote_json(self):
        with open("json.json", 'r') as json_file:
            data = json.load(json_file)
            print(json.dumps(data, indent=4))
        return data

    def deletar_lote_json(self):
        confirmacao = input("Voce realmente quer deletar todo lote? S / N ").upper()

        deletado = False

        if confirmacao == "S":
            frase_de_confirmacao = input("Digite a seguinte frase para deletar - 'DELETARTODOLOTE': ").upper()
            if frase_de_confirmacao == "DELETARTODOLOTE":
                with open("json.json", 'w') as file:
                    json.dump([], file)
                    print("Lote deletado com sucesso")
                    deletado = True
        if deletado == True:
            print("Deleção de lote cancelada")

    def deletar_lote_admin (self):
        with open("json.json", 'w') as file:
                    json.dump([], file)

    def inserir_novo_lote(self, lote):
        with open('json.json', 'r', encoding='utf-8') as file:
            dados = json.load(file)

        dados.extend(lote)

        with open('json.json', 'w', encoding='utf-8') as file:
            json.dump(dados, file, indent=4)

        