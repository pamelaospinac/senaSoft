const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.login);
router.post('/loginusu', LoginController.auth);
router.get('/register', LoginController.register);
router.post('/registerUsuario', LoginController.storeUser);
router.get('/iniciosesion', LoginController.inicioS);

module.exports = router;