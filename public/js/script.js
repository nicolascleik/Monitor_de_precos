function ordenar(criterio) {
    console.log("O usuário pediu para ordenar por:", criterio);

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
    buscarDados(urlDaApi);
}

async function buscarDados(url) {
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json(); 

        filtragemPorValores(dados)
    } catch (error) {
        console.error("Erro ao buscar:", error);
    }
}

async function buscarPorNome() {
    const termo = document.getElementById('input-busca-nome').value;

    const url = `http://localhost:3000/filtrarProdutosPorNome?nome=${termo}`;

    buscarDados(url);
}

async function buscarPorPreco() {
    const termo = Number.parseFloat(document.getElementById('input-busca-preco').value);

    const url = `http://localhost:3000/filtrarProdutosPorPreco?preco=${termo}`;

    buscarDados(url);
}

async function buscarPorQuantidade() {
    const termo = Number.parseInt(document.getElementById('input-busca-quantidade').value);

    const url = `http://localhost:3000/filtrarProdutosPorQuantidade?estoque=${termo}`;

    buscarDados(url);
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

window.onload = () => {
    buscarDados('http://localhost:3000/retornarTodosProdutos');
};