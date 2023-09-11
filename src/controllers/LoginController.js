const bcrypt = require('bcrypt');

function login(req, res) {
    res.render('login/index');
}

function auth(req, res) {  //funcion que nos va permitir iniciar sesion 
    const datos = req.body;

    req.getConnection((err, confi) => {
        confi.query('SELECT * FROM digitales WHERE email = ?', [req.body.email], (err, usuariodatos) => {

            if (usuariodatos.length > 0) {
                //primero buscamos si el correo existe y si es igual a si, pasamos a verificar la contraseña, en caso que el correo no de aparece un error de usuario no existe 
                
                    
                    usuariodatos.forEach(element => {
                        datos.password === usuariodatos.password, (err, esIgual) => {
                        console.log(element.password)

                              if (!esIgual) {
                        res.render('login/index', { error: 'Contraseña incorrecta' });

                    }
                    else {
                        console.log('bienvenido')
                    }                        
                    };
              
                 });
            } else {

                res.render('login/index', { error: 'Este usuario no existe' });

            }
        })
    })




}

function register(req, res) {
    res.render('login/register');
}

function storeUser(req, res) {
    const { nombre, email, password } = req.body;
    console.log(req.body)


    req.getConnection((err, confi) => {
        confi.query('SELECT * FROM digitales WHERE email = ?', [req.body.email], (err, usuariodatos) => {
            if (usuariodatos.length > 0) {        // confirmando si el correo digitado en el campo de registrar ya existe en la base de datos o no 
                res.render('login/register', {
                    error: 'Error usuario ya existe'
                });
            }
            else {

                try {
                    const sql = 'INSERT INTO digitales (nombre, email, password) VALUES (?,?,?)';
                    req.getConnection((err, confi) => { //getConnection estamos buscando la conexion con la BD establecida en app.js  
                        confi.query(sql, [nombre, email, password]);  // si no existe se lleva a cabo la respectiva funcion de registrar y guardar los datos
                        res.redirect('/')

                    })

                } catch (error) {
                    res.status(500).send('Error al guardar los datos: ' + error.message);
                }

            }
        })
    })


}


function inicioS(req, res) {
    res.render('iniciosesion')
}




module.exports = {
    login,
    register,
    storeUser,
    auth,
    inicioS
}