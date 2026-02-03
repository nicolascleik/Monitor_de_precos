import sqlite3 from "sqlite3";

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

sqlite3.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, '..', '..','data', 'storage.db')
console.log(`Tentando conectar ao banco em: ${dbPath}`);

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Erro ao conectar (Verifique o caminho!):', err.message);
    } else {
        console.log('Conectado ao banco SQLite com sucesso!');
    }
});

export default db;