var accountManager = require('../managers/accountManager');

/**
 * accountController
 * @type {{getAccountTransactions: accountController.getAccountTransactions}}
 */
let accountController = {
    getAccountTransactions: async function(req, res) {
        //@TODO: add validation
        const address = req.query.address;
        const limit = req.query.limit;
        const offset = req.query.offset;

        const result = await accountManager.getAccountTransactions(address,limit,offset);
        res.json(result);
    }
};

module.exports = accountController;