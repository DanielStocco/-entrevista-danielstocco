const config = require('config');
const { intDb } = require('./mongoHandler')
const unnameable = require('unnameable-core').unnameable(config);

(async () => {
// inicializo rutas;
    await intDb(config, unnameable.logger);
    const routes = require('./router')();
    unnameable.init(routes);
    unnameable.run();
})()


