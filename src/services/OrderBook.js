var ccxt = require ('ccxt')

exports.getOrderBook = async (exchange, pair, limit = 10000) => {
    return await exchange.fetchOrderBook (pair, limit);
}

exports.getOrderBookBuy = async (exchange, pair) => {
    let book = await this.getOrderBook(exchange, pair);
    return book.asks;
}

exports.getOrderBookSell = async (exchange, pair) => {
    let book = await this.getOrderBook(exchange, pair);
    return book.bids;
}

exports.getOrderBookSellAvg = async (exchange, pair) => {
    let book = await this.getOrderBookSell(exchange, pair);
    let num = parseInt(book.length*0.4);
    let sum = 0;
    //Calculates the average price based on the first 40% of the orders
    for (let i = 0; i < num; i++) {
        sum += book[i][0]*1;
    }
    return (sum/num).toFixed(10);
}

exports.getOrderBookBuyAvg = async (exchange, pair) => {
    let book = await this.getOrderBookBuy(exchange, pair);
    let num = parseInt(book.length*0.4);
    let sum = 0;
    //Calculates the average price based on the first 40% of the orders
    for (let i = 0; i < num; i++) {
        sum += book[i][0]*1;
    }
    return (sum/num).toFixed(10);
}