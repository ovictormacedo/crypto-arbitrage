var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Schema = new Schema({
    operations: {
      first: {
        symbol: String,
        operation: String,
        price: Number,
        exchange: String,
        from: String,
        to: String
      },
      second: {
        symbol: String,
        operation: String,
        price: Number,
        exchange: String,
        from: String,
        to: String
      },
      third: {
        symbol: String,
        operation: String,
        price: Number,
        exchange: String,
        from: String,
        to: String
      }
    },
    cash: Number,
    simulated: Number,
    variation: Number,
    status: String,
    date: Date
  }, { collection: 'path' });

var Path = mongoose.model('path', Schema);

module.exports = Path;