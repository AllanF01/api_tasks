const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect('mongodb://localhost:27017/QAfinal')
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(5000, () => {
      console.log('Servidor corriendo en http://localhost:5000');
    });
  })
  .catch(err => console.error(err));
