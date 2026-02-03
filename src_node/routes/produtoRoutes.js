import Router from "express";
import db from "../config/db.js"
import * as ProdutoController from "../controllers/ProdutoController.js"

const router = Router()

router.get("/retornarTodosProdutos", ProdutoController.retornarTodosProdutos);

router.get("/filtrarProdutosPorPreco", (req, res) => {
    const query = "SELECT * FROM produtos WHERE produtos.preco > 10"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err;
        }
        console.log("Filtagem por preço:", rows);
    });
});

router.get("/filtrarProdutosPorNome", (req, res) => {
    const query = "SELECT * FROM produtos WHERE produtos.produto LIKE '%bl%'";
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por nome:", rows)
    });
});

router.get("/filtrarProdutosPorQuantidade", (req, res) => {
    const query = "SELECT * FROM produtos WHERE produtos.estoque > 20"
    db.all(query, [], (err, rows) =>{
        if (err){
            throw err
        }
        console.log("Filtagem por quantidade selecionada:", rows)
    })
})

router.get("/filtrarProdutosPrecoCrescente", ProdutoController.filtrarProdutosPrecoCrescente)

router.get("/filtrarProdutosPrecoDescrecente", ProdutoController.filtrarProdutosPrecoDescrecente)

router.get("/filtrarProdutosQuantidadeCrescente", ProdutoController.filtrarProdutosQuantidadeCrescente)

router.get("/filtrarProdutosQuantidadeDescrecente", ProdutoController.filtrarProdutosQuantidadeCrescente)

router.get("/valorDoEstoque", ProdutoController.somarValorEstoque)

export default router;