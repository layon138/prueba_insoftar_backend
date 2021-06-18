var express = require('express') //llamamos a Express
var app = express()               

var port = process.env.PORT || 8090  // establecemos nuestro puerto
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//rutas
app.use(require('./src/routes/index'))
app.use(require('./src/routes/usuarios'))



// iniciamos nuestro servidor
app.listen(port)
console.log('API escuchando en el puerto ' + port)

