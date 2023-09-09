const express = require("express");
const { engine } = require ("express-handlebars");
const myconnection =require("express-myconnection");
const mysql = require("mysql");
const session = require("express-session");
const bodyParser = require("body-parser");

const loginRoutes = require('./routes/login');

const app = express();
app.set('port', 4000);

app.set('views', __dirname + '/views');
app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(myconnection(mysql, {
<<<<<<< HEAD
    host: 'localhost',
    user: 'senaSoft',
    password: 'mujeres',
    port: 3307,
    database: 'mujeres'
=======
    host: "localhost",
    user: "senaSoft",
    password: "mujeres",
    database: "mujeres",
    port: "3307"
>>>>>>> 4ff7ab75d7eb6a21558707ddfc2de5b6fe241876
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(app.get('port'),()=>{
    console.log('Listening on port', app.get('port'));
});

app.use('/', loginRoutes);

app.get('/', (req, res)=>
res.render('home'));