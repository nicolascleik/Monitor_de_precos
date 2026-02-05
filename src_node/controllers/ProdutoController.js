import * as produtoModel from "../models/produtoModel.js";

export async function retornarTodosProdutos(req, res){
    try{
        const produtos = await produtoModel.getAll();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

export async function buscarProdutoPorNome(req, res) {
    try{
        const produtos = await produtoModel.searchProductByName(req.query.nome)
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({err: err.message})
    }
}

export async function buscarProdutoPorPreco(req, res) {
    try{
        const produtos = await produtoModel.searchProductByPrice(req.query.preco)
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({err: err.message})
    }
}

export async function buscarPorQuantidade(req, res) {
    try{
        const produtos = await produtoModel.searchProductByQuantity(req.query.estoque)
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({err: err.message})
    }
}

export async function somarValorEstoque(req, res) {
    try{
        const produtos = await produtoModel.sumAllStockValue()
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({err: err.message})
    }
}

export async function filtrarProdutosPrecoCrescente(req, res) {
    try{
        const produtos = await produtoModel.getAllProductsByPriceASC();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

export async function filtrarProdutosPrecoDescrecente(req, res) {
    try{
        const produtos = await produtoModel.getAllProductsByPriceDESC();
        res.status(200).json(produtos);
    } catch(err){
        res.status(500).json({err: err.message})
    }
}
 
export async function filtrarProdutosQuantidadeCrescente(req, res) {
    try{
        const produtos = await produtoModel.getAllProductsByStockASC();
        res.status(200).json(produtos)
    } catch (err){
        res.status(500).json({ err: err.message });
    }
}

export async function filtrarProdutosQuantidadeDescrecente(req, res) {
    try{
        const produtos = await produtoModel.getAllProductsByStockDESC();
        res.status(200).json(produtos)
    } catch (err){
        res.status(500).json({ err: err.message });
    }
}