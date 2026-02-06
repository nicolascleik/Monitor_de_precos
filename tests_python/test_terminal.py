import json
import pytest
from unittest.mock import MagicMock
from src_python.TerminalCLI import TerminalCLI

def test_sair_do_terminal(monkeypatch):
    inputs_falsos = iter(["0"])
    
    monkeypatch.setattr('builtins.input', lambda _: next(inputs_falsos))
    
    cli = TerminalCLI()

    with pytest.raises(SystemExit):
        cli.executar()

def test_inicializacao_correta():
    cli = TerminalCLI()
    
    assert cli.db is not None
    assert cli.json is not None
    assert "1" in cli.menu_actions

def test_adicionar_produto_interface(monkeypatch):
    inputs = iter(["1", "Cimento", "1", "1", "", "0"])
    
    monkeypatch.setattr('builtins.input', lambda _: next(inputs))
    
    cli = TerminalCLI()
    
    cli.json.inserir_novo_lote = MagicMock()

    with pytest.raises(SystemExit): 
        cli.executar()

    cli.json.inserir_novo_lote.assert_called_once()
    
    args, _ = cli.json.inserir_novo_lote.call_args
    lote_salvo = args[0]
    
    assert lote_salvo[0]['nome'] == 'cimento'
    assert lote_salvo[0]['preco'] == 1
    assert lote_salvo[0]['quantidade'] == 1

def test_migrar_json_para_db(monkeypatch, tmp_path):
    arquivo_falso = tmp_path / "inventory.json"
    dados_fake = [{"nome": "Teste", "preco": 1, "quantidade": 1}]
    arquivo_falso.write_text(json.dumps(dados_fake), encoding='utf-8')
    
    monkeypatch.setattr("src_python.TerminalCLI.PATH_JSON", arquivo_falso)

    inputs = iter(["3", "", "0"])
    monkeypatch.setattr('builtins.input', lambda _: next(inputs))

    cli = TerminalCLI()
    
    cli.db.inserir_lote_json_para_db = MagicMock()
    cli.json.limpar_dados = MagicMock()

    with pytest.raises(SystemExit):
        cli.executar()

    cli.db.inserir_lote_json_para_db.assert_called_once_with(dados_fake)
    cli.json.limpar_dados.assert_called_once()

def test_adicionar_produto_com_erro_de_digitacao(monkeypatch, capsys):
    inputs = iter(["1", "Cimento", "abc", "1", "1", "", "0"])
    monkeypatch.setattr('builtins.input', lambda _: next(inputs))
    
    cli = TerminalCLI()
    cli.json.inserir_novo_lote = MagicMock()

    with pytest.raises(SystemExit):
        cli.executar()
    
    captured = capsys.readouterr()
    assert "Erro: Digite um número válido" in captured.out

def test_limpar_banco_confirmado(monkeypatch):
    inputs = iter(["5", "S", "", "0"])
    monkeypatch.setattr('builtins.input', lambda _: next(inputs))
    
    cli = TerminalCLI()
    cli.db.limpar_db = MagicMock()

    with pytest.raises(SystemExit):
        cli.executar()

    cli.db.limpar_db.assert_called_once()

def test_limpar_banco_recusado(monkeypatch):
    inputs = iter(["5", "N", "0"]) 
    monkeypatch.setattr('builtins.input', lambda _: next(inputs))
    
    cli = TerminalCLI()
    cli.db.limpar_db = MagicMock()

    with pytest.raises(SystemExit):
        cli.executar()

    cli.db.limpar_db.assert_not_called()

def test_adicionar_produto_falha_ao_salvar(monkeypatch, capsys):
    inputs = iter(["1", "Cimento", "1", "1", "", "0"])
    monkeypatch.setattr('builtins.input', lambda _: next(inputs))
    
    cli = TerminalCLI()
    
    cli.json.inserir_novo_lote = MagicMock(side_effect=Exception("Disco Cheio"))
    
    with pytest.raises(SystemExit):
        cli.executar()
        
    captured = capsys.readouterr()
    assert "Erro ao salvar no arquivo: Disco Cheio" in captured.out

def test_opcao_menu_invalida(monkeypatch, capsys):
    inputs = iter(["99", "0"])
    monkeypatch.setattr('builtins.input', lambda _: next(inputs))
    
    cli = TerminalCLI()
    
    with pytest.raises(SystemExit):
        cli.executar()
        
    captured = capsys.readouterr()
    assert "Opção Inválida!" in captured.out




