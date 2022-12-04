const productControler = require('../controller/productControler');
const express = require('express');
const router = express.Router();

const routes = (app) => {
    router.get('/', productControler.getAllProducts);
    router.post('/add', productControler.addProduct);
    router.post('/delete/:id', productControler.removeProduct);
    return app.use('/products', router);
};

module.exports = routes;
