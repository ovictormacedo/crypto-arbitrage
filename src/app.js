require('dotenv').config();
const ccxt = require ('ccxt')
const pair = require('./controllers/Pair');
const operationsSimulator = require('./controllers/OperationsSimulator');
const telegram = require('./util/Telegram');
const config = require('./config');
const fs = require('fs');

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

            //Set credentials
            exchange.apiKey = config.CREDENTIALS[exchanges[i]].apiKey;
            exchange.secret = config.CREDENTIALS[exchanges[i]].apiSecret;

            //Send messages to telegram
            pathProfits.forEach(async path => {
                if (path.variation >= process.env.MIN_PROFIT) {
                    let response = await telegram.sendMessage(JSON.stringify(path));
                    console.log("Alerting profits: "+response.status);
                }
            });
        } catch(exception) {
            console.log(exception);
            console.log(exchanges[i]+" not supported");
        }
    }
}

app();
setInterval(app, process.env.DELAY_MAIN);