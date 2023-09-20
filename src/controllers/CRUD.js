exports.listado = (req, res) => {
    req.getConnection((err, confi) => {
        confi.query('SELECT * FROM digitales', (err, datos) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {

                data: datos
            })
        })

    })
}

exports.delete = (req, res) => {
    req.getConnection((err, confi) => {
        const { id } = req.params;//estamos buscando el id que se mando por medio de la url es decir la RUTA 
        confi.query('DELETE FROM digitales WHERE id = ?', [id], ((err, filas) => {
            res.redirect('/')
            console.log(filas)
        })
        )
    })
}

exports.customersEdit = (req, res) => {
    res.render('customers_edit')
}



exports.editarUsuario = (req, res) => {
    req.getConnection((err, confi) => {
        const { id } = req.params;
        //ACTUALIZANDO DATOS A LA BD 
        confi.query('SELECT * FROM  digitales WHERE id = ?', [id], ((error, customers) => {
            res.render('customers_edit', {
                data: customers[0]
            })

        })
        )
    })
}



exports.uptade = (req, res) => {
    const { id } = req.params;
    const nuevosDatos = req.body

    req.getConnection((err, confi) => {
        confi.query('UPDATE digitales SET ? WHERE id= ?', [nuevosDatos, id], (err, filas) => {
            res.redirect('/customers');
        })
    })

}





// exports.guardarNombre =(req, res) =>{
//     const data = req.body.nombre;
//     req.getConnection((err, confi) => { //getConnection estamos buscando la conexion con la BD establecida en app.js  
//         confi.query(`INSERT INTO jugadores (nombre) VALUES(${data})`);  // si no existe se lleva a cabo la respectiva funcion de registrar y guardar los datos
//         res.redirect('/iniciarPartida')
//     })
// }
