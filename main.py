from services.db_handler import DbHandler
from services.json_handler import JsonHandler

def processar_estoque():
    json_manager = JsonHandler()
    db_manager = DbHandler()

    lote_atual = json_manager.obter_todos_produtos()

    if not lote_atual:
        print("O arquivo JSON está vazio. Nada a processar.")
        return

    sucesso = db_manager.inserir_lote(lote_atual)

    if sucesso:
        json_manager.limpar_dados()
        print("Processo finalizado: Dados migrados e JSON limpo.")
    else:
        print("Erro no banco. O JSON NÃO foi apagado para segurança.")

    db_manager.fechar_conexao()

if __name__ == "__main__":
    processar_estoque()
