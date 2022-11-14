const express = require('express');
require('express-async-errors');

const { productsRouter, salesRouter } = require('./routes');

const { errorHandling } = require('./middlewares');

const app = express();

app.use(express.json());

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.use(errorHandling);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;