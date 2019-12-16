let config = {
  'getConfig' : function() {
      return {
          'web3' : {
              'provider' : 'ws', //ws, rpc
              'address' : 'ws://geth:8546', //ws://ip:8536, https://yourip.com
              'origin' : 'test'
          }
      };
  }
};

module.exports = config;