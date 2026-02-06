import pytest
from src_python.db_handler import DbHandler
from unittest.mock import MagicMock

@pytest.fixture
def db_handler_teste(tmp_path):
    caminho_banco = tmp_path / "teste_storage.db"
    handler = DbHandler(db_path=caminho_banco)
    
    yield handler
    
    handler.fechar_conexao()

def test_tabela_criada_corretamente(db_handler_teste):
    query = "SELECT name FROM sqlite_master WHERE type='table' AND name='produtos';"
    cursor = db_handler_teste.conn.execute(query)
    resultado = cursor.fetchone()
    
    assert resultado is not None
    assert resultado[0] == 'produtos'

def test_inserir_lote_com_sucesso(db_handler_teste):
    lote_teste = [
        {"produto": "Areia", "preco": 1, "quantidade": 1},
        {"produto": "Cimento", "preco": 1, "quantidade": 1}
    ]
    
    sucesso = db_handler_teste.inserir_lote_json_para_db(lote_teste)
    
    assert sucesso is True
    
    cursor = db_handler_teste.conn.execute("SELECT * FROM produtos")
    linhas = cursor.fetchall()
    
    assert len(linhas) == 2
    assert linhas[0]['produto'] == "Areia"
    assert linhas[1]['produto'] == "Cimento"

def test_limpar_banco(db_handler_teste):
    lote = [{"produto": "Lixo", "preco": 1, "quantidade": 1}]
    db_handler_teste.inserir_lote_json_para_db(lote)
    
    cursor = db_handler_teste.conn.execute("SELECT count(*) FROM produtos")
    assert cursor.fetchone()[0] == 1
    
    db_handler_teste.limpar_db()
    
    cursor = db_handler_teste.conn.execute("SELECT count(*) FROM produtos")
    assert cursor.fetchone()[0] == 0

def test_inserir_lote_com_erro_deve_fazer_rollback(db_handler_teste):
    conexao_falsa = MagicMock()
    cursor_falso = MagicMock()
    
    cursor_falso.executemany.side_effect = Exception("Erro Simulado de SQL")
    
    db_handler_teste.conn = conexao_falsa
    db_handler_teste.cur = cursor_falso
    
    lote = [{"produto": "Teste", "preco": 10, "quantidade": 1}]

    resultado = db_handler_teste.inserir_lote_json_para_db(lote)

    assert resultado is False
    conexao_falsa.rollback.assert_called_once()

def test_limpar_db_com_erro_deve_fazer_rollback(db_handler_teste):
    conexao_falsa = MagicMock()
    cursor_falso = MagicMock()
    
    cursor_falso.execute.side_effect = Exception("Erro ao deletar")
    
    db_handler_teste.conn = conexao_falsa
    db_handler_teste.cur = cursor_falso

    resultado = db_handler_teste.limpar_db()

    assert resultado is False
    conexao_falsa.rollback.assert_called_once()