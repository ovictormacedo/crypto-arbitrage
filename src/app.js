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

    // for (let i = 0; i < numExchanges; i++)
    //     for (let j = 0; j < numExchanges; j++) {
    //         if (!notSupportedExchanges.includes(exchanges[i]) 
    //             && !notSupportedExchanges.includes(exchanges[j])) {
    //             try {
    //                 if (i != j) {
    //                     console.log("Scanning "+exchanges[i]);
    //                     console.log("Scanning "+exchanges[j]);

    //                     let exchange1 = eval("new ccxt."+exchanges[i]+"();");
    //                     let exchange2 = eval("new ccxt."+exchanges[j]+"();");
                        
    //                     await exchange1.loadMarkets().catch(error => console.log(error));
    //                     await exchange2.loadMarkets().catch(error => console.log(error));
                        
    //                     let profits = await operationsSimulator.calculateInterExchangeProfits(exchange1, exchange2);
    //                     //console.log("Alerting profits: "+await telegram.alertProfit(profits));
    //                 }
    //             } catch(exception) {
    //                 console.log(exchanges[i]+" not supported");
    //             }
    //         }
    //     }
}

app();
setInterval(app, process.env.DELAY_MAIN);