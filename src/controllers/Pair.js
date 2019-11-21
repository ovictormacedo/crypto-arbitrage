const pair = require('../services/Pair')

exports.allPairs = async (exchange) => {
    return await pair.allPairs(exchange);
}

exports.generatePaths = (pairs) => {
    return pair.generatePaths(pairs);
}

exports.pairs = async (exchange) => {
    return await pair.allPairs(exchange);
}
