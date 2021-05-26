const { get, create, update, remove } = require('./creditCard.controller')

module.exports = [
    { uri: '/',  get },
    { uri: '/', create },
    { uri: '/:id', update },
    { uri: '/:id', remove },
];
