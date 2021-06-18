const {Router} = require('express')
const connection=require('../database')
const router=new Router()

//consultar usuarios
router.get('/usuarios/getall', function(req, res) {
    connection.query('SELECT * from usuarios', function (error, results, fields) {
        if (!error){
            console.log(JSON.stringify(results))
            res.json(results)
        }else{
            console.log("error de conexion")
        }
        // connected!
      });
})

router.post('/usuarios/insertv2', function(req, res) {
    const usuario_a_insertar=req.body
    res.json("hola")
    connection.query('SELECT * from usuarios where cedula=? or email=?', [usuario_a_insertar.cedula, usuario_a_insertar.email], function (error, results, fields) {
        if (!error){
            console.log(results.length)
        }
    })
})


//insertar usuarios
router.post('/usuarios/insert', function(req, res) {
    const usuario_a_insertar=req.body
    console.log(usuario_a_insertar)
   
    connection.query('SELECT * from usuarios where cedula=? or email=?', [usuario_a_insertar.cedula, usuario_a_insertar.email], function (error, results, fields) {
        if (!error){
            console.log(results.length)
            if(results.length===0){
                connection.query('INSERT INTO usuarios SET ?', usuario_a_insertar, function (error, results, fields) {
                    if (!error){
                        console.log(results);
                        let respuesta = {
                            codigo: 1,
                            mensaje: 'Usuario Insertado'
                           }
                        res.json(respuesta)
                    }
                  
                  });
            }else{
                let respuesta = {
                    codigo: 3,
                    mensaje: 'Correo o cedula ya existe'
                }
                res.json(respuesta)
            }
        }else{
            console.log("error de conexion")
            let respuesta = {
                codigo: 2,
                mensaje: 'error de conexion'
               }
            res.json(respuesta)
           
        }
        // connected!
      });
   /* connection.query('SELECT * from usuarios where cedula=? and email=?',usuario_a_insertar.cedula,usuario_a_insertar.email, function (error, results, fields) {
        if (!error){
            console.log(results.length)
        }else{
            console.log(error)
        }
        // connected!
      });*/
})

//editar usuarios
router.post('/usuarios/edit', function(req, res) {
    const usuario_a_editar=req.body
    console.log(usuario_a_editar)
    connection.query('SELECT *  from usuarios where ( cedula=? or email=? ) and not id=?   ',[usuario_a_editar.cedula,usuario_a_editar.email,usuario_a_editar.id], function (error, results, fields) {
        if (!error){
            console.log(results.length)
            if(results.length===0){
                connection.query('UPDATE usuarios SET nombres = ?, apellidos = ?, email = ?,telefono=?, cedula = ? WHERE id=?', [usuario_a_editar.nombres, usuario_a_editar.apellidos, usuario_a_editar.email, usuario_a_editar.telefono,usuario_a_editar.cedula,usuario_a_editar.id], function (error, results, fields) {
                    if (!error){
                        let respuesta = {
                            codigo: 1,
                            mensaje: 'Usuario actualizado'
                           }
                        res.json(respuesta) 
                    }else{
                        let respuesta = {
                            codigo: 1,
                            mensaje: 'Usuario no existe'
                           }
                        res.json(respuesta) 
                    }

                  });
            }else{
                let respuesta = {
                    codigo: 11,
                    mensaje: 'Correo o cedula ya estan registrados'
                   }
                res.json(respuesta)
            }
          
        }else{
            let respuesta = {
                codigo: 5,
                mensaje: '"error de conexion'
               }
            res.json(respuesta)
            console.log("error de conexion")
        }
        // connected!
      });
})


function validar_cedula(usuario_insertar,usuarios_creados){
    var respuesta=false
    respuesta=usuarios_creados.some(function(usuario) {
        var existe_usuario=false
        if(usuario.cedula===usuario_insertar.cedula){
            existe_usuario=true
        }
        return existe_usuario;
      });
      return respuesta 
}

function validar_correo(usuario_insertar,usuarios_creados){
    var respuesta=false
    respuesta=usuarios_creados.some(function(usuario) {
        var existe_usuario=false
        if(usuario.email===usuario_insertar.email){
            existe_usuario=true
        }
        return existe_usuario;
      });
      return respuesta 
}

module.exports=router


