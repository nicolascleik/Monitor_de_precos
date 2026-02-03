import express from "express";
import router from "./src_node/routes/produtoRoutes.js"

const app = express()
const PORT = 3000

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