import express from "express";
import router from "./src_node/routes/produtoRoutes.js"

import { logger } from "./src_node/middlewares/Logger.js"

import path from "path"; 
import { fileURLToPath } from "url";

const urlAtual = import.meta.url
const __filename = fileURLToPath(urlAtual);
const __dirname = path.dirname(__filename)

export const app = express()
const PORT = 3000

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
})

//db.close((err) => {
//    if (err) {
//        console.error(err.message);
//    }
//    console.log('Conexão fechada.');
//});