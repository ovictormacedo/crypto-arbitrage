/**
 * Preferable currencies, i.e., the ones you have at your wallet
 */
exports.CURRENCIES = [
    "BTC",
    "ETH",
    "USDT",
    "USDC"
];

/**
 * API name at ccxt API's list
 * For example, the API v2 of HitBTC is named hitbtc2
 */
exports.EXCHANGES = [
    'binance',
    'poloniex',
    'hitbtc2',
];

/**
 * Credentials to access the exchanges above
 * use the names informed above
 */
exports.CREDENTIALS = {
    "hitbtc2": {
        "apiKey": "", 
        "apiSecret": ""
    },
    "poloniex": {
        "apiKey": "", 
        "apiSecret": ""
    },
    "binance": {
        "apiKey": "", 
        "apiSecret": ""
    }
};