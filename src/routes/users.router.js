const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');

const hashPassword = require('../middlewares/hashPassword.middlewares');
const credentials = require('../middlewares/login.middlewares');

const routerUser = express.Router();

routerUser.route('/')
    .get(getAll)
    .post(hashPassword, create);

 routerUser.route("/login")
   .post(credentials, login);
 /* routerUser.route("/me")
    .get(verifyJWT, logged); */
        

routerUser.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerUser;