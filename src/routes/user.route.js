const express = require('express');
const router = express.Router();

const userRoutes = (app) => {
    router.get('/');
    return app.use('/user', router);
};

module.exports = userRoutes;
