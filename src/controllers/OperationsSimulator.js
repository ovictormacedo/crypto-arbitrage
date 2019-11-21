const operationsSimulator = require('../services/OperationsSimulator');

exports.calculatePathProfit = async (path, direct, amount, seeOperations = false) => {
    return await operationsSimulator.calculatePathProfit(path, direct, amount, seeOperations);
}

exports.calculatePathProfits = async (paths, pairs, amount, seeOperations = false) => {
    return await operationsSimulator.calculatePathProfits(paths, pairs, amount, seeOperations);
}

exports.calculateInterExchangeProfits = async (exchange1, exchange2) => {
    return await operationsSimulator.calculateInterExchangeProfits(exchange1, exchange2);
}