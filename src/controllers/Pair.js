const pair = require('../services/Pair')

exports.allPairs = async (exchange, exchangeId) => {
    return await pair.allPairs(exchange, exchangeId);
}

exports.generatePaths = (pairs) => {
    return pair.generatePaths(pairs);
}

exports.pairs = async (exchange, exchangeId) => {
    return await pair.allPairs(exchange, exchangeId);
}
