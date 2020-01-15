const { Router } = require('express');

const DevController = require('./app/controllers/DevController');
const SearchController = require('./app/controllers/SearchController');

const routes = new Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/devs', SearchController.index);


module.exports = routes;