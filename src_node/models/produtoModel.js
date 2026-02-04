import db from "../config/db.js"

export function getAll() {
    return new Promise((resolve, reject) =>{
        db.all("SELECT * FROM produtos", [], (err, rows) => {
        if (err) {
            reject(err);
        }
            resolve(rows);
        });
    });
}

export function sumAllStockValue(){
    return new Promise((resolve, reject) => {
        const query = "SELECT SUM(preco * estoque) as total FROM produtos"
        db.all(query, [], (err, rows) =>{
            if (err){
                reject(err)
            }
            resolve(rows)
        })
    })
}

export function getAllProductsByPriceASC(){
    return new Promise((resolve, reject) =>{
        const query = "SELECT * FROM produtos ORDER BY produtos.preco ASC"
        db.all(query, [], (err, rows) =>{
            if (err){
                reject(err)
            }
            resolve(rows)
        })
    })
}

export function getAllProductsByPriceDESC(){
    return new Promise((resolve, reject) =>{
        const query = "SELECT * FROM produtos ORDER BY produtos.preco DESC"
            db.all(query, [], (err, rows) =>{
                if (err){
                    reject(err);
                }
                resolve(rows);
            });
    });
}

export function getAllProductsByStockASC() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM produtos ORDER BY produtos.estoque ASC"
        db.all(query, [], (err, rows) =>{
            if (err){
                reject(err)
            }
            resolve(rows)
        })
    })
}

export function getAllProductsByStockDESC(){
    return new Promise((resolve, reject) =>{
        const query = "SELECT * FROM produtos ORDER BY produtos.estoque DESC"
        db.all(query, [], (err, rows) =>{
            if (err){
                reject(err);
            }
            resolve(rows);
        })
    })
}