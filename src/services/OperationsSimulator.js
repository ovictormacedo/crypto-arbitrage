const pair = require('./Pair');

exports.calculatePathProfit = (path, direct, amount, seeOperations = false) => {
    if (path.firstPair.price > 0 && path.secondPair.price > 0 && direct.price > 0) {
        let cash = amount;
        if (path.firstPair.operation == 'buy')
            cash = cash/path.firstPair.price;
        else
            if (path.firstPair.operation == 'sell')
                cash = cash*path.firstPair.price;
    
        if (path.secondPair.operation == 'buy')
            cash = cash/path.secondPair.price;
        else
            if (path.secondPair.operation == 'sell')
                cash = cash*path.secondPair.price;
        
        let directCash = 0;
        if (direct.operation == 'buy')
            directCash = cash/direct.price;
        else
            if (direct.operation == 'sell')
                directCash = cash*direct.price;
        
        if (seeOperations) {
            return {
                    "operations": {
                        "first": {
                            "symbol": path.firstPair.symbol,
                            "operation": path.firstPair.operation,
                            "price": path.firstPair.price,
                            "exchange": path.firstPair.exchange,
                        },
                        "second": {
                            "symbol": path.secondPair.symbol,
                            "operation": path.secondPair.operation,
                            "price": path.secondPair.price,
                            "exchange": path.secondPair.exchange,
                        }
                    },
                    "cash": amount.toFixed(10), 
                    "simulated": directCash.toFixed(10),
                    "variation": (directCash.toFixed(10)/amount.toFixed(10)-1)*100
                };
        } else {
            return {
                "cash": amount.toFixed(10), 
                "simulated": directCash.toFixed(10),
                "variation": (directCash.toFixed(10)/amount.toFixed(10)-1)*100
            };
        }
    } else {
        if (seeOperations) {
            return {
                "operations": {
                    "first": {
                        "symbol": path.firstPair.symbol,
                        "operation": path.firstPair.operation,
                        "price": path.firstPair.price,
                        "exchange": path.firstPair.exchange,
                        
                    },
                    "second": {
                        "symbol": path.secondPair.symbol,
                        "operation": path.secondPair.operation,
                        "price": path.secondPair.price,
                        "exchange": path.secondPair.exchange,
                    }
                },
                "cash": amount.toFixed(10), 
                "simulated": -1
            };
        } else {
            return {
                "cash": amount.toFixed(10), 
                "simulated": -1
            };
        }
    }
}

exports.calculatePathProfits = (paths, pairs, amount, seeOperations = false) => {
    let response = [];
    let numPaths = paths.length;
    for (let i = 0; i < numPaths; i++) {
        let symbol = paths[i].secondPair.second+'/'+paths[i].firstPair.first;
        let operation = this.calculatePathProfit(paths[i], pairs[symbol], amount, seeOperations);
        if (operation.simulated >= amount)
            response.push(operation);
    }
    return response;
}

exports.calculateInterExchangeProfits = async (exchange1, exchange2) => {
    let response = [];

    let pairs1 = await pair.pairs(exchange1);
    let pairs2 = await pair.pairs(exchange2);

    let keys1 = Object.keys(pairs1);
    let numPairs1 = keys1.length;
    let keys2 = Object.keys(pairs2);
    let numPairs2 = keys2.length;

    for (let i = 0; i < numPairs1; i++)
        for (let j = 0; j < numPairs2; j++) {
            if (keys1[i] == keys2[j] 
                && pairs1[keys1[i]].price > 0
                && pairs2[keys2[j]].price > 0) {
                response[keys1[i]] = {
                    "from": exchange1.name,
                    "to": exchange2.name,
                    "priceFrom": pairs1[keys1[i]].price,
                    "priceTo": pairs2[keys2[j]].price,
                    "spread": pairs2[keys2[j]].price - pairs1[keys1[i]].price,
                    "variation": (pairs2[keys2[j]].price/pairs1[keys1[i]].price-1)*100
                }
            }
        }
    return response;
}