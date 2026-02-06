import pytest
import json
from src_python.json_handler import JsonHandler

def test_inserir_lote(tmp_path):
    arquivo_teste = tmp_path / "estoque_teste.json"
    
    arquivo_teste.write_text("[]", encoding="utf-8")
    
    handler = JsonHandler(caminho_arquivo=arquivo_teste)
    
    lote_teste = [
        {
            'produto': 'Cimento Teste',
            'preco': 1,
            'quantidade': 1
        }
    ]

    handler.inserir_novo_lote(lote_teste)

    conteudo = json.loads(arquivo_teste.read_text(encoding='utf-8'))
    
    assert len(conteudo) == 1
    assert conteudo[0]['produto'] == "Cimento Teste"

def test_obter_todos_produtos(tmp_path):
    arquivo_teste = tmp_path / "teste_leitura.json"
    
    lote_teste = [{"produto": "Tijolo Teste", "preco": 1, "quantidade": 1}]
    arquivo_teste.write_text(json.dumps(lote_teste), encoding='utf-8')
    
    handler = JsonHandler(arquivo_teste)
    resultado = handler.obter_todos_produtos()
    
    assert len(resultado) == 1
    assert resultado[0]['produto'] == "Tijolo Teste"

def test_limpar_dados_deve_esvaziar_arquivo(tmp_path):
    arquivo_teste = tmp_path / "arquivo_sujo.json"
    
    dados_sujos = [
        {"produto": "Itens defeituosos", "preco": 1, "quantidade": 1},
        {"produto": "Lixo eletronico", "preco": 1, "quantidade": 1}
    ]
    arquivo_teste.write_text(json.dumps(dados_sujos), encoding='utf-8')
    
    handler = JsonHandler(caminho_arquivo=arquivo_teste)

    assert len(handler.obter_todos_produtos()) == 2

    handler.limpar_dados()

    conteudo_pos_limpeza = json.loads(arquivo_teste.read_text(encoding='utf-8'))
    
    assert isinstance(conteudo_pos_limpeza, list)
    assert len(conteudo_pos_limpeza) == 0
    assert conteudo_pos_limpeza == []