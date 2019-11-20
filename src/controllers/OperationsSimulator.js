const operationsSimulator = require('../services/OperationsSimulator');

exports.calculatePathProfit = (path, direct, amount, seeOperations = false) => {
    return operationsSimulator.calculatePathProfit(path, direct, amount, seeOperations);
}

exports.calculatePathProfits = (paths, pairs, amount, seeOperations = false) => {
    return operationsSimulator.calculatePathProfits(paths, pairs, amount, seeOperations);
}