import request from 'supertest';
import { app } from '../index.js';

describe('Testes de Integração da API', () => {

    test('GET / deve retornar o HTML principal', async () => {
        const resposta = await request(app).get('/');
        
        expect(resposta.statusCode).toBe(200);
        expect(resposta.headers['content-type']).toMatch(/html/);
    });

    test('GET /retornarTodosProdutos deve retornar JSON', async () => {
        const resposta = await request(app).get('/retornarTodosProdutos');
        
        expect(resposta.statusCode).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
    });

    test('GET /filtrarProdutosPorNome deve retornar um ou mais produto', async () => {
        const todosProdutos = await request(app).get('/retornarTodosProdutos')

        if (todosProdutos.body.length === 0) {
            console.warn("Banco de dados vazio");
            return; 
        }

        const produtoReal = todosProdutos.body[0];
        const nomeParaBuscar = produtoReal.produto;
        
        const respostaBusca = await request(app).get(`/filtrarProdutosPorNome?nome=${encodeURIComponent(nomeParaBuscar)}`);
        
        expect(respostaBusca.statusCode).toBe(200)
        expect(respostaBusca.body.length).toBeGreaterThan(0)
        expect(respostaBusca.body[0].produto).toContain(nomeParaBuscar)
    })

    test('GET /filtrarProdutosPorNome deve retornar array vazio se não achar nada', async () => {
        const resposta = await request(app).get('/filtrarProdutosPorNome?nome=UnicornioInexistente')
        
        expect(resposta.statusCode).toBe(200)
        expect(Array.isArray(resposta.body)).toBe(true)
        expect(resposta.body.length).toBe(0)
    });

    test('GET /filtrarProdutosPorPreco deve retornar um ou mais produtos', async () =>{
        const todosProdutos = await request(app).get('/retornarTodosProdutos')

        if (todosProdutos.body.length === 0) {
            console.warn("Banco de dados vazio");
            return; 
        }

        const produtoReal = todosProdutos.body[0];
        const valorParaBuscar = produtoReal.preco;
        
        const respostaBusca = await request(app).get(`/filtrarProdutosPorPreco?preco=${encodeURIComponent(valorParaBuscar)}`)

        expect(respostaBusca.statusCode).toBe(200)
        expect(respostaBusca.body.length).toBeGreaterThanOrEqual(0)
        expect(respostaBusca.body[0].preco).toEqual(valorParaBuscar)
    })

    test('GET /filtrarProdutosPorQuantidade deve retornar um ou mais produto', async () =>{
        const todosProdutos = await request(app).get('/retornarTodosProdutos')

        if(todosProdutos.body.length == 0){
            console.warn("Banco de dados vazio");
            return;
        }

        const produtoReal = todosProdutos.body[0];
        const estoqueParaBuscar = produtoReal.estoque;
        
        const respostaBusca = await request(app).get(`/filtrarProdutosPorQuantidade?estoque=${encodeURIComponent(estoqueParaBuscar)}`)

        expect(respostaBusca.statusCode).toBe(200)
        expect(respostaBusca.body.length).toBeGreaterThanOrEqual(0)
        expect(respostaBusca.body[0].estoque).toEqual(estoqueParaBuscar)
    })

    test('GET /filtrarProdutosPrecoCrescente deve vir ordenado', async () =>{
        const resposta = await request(app).get('/filtrarProdutosPrecoCrescente');
        
        expect(resposta.statusCode).toBe(200);
        const lista = resposta.body;

        if(lista.length >= 2){
            const precoPrimeiro = lista[0].preco
            const precoSegundo = lista[1].preco

            expect(precoPrimeiro).toBeLessThanOrEqual(precoSegundo)
        }
    })

    test('GET /filtrarProdutosPrecoDescrecente deve vir ordenado', async () => {
        const resposta = await request(app).get('/filtrarProdutosPrecoDescrecente')

        expect(resposta.statusCode).toBe(200)
        const lista = resposta.body

        if(lista.length >= 2){
            const precoPrimeiro = lista[0].preco
            const precoSegundo = lista[1].preco

            expect(precoPrimeiro).toBeGreaterThanOrEqual(precoSegundo)
        }
    })

    test('GET /filtrarProdutosQuantidadeCrescente deve vir ordenado', async () =>{
        const resposta = await request(app).get('/filtrarProdutosQuantidadeCrescente')

        expect(resposta.statusCode).toBe(200)
        const lista = resposta.body

        if(lista.length >= 2){
            const estoquePrimeiro = lista[0].estoque
            const estoqueSegundo = lista[1].estoque

            expect(estoquePrimeiro).toBeLessThanOrEqual(estoqueSegundo)
        }
    })

    test('GET /filtrarProdutosQuantidadeDescrecente deve vir ordenado', async () =>{
        const resposta = await request(app).get('/filtrarProdutosQuantidadeDescrecente')

        expect(resposta.statusCode).toBe(200)
        const lista = resposta.body

        if(lista.length >= 2){
            const estoquePrimeiro = lista[0].estoque
            const estoqueSegundo = lista[1].estoque
            
            expect(estoquePrimeiro).toBeGreaterThanOrEqual(estoqueSegundo)
        }
    })

    test('GET /valorDoEstoque deve retornar a soma do estoque * preco', async () =>{
        const resposta = await request(app).get('/valorDoEstoque');

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body[0]).toHaveProperty('total')
        expect(resposta.body[0].total).toBeGreaterThanOrEqual(0)
    })
});