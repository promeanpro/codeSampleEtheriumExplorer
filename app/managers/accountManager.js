var blockchainManager = require('./blockchainManager/blockchainManager')

"use strict";

/**
 * accountManager
 * @type {{getAccountTransactions: (function(*=): Promise<*[]>)}}
 */
let accountManager = {
    /**
     * get transactions for account
     * @param address account address
     * @param limit limit rows
     * @param offset offset
     * @returns {Promise<*[]>}
     */
    getAccountTransactions: function(address, limit, offset) {
        return blockchainManager.getTransactionsByAccount(address, limit, offset);
    }
};

module.exports = accountManager;


