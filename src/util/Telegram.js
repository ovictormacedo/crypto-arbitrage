const queryString = require('query-string');
const axios = require('axios');
require('dotenv').config();
const config = require("../config");

const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;

exports.sendMessage = async (message = "") => {
    let toParse = {"chat_id": chatId, "text": message};
    const data = queryString.stringify(toParse);
    return await axios.get("https://api.telegram.org/bot"+token+"/sendMessage?"+data);
};