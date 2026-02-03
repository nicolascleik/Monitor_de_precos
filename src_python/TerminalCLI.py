from src_python.json_handler import JsonHandler

class TerminalCLI:
    def __init__(self):
        self.json = JsonHandler()

        self.menu_actions = {
            "1": self.adicionar_produto_interface,
            "2": self.listar_produtos_interface,
            "3": self.limpar_banco_interface,
            "0": self.sair
        }

    def executar(self):
        while True:
            print("\n--- MENU ---")
            print("1. Adicionar novo produto ao json")
            print("2. Listar todos os produtos do json")
            print("3. Limpar json")
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

    def limpar_banco_interface(self):
        self.json.limpar_dados()
        print("Lote json deletado")
        input("Pressione Enter para voltar...") 

    def sair(self):
        print("Saindo...")
        exit()