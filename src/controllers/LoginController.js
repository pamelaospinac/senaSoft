const bcrypt = require('bcrypt');
const mysql = require('mysql');
const configuracion = mysql.createConnection({
    host: "localhost",
    user: "senaSoft",
    password: "mujeres",
    database: "mujeres",
    port: "3307"
})


function login(req, res){
    res.render('login/index');
}

function auth(req, res){
    const data = req.body;
    console.log(data);
}

function register(req, res){
    res.render('login/register');
}

function storeUser(req, res){
    const { nombre, email, password } = req.body;
    console.log(req.body)
  
    try {
      const sql = 'INSERT INTO digitales (nombre, email, password) VALUES (?,?,?)';
      configuracion.query(sql, [nombre, email, password]);
      res.redirect('/')
    } catch (error) {
      res.status(500).send('Error al guardar los datos: ' + error.message);
    }
    
}





module.exports = {
    login,
    register,
    storeUser,
    auth,
}