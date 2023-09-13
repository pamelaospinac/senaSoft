exports.listado = (req, res)=>{
    req.getConnection((err, confi)=>{
        confi.query('SELECT * FROM digitales', (err, datos)=>{
            if(err){
                res.json(err);
            }
            console.log(datos)
            res.render('customers', {

                data:datos
            })
        })

    })
}