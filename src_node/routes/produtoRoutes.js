import Router from "express";
import db from "../config/db.js"
import * as ProdutoController from "../controllers/ProdutoController.js"

import path from "path"; 
import { fileURLToPath } from "url";

const urlAtual = import.meta.url
const __filename = fileURLToPath(urlAtual);
const __dirname = path.dirname(__filename)

const router = Router()

router.get("/", (req, res)=>{
    const caminhoArquivo = path.join(__dirname, "..", "..", "public", "index.html");
    res.sendFile(caminhoArquivo);
})

router.get("/retornarTodosProdutos", ProdutoController.retornarTodosProdutos);

router.get("/filtrarProdutosPorPreco", ProdutoController.buscarProdutoPorPreco);

router.get("/filtrarProdutosPorNome", ProdutoController.buscarProdutoPorNome);

router.get("/filtrarProdutosPorQuantidade", ProdutoController.buscarPorQuantidade)

router.get("/filtrarProdutosPrecoCrescente", ProdutoController.filtrarProdutosPrecoCrescente)

router.get("/filtrarProdutosPrecoDescrecente", ProdutoController.filtrarProdutosPrecoDescrecente)

router.get("/filtrarProdutosQuantidadeCrescente", ProdutoController.filtrarProdutosQuantidadeCrescente)

router.get("/filtrarProdutosQuantidadeDescrecente", ProdutoController.filtrarProdutosQuantidadeDescrecente)

router.get("/valorDoEstoque", ProdutoController.somarValorEstoque)

export default router;