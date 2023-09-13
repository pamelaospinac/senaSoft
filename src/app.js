const express = require("express");//se require a express


const myconnection =require("express-myconnection");//nos permite acceder a la concexion por medio de este para utilizarlo en las funciones

const mysql = require("mysql");

const session = require("express-session");

const bodyParser = require("body-parser");

const morgan = require('morgan')

const path= require('path')

const loginRoutes = require('./routes/login');// importamos el documento de las rutas
//configuraciones 

const app = express();//inicializamos express
app.set('port', 4001);//elegimos el puerto para que funcione el servidor  y le decimos que utilice el 4001 o que utilice uno predeterminado del servidor 

app.set('views', __dirname + '/views');//configuramos el motor de platillas que en este caso es hbs o seria ejs, le indicamos que esta en la carpeta views



app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({ //metodo que nos permite entender todos los datos que etsan desde los formularios 
    extended: true
}));

app.use(bodyParser.json());



app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//INICIAMOS EL PUERTO
app.listen(app.get('port'),()=>{ //le enviamos el puerto que declaramos anteriormnete 
    console.log('Listening on port', app.get('port')); //enviamos un mensaje por consola confirmando la conexion 
});

// MIDDLEWARES
app.use(morgan('dev'));// manera de ver las peticiones a la pagina y sus estados

//conectabdo a la base de datos
app.use(myconnection(mysql, {
    host: "localhost",
    user: "senaSoft",
    password: "mujeres",
    database: "mujeres",
    port: "3307"
}));

//RUTAS
app.use('/', loginRoutes);//creando una ruta principal y si luego hay mas que utilice las de loginRoutes


app.get('/', (req, res) => {
    if(req.session.loggedin == true){
        res.render('home', { nombre:req.session.nombre });
    } else {
        res.redirect('/login');
    }
});


//STATICS FILES/ carpeta de estaticas
app.use(express.static(path.join(__dirname, 'public')));