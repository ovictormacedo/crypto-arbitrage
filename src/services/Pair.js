const ticker = require('./Tickers');
const config = require('../config');

exports.allPairs = async (exchange, exchangeId) => {
    var pairs = {};
    let symbols = exchange.symbols;
    let numSymbols = symbols.length;
    let tickers = await ticker.getTickers(exchange);
    for (let i = 0; i < numSymbols; i++) {
        let aux = symbols[i].split("/");
        //Store the pair and operation 
        pairs[aux[0]+'/'+aux[1]] = {
            symbol: symbols[i],
            base: aux[0],
            quote: aux[1],
            first: aux[0],
            second: aux[1],
            operation: 'sell',
            price: tickers[symbols[i]].bid,
            exchange: exchangeId,
        };//Store the inverted pair and operation 
        pairs[aux[1]+'/'+aux[0]] = {
            symbol: symbols[i],
            base: aux[0],
            quote: aux[1],
            first: aux[1],
            second: aux[0],
            operation: 'buy',
            price: tickers[symbols[i]].ask,
            exchange: exchangeId,
        };
    }
    return pairs;
}

exports.generatePaths = (pairs) => {
    let newPairs = [];
    let keys = Object.keys(pairs);
    let numPairs = keys.length;

    for (let i = 0; i < numPairs; i++) {
        for (let j = 0; j < numPairs; j++) {
            //Check if the list of preferred currencies contains the currency
            if (!config.CURRENCIES.includes(pairs[keys[i]].first))
                break;
                
            //Checks if the two pairs are transitive (it must be)
            if (pairs[keys[i]].second == pairs[keys[j]].first 
                //Checks if the pairs are not symmetric (it must not to be)
                && pairs[keys[i]].first != pairs[keys[j]].second 
                /*Checks if there is a pair connecting the first currency of the first pair
                and the last currency of the second pair*/
                && pairs.hasOwnProperty(pairs[keys[i]].first+'/'+pairs[keys[j]].second)) {
                    newPairs.push({
                        firstPair: pairs[keys[i]],
                        secondPair: pairs[keys[j]],
                    });
                }
        }
    }
    return newPairs;
}

exports.pairs = async (exchange, exchangeId) => {
    var pairs = {};
    let symbols = exchange.symbols;
    let numSymbols = symbols.length;
    let tickers = await ticker.getTickers(exchange);
    for (let i = 0; i < numSymbols; i++) {
        let aux = symbols[i].split("/");
        //Store the pair and operation 
        pairs[aux[0]+'/'+aux[1]] = {
            symbol: symbols[i],
            base: aux[0],
            quote: aux[1],
            first: aux[0],
            second: aux[1],
            operation: 'sell',
            price: tickers[symbols[i]].bid,
            exchange: exchangeId,
        };
    }
    return pairs;
}
