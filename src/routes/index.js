const express = require('express');
const routerUser = require('./users.router');
const routerCity = require('./city.router');
const router = express.Router();


// colocar las rutas aquí
router.use('/users',routerUser)
router.use('/cities',routerCity)

module.exports = router;


