from src_python.json_handler import JsonHandler
from src_python.db_handler import DbHandler
import json
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
PATH_JSON = CURRENT_DIR.parent / "data" / "inventory.json"

class TerminalCLI:
    def __init__(self):
        self.json = JsonHandler()
        self.db = DbHandler()

        self.menu_actions = {
            "1": self.adicionar_produto_interface,
            "2": self.listar_produtos_interface,
            "3": self.limpar_json_interface,
            "4": self.migrar_lote_json_para_db_interface,
            "0": self.sair
        }

    def executar(self):
        while True:
            print("\n--- MENU ---")
            print("1. Adicionar novo produto ao json")
            print("2. Listar todos os produtos do json")
            print("3. Limpar json")
            print("4. Inserir lote json no db")
            print("0. Sair")
            
            opcao = input(">>> ")

            acao = self.menu_actions.get(opcao)

            if acao:
                acao()
            else:
                print("Opção Inválida!")

    def adicionar_produto_interface(self):
        nome_produto = input("Digite o nome do produto: ").strip().lower()
        
        while True:
            try:
                preco_input = input("Digite o valor unitario: R$ ").replace(',', '.')
                preco_produto = float(preco_input)
                break 
            except ValueError:
                print("Erro: Digite um número válido (ex: 10.50)")

        while True:
            try:
                quantidade = int(input("Digite a quantidade: "))
                break
            except ValueError:
                print("Erro: Digite um número inteiro.")
        
        lote = [
            {
                'nome': nome_produto,
                'preco': preco_produto,
                'quantidade': quantidade
            }
        ]

        try:
            self.json.inserir_novo_lote(lote)
            print("Produto salvo com sucesso!")
            input("Pressione Enter para voltar...") 
        except Exception as e:
            print(f"Erro ao salvar no arquivo: {e}")

    def listar_produtos_interface(self):
        self.json.obter_todos_produtos()
        input("Pressione Enter para voltar...") 

    def migrar_lote_json_para_db_interface(self):
        with open(PATH_JSON, 'r') as file:
            data = json.load(file)
            self.db.inserir_lote_json_para_db(data)
            self.limpar_json_interface()


    def limpar_json_interface(self):
        self.json.limpar_dados()
        print("Lote json deletado")
        input("Pressione Enter para voltar...") 

    def sair(self):
        print("Saindo...")
        exit()