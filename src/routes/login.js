const express = require('express');// requerimos express
const LoginController = require('../controllers/LoginController');
const CRUDController = require('../controllers/CRUD')

const router = express.Router();// invocamos a la funcion router de express

router.get('/login', LoginController.login);
router.post('/loginusu', LoginController.auth);
router.get('/register', LoginController.register);
router.post('/registerUsuario', LoginController.storeUser);
router.get('/iniciosesion', LoginController.inicioS);
router.get('/logout', LoginController.logout);
router.get('/crearPartida', LoginController.crearPartida);
router.post('/iniciarPartida', LoginController.iniciarPartida);

// CRUD FUNCIONES 
router.get('/customers', CRUDController.listado);
router.get('/delete/:id', CRUDController.delete);
router.get('/customersEdit/:id', CRUDController.editarUsuario);
router.post('/editarUsuario/:id', CRUDController.uptade);
module.exports = router;