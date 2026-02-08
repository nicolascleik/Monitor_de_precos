from pathlib import Path
import json

CURRENT_DIR = Path(__file__).resolve().parent
DATA_FILE_PATH = CURRENT_DIR.parent / "data" / "inventory.json"

class JsonHandler:
    def __init__(self, caminho_arquivo=DATA_FILE_PATH):
        self.file_path = Path(caminho_arquivo)
        self._inicializar_arquivo()
    
    def _inicializar_arquivo(self):
        if not self.file_path.parent.exists():
            self.file_path.parent.mkdir(parents=True, exist_ok=True)

        if not self.file_path.exists():
            with open(self.file_path, 'w', encoding='utf-8') as file:
                json.dump([], file)

    def obter_todos_produtos(self):
        with open(self.file_path, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)
        return data

    def limpar_dados(self):
        with open(self.file_path, 'w', encoding='utf-8') as file:
            json.dump([], file)

    def inserir_novo_lote(self, lote):
        with open(self.file_path, 'r', encoding='utf-8') as file:
            dados = json.load(file)

        dados.extend(lote)

        with open(self.file_path, 'w', encoding='utf-8') as file:
            json.dump(dados, file, indent=4)

        