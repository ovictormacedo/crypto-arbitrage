const operationsSimulator = require('../services/OperationsSimulator');
const dal = require('../DAL/PathDAL');
require('dotenv').config();
const telegram = require('../util/Telegram');

exports.calculatePathProfit = async (path, direct, amount, seeOperations = false) => {
    return await operationsSimulator.calculatePathProfit(path, direct, amount, seeOperations);
}

exports.calculatePathProfits = async (paths, pairs, amount, seeOperations = false) => {
    let pathProfits = await operationsSimulator.calculatePathProfits(paths, pairs, amount, seeOperations);
    //Store on database profitable paths
    pathProfits.forEach(async path => {
        if (path.variation >= process.env.MIN_PROFIT) {
            dal.insertPath(path);
        }
    });

    //Send messages to telegram
    if (process.env.SEND_PATHS_TELEGRAM == "true") {
        pathProfits.forEach(async path => {
            if (path.variation >= process.env.MIN_PROFIT) {
                let response = await telegram.sendMessage(JSON.stringify(path));
                console.log("Alerting profits: "+response.status);
            }
        });
    }

    return pathProfits;
}

exports.calculateInterExchangeProfits = async (exchange1, exchange2) => {
    return await operationsSimulator.calculateInterExchangeProfits(exchange1, exchange2);
}