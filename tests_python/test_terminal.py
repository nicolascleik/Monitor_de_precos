import pytest
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