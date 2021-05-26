const { getModel } = require('../../mongoHandler');

const CreditCard = getModel('CreditCard')

const create = async (req, res) => {
    const response = await CreditCard.create(req.body)
    res.created(response);
}

const get = async (req, res, next) => {
    const cards = await CreditCard.find(req.query);
    console.log(cards);
    res.ok(cards);
}

const update = async (req, res, next) => {
// put your code here...
}

const remove = async (req, res, next) => {
// put your code here...
}
module.exports = {
    create,
    get,
    update,
    remove
};
