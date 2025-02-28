var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/uusuarios/add', function (req, res, next) {
  res.render('usuarios_formulario', { title: 'Express' });
});

router.get('/uusuarios/delete', function (req, res, next) {
  res.render('usuario_delete', { title: 'Express' });
});

router.post('/uusuarios/save', async function (req,
  res, next) {
  let { title, description, rate } = req.body
  const URL ='http://localhost:3000/rest/save'
  let data = {
    titulo: title,
    descripcion: description,
    calificacion: rate,
    ruta: ''
  }

  const config = {
    proxy: {
      host: 'localhost',
      port: 3000
    }
  }
  const response = await axios.post(URL, data,
    config);
  if (response.status == '200' &&
    response.statusText == 'OK') {
    res.redirect('/rest/view')
  } else {
    res.redirect('/')
  }
});


router.delete('/uusuarios/delete', async function (req, res, next) {
  let { id } = req.body;

  const URL = `http://localhost:3000/rest/delete/${id}`;

  const config = {
    proxy: {
      host: 'localhost',
      port: 3000
    }
  };

  try {
    const response = await axios.post(URL, {}, config);

    if (response.status === 200 && response.statusText === 'OK') {
      res.redirect('/rest/view');
    } else {
      res.redirect('/');  
    }
  } catch (error) {
    console.error('Error al intentar eliminar la usuario:', error);
    res.status(500).send('Error en el servidor');
  }
});


module.exports = router;
