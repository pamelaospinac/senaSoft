const bcrypt = require('bcrypt');

function login(req, res){
    res.render('login/index');
}

function register(req, res){
    res.render('login/register');
}

function storeUser(req, res){
    const data = req.body;
    bcrypt.hash(data.password, 12).then(hash => {
        data.password = hash;
        req.getConnection((err, conn)=>{
            conn.query('INSERT INTO users SET', [data], (err, rows)=>{
                res.redirect('/');
            });
        });
    });
}

module.exports = {
    login,
    register,
    storeUser,
}