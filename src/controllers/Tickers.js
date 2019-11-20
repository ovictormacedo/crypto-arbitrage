const tickers = require('../services/Tickers')

exports.getTickers = async (exchange) => {
    return await tickers.getTickers(exchange);
}

exports.getTicker = async (exchange, pair) => {
    return await tickers.getTicker(exchange, pair);
}