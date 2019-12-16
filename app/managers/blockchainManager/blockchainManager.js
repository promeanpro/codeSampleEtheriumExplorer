let config = require('../../configs/config');
let Web3 = require('web3');

/**
 * blockchainManager
 * @type {{getTransactionsByAccount: (function(*=): *[])}}
 */
let blockchainManager = {
    /**
     * get transactions for account
     * @param address account address
     * @param limit limit rows
     * @param offset offset
     * @returns {Promise<*[]>}
     */
    getTransactionsByAccount : async function(address, limit, offset) {
        let result = null;
        let provider = await getProvider();

        //@todo: throw exception if limit is too high
        if (undefined === limit) {
            limit = 100;
        }

        if (undefined === offset) {
            offset = 0;
        }

        result = await getTransactionsByAccount(provider, address, limit, offset);

        return result;
    }
};

/**
 * Get Web3 Provider via configured provider
 * @returns {Promise<Web3>}
 */
async function getProvider() {
    const web3config = config.getConfig().web3;
    let provider = null;

    if ('ws' === web3config.provider) {
        provider = new Web3.providers.WebsocketProvider(web3config.address, {
            headers: {
                Origin: web3config.origin
            }
        });
    } else if ('rpc' === web3config.provider) {
        provider = new Web3.providers.HttpProvider(web3config.address);
    } else {
        console.error('no such provider for blockchain');
    }

    provider = new Web3(provider);

    //check that socket is open
    await provider.eth.net.isListening();

    return provider;
}

/**
 * Get transactions by account address
 *
 * @param provider
 * @param address
 * @param limit
 * @param offset
 * @returns {Promise<[]>}
 */
async function getTransactionsByAccount(provider, address, limit, offset) {
    let result = [];

    let endBlockNumber = await provider.eth.getBlockNumber();
    let startBlockNumber = 0;

    console.log("Searching for transactions to/from account \"" + address + "\" within blocks " + startBlockNumber + " and " + endBlockNumber);

    let totalItems = await provider.eth.getTransactionCount(address);

    for (let i = startBlockNumber; i <= endBlockNumber; i++) {
        //if already get all items, we don't need to check rest part of blockchain
        if (result.length >= limit ||
            result.length >= totalItems) {
            break;
        }

        if (i % 1000 === 0) {
            console.log("Searching block " + i);
        }
        let block = await provider.eth.getBlock(i, true);

        let foundItems = 0;
        // skip empty blocks
        if (block != null && block.transactions != null) {
            for (let transaction of block.transactions) {
                if (address.toLowerCase() === transaction.from.toLowerCase() ||
                    address.toLowerCase() === transaction.to.toLowerCase()) {

                    //@todo: very dirty pagination. is there any better functions?
                    //skips elements which don't need client
                    if (foundItems > offset) {
                        //@todo: use real DTO
                        let transactionDTO = {
                            'tx_hash': transaction.hash,
                            'nonce': transaction.nonce,
                            'blockHash': transaction.blockHash,
                            'blockNumber': transaction.blockNumber,
                            'transactionIndex': transaction.transactionIndex,
                            'from': transaction.from,
                            'to': transaction.to,
                            'value': transaction.value,
                            'time': block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString(),
                            'gasPrice': transaction.gasPrice,
                            'gas': transaction.gas,
                            'input': transaction.input
                        };
                        result.push(transactionDTO);
                    }
                    foundItems++;

                    //if already get all items, we don't need to check other transactions
                    if (result.length >= limit ||
                        result.length >= totalItems) {
                        break;
                    }
                }
            }
        }
    }
    console.log('length='+result.length);
    return {'list':result, 'total_count':totalItems};
}

module.exports = blockchainManager;