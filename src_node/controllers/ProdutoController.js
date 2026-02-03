import * as produtoModel from "../models/produtoModel.js";

export async function retornarTodosProdutos(req, res){
    try{
        const produtos = await produtoModel.getAll();
        res.json(produtos)
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

export async function somarValorEstoque(req, res) {
    try{
        const produtos = await produtoModel.sumAllStockValue()
        res.json(produtos);
        res.status(200).json(produtos);
    } catch{
        res.status(500).json({err: err.message})
    }
}

export async function filtrarProdutosPrecoCrescente(req, res) {
    try{
        const produtos = await produtoModel.gellAllProductsByPriceDESC();
        res.json(produtos)
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
}

export async function filtrarProdutosPrecoDescrecente(req, res) {
    try{
        const produtos = await produtoModel.gellAllProductsByPriceASC();
        res.json(produtos);
        res.status(200).json(produtos);
    } catch(err){
        res.status(500).json({err: err.message})
    }
}

export async function filtrarProdutosQuantidadeCrescente(req, res) {
    try{
        const produtos = await produtoModel.gellAllProductsByStockASC();
        res.json(produtos)
        res.status(200).json(produtos)
    } catch (err){
        res.status(500).json({ err: err.message });
    }
}

export async function filtrarProdutosQuantidadeDescrecente(req, res) {
    try{
        const produtos = await produtoModel.gellAllProductsByStockDESC();
        res.json(produtos)
        res.status(200).json(produtos)
    } catch (err){
        res.status(500).json({ err: err.message });
    }
}