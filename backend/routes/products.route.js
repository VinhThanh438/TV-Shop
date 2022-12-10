const productControler = require('../controller/productController');
const express = require('express');
const router = express.Router();

const routes = (app) => {
    router.get('/', productControler.getAllProducts);
    router.get('/:id', productControler.getProductById);
    router.post('/add', productControler.addProduct);
    router.post('/edit/:id', productControler.editProduct);
    router.post('/delete/:id', productControler.removeProduct);
    return app.use('/products', router);
};

module.exports = routes;
