const ccxt = require ('ccxt')

exports.getMarkets = async (exchange) => {
    return await exchange.loadMarkets ();
};