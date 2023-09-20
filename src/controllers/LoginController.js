const bcrypt = require('bcrypt');

function login(req, res) {
    if(req.session.loggedin != true){
        res.render('login/index');

    }
    else{
        res.redirect('/')
    }
}

function auth(req, res) {  //funcion que nos va permitir iniciar sesion 
    const datos = req.body;
    console.log(datos)

    req.getConnection((err, confi) => {
        confi.query('SELECT * FROM digitales WHERE email = ?', [req.body.email], (err, usuariodatos) => {

            if (usuariodatos.length > 0) {
                //primero buscamos si el correo existe y si es igual a si, pasamos a verificar la contraseña, en caso que el correo no de aparece un error de usuario no existe 


                usuariodatos.forEach(element => {
                    bcrypt.compare(datos.password, element.password, (err, esIgual) => {
                        console.log(element.password)// comparamos que la contraseña escrita en el imput sea la misma del correo que se verifico anterior mente 

                        if (!esIgual) {
                            res.render('login/index', { error: 'Contraseña incorrecta' });

                        }
                        else {
                           req.session.loggedin = true;
                           req.session.name = datos.nombre;

                           res.redirect('/')
                        }
                    });

                });
            } else {

                res.render('login/index', { error: 'Este usuario no existe' });

            }
        })
    })




}

function register(req, res) {
    if(req.session.loggedin != true){
        res.render('login/register');

    }
    else{
        res.redirect('/')
    }
}

function storeUser(req, res) {
    const data= req.body;
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
                    bcrypt.hash(data.password, 12).then(hash =>{ //encryptamos la contraseña con elmetodo bcrypt
                       data.password = hash;
                    req.getConnection((err, confi) => { //getConnection estamos buscando la conexion con la BD establecida en app.js  
                        confi.query('INSERT INTO digitales SET ?', [data]);  // si no existe se lleva a cabo la respectiva funcion de registrar y guardar los datos
                        res.redirect('/')
                    })
               

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


function logout(req, res){
    if(req.session.loggedin == true){

        req.session.destroy();
    }
    res.redirect('/login');
}

function crearPartida(req, res){
    res.render('crearPartida')
}




module.exports = {
    login,
    register,
    storeUser,
    auth,
    inicioS,
    logout,
    crearPartida,
}