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

});