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
        const { id } = req.params
        //ACTUALIZANDO DATOS A LA BD 
        confi.query('SELECT * FROM  digitales WHERE id = ?', [id], ((error, results) => {
           res.render('customers_edit', {
            data:customers
           })

        })
        )
    })
}



