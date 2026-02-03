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
        const query = "SELECT SUM(preco * estoque) FROM produtos"
        db.all(query, [], (err, rows) =>{
            if (err){
                reject(err)
            }
            resolve(rows)
        })
    })
}

export function gellAllProductsByPriceASC(){
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

export function gellAllProductsByPriceDESC(){
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

export function gellAllProductsByStockASC() {
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

export function gellAllProductsByStockDESC(){
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