const ccxt = require ('ccxt')
const orderBook = require('../services/OrderBook');

exports.getOrderBookSell = async (exchange, pair) => {
    return await orderBook.getOrderBookSell(exchange, pair);
}

exports.getOrderBookBuy = async (exchange, pair) => {
    return await orderBook.getOrderBook(exchange, pair);
}

exports.getOrderBookSellAvg = async (exchange, pair) => {
    return await orderBook.getOrderBookSellAvg(exchange, pair);
}

exports.getOrderBookBuyAvg = async (exchange, pair) => {
    return await orderBook.getOrderBookBuyAvg(exchange, pair);
}