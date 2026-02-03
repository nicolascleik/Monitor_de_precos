import express from "express";
import db from "./src_node/config/db.js"
import * as ProdutoController from "./src_node/controllers/ProdutoController.js"

const app = express()
const PORT = 3000

app.get("/retornarTodosProdutos", ProdutoController.retornarTodosProdutos);

app.get("/filtrarProdutosPorPreco", (req, res) => {
    const query = "SELECT * FROM produtos WHERE produtos.preco > 10"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err;
        }
        console.log("Filtagem por preço:", rows);
    });
});

app.get("/filtrarProdutosPorNome", (req, res) => {
    const query = "SELECT * FROM produtos WHERE produtos.produto LIKE '%bl%'";
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por nome:", rows)
    });
});

app.get("/filtrarProdutosPorQuantidade", (req, res) => {
    const query = "SELECT * FROM produtos WHERE produtos.estoque > 20"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por quantidade selecionada:", rows)
    })
})

app.get("/filtrarProdutosPrecoCrescente", ProdutoController.filtrarProdutosPrecoCrescente)

app.get("/filtrarProdutosPrecoDescrecente", ProdutoController.filtrarProdutosPrecoDescrecente)

app.get("/filtrarProdutosQuantidadeCrescente", ProdutoController.filtrarProdutosQuantidadeCrescente)

app.get("/filtrarProdutosQuantidadeDescrecente", ProdutoController.filtrarProdutosQuantidadeCrescente)

app.get("/valorDoEstoque", ProdutoController.somarValorEstoque)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
})


//db.close((err) => {
//    if (err) {
//        console.error(err.message);
//    }
//    console.log('Conexão fechada.');
//});