const {Router} = require('express')
const router=new Router()

router.get('/', function(req, res) {
    res.json({ mensaje: 'Bienvenido al servicio' })   
  })

module.exports=router