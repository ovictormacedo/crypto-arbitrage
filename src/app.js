require('dotenv').config();
const ccxt = require ('ccxt')
const pair = require('./controllers/Pair');
const operationsSimulator = require('./controllers/OperationsSimulator');
const telegram = require('./util/Telegram');
const ticker = require('./controllers/Tickers');

async function app () {
    let exchanges = ccxt.exchanges;
    exchanges = [
        'bitfinex', 'binance', 'coinbase',
        'poloniex'
    ];
    let numExchanges = exchanges.length;
    let notSupportedExchanges = [
        '_1btcxe',       'adara',      'allcoin',
        'anxpro',        'bcex',       'bibox',
        'bit2c',         'bitbank',    'bitbay',
        'bitfinex',      'bitfinex2',  'bitflyer',
        'bitforex',      'bitso',      'bitstamp',
        'bitstamp1',     'bl3p',       'btcalpha',
        'btcbox',        'btcchina',   'btcmarkets',
        'btctradeim',    'btctradeua', 'buda',
        'chilebit',      'coinbase',   'coinbaseprime',
        'coinbasepro',   'coincheck',  'coinegg',
        'coinexchange',  'coinfloor',  'coingi',
        'coinmarketcap', 'coinmate',   'coinone',
        'coinspot',      'cointiger',  'coolcoin',
        'crex24',        'deribit',    'digifinex',
        'dsx',           'dx',         'fcoin',
        'fcoinjp',       'flowbtc',    'foxbit',
        'fybse',         'gemini',     'huobipro',
        'huobiru',       'ice3x',      'independentreserve',
        'indodax',       'itbit',      'kraken',
        'lbank',         'lykke',      'mandala',
        'mercado',       'mixcoins',   'negociecoins',
        'okcoincny',     'okex',       'okex3',
        'paymium',       'rightbtc',   'southxchange',
        'stronghold',    'surbitcoin', 'theocean',
        'tidex',         'vaultoro',   'vbtc',
        'virwox',        'whitebit',   'xbtce',
        'yobit',         'zaif'
    ];
    for (let i = 0; i < numExchanges; i++) {
        if (!notSupportedExchanges.includes(exchanges[i])) {
            try {
                console.log("Scanning "+exchanges[i]);
                let exchange = eval("new ccxt."+exchanges[i]+"();");
                await exchange.loadMarkets().catch(error => console.log(error));
                let symbols = exchange.symbols;
            
                let pairs = await pair.allPairs(symbols, exchange);
                let paths = pair.generatePaths(pairs);
                let pathProfits = operationsSimulator.calculatePathProfits(paths, pairs, 1000, true);
                console.log("Alerting profits: "+await telegram.alertProfit(pathProfits));
            } catch(exception) {
                console.log(exchanges[i]+" not supported");
            }
        }
    }
}

app();
setInterval(app, process.env.DELAY_MAIN);