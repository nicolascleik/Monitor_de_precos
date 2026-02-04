async function ordenar(criterio) {
    let urlDaApi = "";

    if (criterio === 'preco-asc') {
        urlDaApi = "http://localhost:3000/filtrarProdutosPrecoCrescente";
    } 
    else if (criterio === 'preco-desc') {
        urlDaApi = "http://localhost:3000/filtrarProdutosPrecoDescrecente";
    }
    else if (criterio === 'qtd-asc') {
        urlDaApi = "http://localhost:3000/filtrarProdutosQuantidadeCrescente";
    }
    else if (criterio === 'qtd-desc') {
        urlDaApi = "http://localhost:3000/filtrarProdutosQuantidadeDescrecente";
    }

    const dados = await buscarDados(urlDaApi);

    if (dados) {
        filtragemPorValores(dados);
    }
}

async function buscarDados(url) {
    try {
        const resposta = await fetch(url);
        
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        
        const dados = await resposta.json();
        return dados;
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}

async function buscarPorNome() {
    const termo = document.getElementById('input-busca-nome').value;

    const url = `http://localhost:3000/filtrarProdutosPorNome?nome=${termo}`;

    const dados = await buscarDados(url);
    if (dados) {
        filtragemPorValores(dados);
    }
}

async function buscarPorPreco() {
    const termo = Number.parseFloat(document.getElementById('input-busca-preco').value);

    const url = `http://localhost:3000/filtrarProdutosPorPreco?preco=${termo}`;

    const dados = await buscarDados(url);
    if (dados) {
        filtragemPorValores(dados);
    }
}

async function buscarPorQuantidade() {
    const termo = Number.parseInt(document.getElementById('input-busca-quantidade').value);

    const url = `http://localhost:3000/filtrarProdutosPorQuantidade?estoque=${termo}`;

    buscarDados(url);
}

async function carregarTodos() {
    const url = `http://localhost:3000/retornarTodosProdutos`;
    const dados = await buscarDados(url);

    if (dados) {
        filtragemPorValores(dados);
    }
}

async function filtragemPorValores(listaProdutos) {
    const tbody = document.getElementById('tabela-produtos');
    tbody.innerHTML = '';

    listaProdutos.forEach(produto => {
        const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco);
        const totalCalculado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco * produto.estoque);

        const linhaHTML = `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.produto}</td> 
                <td>${precoFormatado}</td>
                <td>${produto.estoque}</td>
                <td>${totalCalculado}</td>
            </tr>
        `; 

        tbody.innerHTML += linhaHTML;
    }); 
}

async function carregarValorDeEstoque() {
    const elementoValor = document.getElementById("valor-total-estoque")
    const url = "http://localhost:3000/valorDoEstoque";

    const dados = await buscarDados(url);

    if (dados && dados.length > 0) {
        const valorBruto = dados[0].total;

        const valorFormatado = new Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }).format(valorBruto);

        elementoValor.innerText = valorFormatado;
    } else {
        elementoValor.innerText = "R$ 0,00";
    }
}

window.onload = () => { 
    carregarTodos();
    carregarValorDeEstoque();
};