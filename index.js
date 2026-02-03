import express from "express";
import db from "./src_node/config/db.js"

const app = express()
const PORT = 3000

app.get("/retornarTodosProdutos", (req, res) =>{
    db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
        throw err;
    }
        console.log("Produtos encontrados:", rows);
    });
})

app.get("/filtrarProdutosPorPreco", (req, res) => {
    const query = "SELECT * FROM produtos WHERE produtos.preco > 10"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por preço:", rows)
    })
})

app.get("/filtrarProdutosPorNome", (req, res) => {
    const query = "SELECT * FROM produtos WHERE produtos.produto LIKE '%bl%'"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por nome:", rows)
    })
})

app.get("/filtrarProdutosPorQuantidade", (req, res) => {
    const query = "SELECT * FROM produtos WHERE produtos.estoque > 20"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por quantidade selecionada:", rows)
    })
})

app.get("/filtrarProdutosPrecoCrescente", (req, res) => {
    const query = "SELECT * FROM produtos ORDER BY produtos.preco ASC"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por preço cres:", rows)
    })
})

app.get("/filtrarProdutosPrecoDescrecente", (req, res) => {
    const query = "SELECT * FROM produtos ORDER BY produtos.preco DESC"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por preço desc:", rows)
    })
})

app.get("/filtrarProdutosQuantidadeCrescente", (req, res) => {
    const query = "SELECT * FROM produtos ORDER BY produtos.estoque ASC"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por quantidade cres:", rows)
    })
})

app.get("/filtrarProdutosQuantidadeDescrecente", (req, res) => {
    const query = "SELECT * FROM produtos ORDER BY produtos.estoque DESC"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por quantidade desc:", rows)
    })
})

app.get("/valorDoEstoque", (req, res) => {
    const query = "SELECT SUM(preco * estoque) FROM produtos"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Valor do estoque:", rows)
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
})


//db.close((err) => {
//    if (err) {
//        console.error(err.message);
//    }
//    console.log('Conexão fechada.');
//});