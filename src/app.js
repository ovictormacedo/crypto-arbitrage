require('dotenv').config();
const ccxt = require ('ccxt')
const pair = require('./controllers/Pair');
const operationsSimulator = require('./controllers/OperationsSimulator');
const config = require('./config');

async function app () {
    let exchanges = ccxt.exchanges;
    exchanges = config.EXCHANGES;
    let numExchanges = exchanges.length;
    for (let i = 0; i < numExchanges; i++) {
        try {
            console.log("Scanning "+exchanges[i]);
            let exchange = eval("new ccxt."+exchanges[i]+"();");
            await exchange.loadMarkets().catch(error => console.log(error));
            let pairs = await pair.allPairs(exchange, exchanges[i]);
            let paths = pair.generatePaths(pairs);
            let pathProfits = await operationsSimulator.calculatePathProfits(paths, pairs, 1000, true);
        } catch(exception) {
            console.log(exception);
            console.log(exchanges[i]+" not supported");
        }
    }
}

app();
setInterval(app, process.env.DELAY_MAIN);