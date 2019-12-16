### how to  start:
* docker-compose up -d --build
* docker-compose exec web npm install
* docker-compose exec web npm start
* http://localhost:3030/account/get-transactions?limit=3&offset=1&address=0xbe43aefce0cfd39a94dff949951f9eb6ef7fb88c

### how to block chain

* docker network create ethexplorernetwork,
* docker-compose exec web npm start`,

### create account
* geth account new --datadir ~/work/chain

### create blockchain:
* geth -datadir ~/work/chain init ~/work/chain/genesis.json

### make transaction in blockchain
* personal.unlockAccount(eth.coinbase)
* eth.sendTransaction({from:eth.coinbase, to:'0x95c28a3539661b480fb90881506311ea27bd97f2', value: 80, gas: 100000})

### accounts in this example
* source: be43aefce0cfd39a94dff949951f9eb6ef7fb88c
* target: 80eefa215d0c7da81046df2862924877853389d5


