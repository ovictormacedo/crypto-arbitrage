exports.getTickers = async (exchange) => {
    return await exchange.fetchTickers();
}

exports.getTicker = async (exchange, pair) => {
    return await exchange.fetchTickers(pair);
}