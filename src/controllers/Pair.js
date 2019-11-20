const pair = require('../services/Pair')

exports.allPairs = async (symbols, exchange) => {
    return await pair.allPairs(symbols, exchange);
}

exports.generatePaths = (pairs) => {
    return pair.generatePaths(pairs);
}