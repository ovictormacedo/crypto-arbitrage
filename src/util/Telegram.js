const queryString = require('query-string');
const axios = require('axios');
require('dotenv').config();

const token = process.env.TOKEN;
const chatId = process.env.CHAT_ID;

exports.sendMessage = async (message = "") => {
    let toParse = {"chat_id": chatId, "text": message};
    const data = queryString.stringify(toParse);
    return await axios.get("https://api.telegram.org/bot"+token+"/sendMessage?"+data);
}

exports.alertProfit = async (profits) => {
    let resp = false;
    let numProfits = profits.length;
    for (let i = 0; i < numProfits; i++) {
        //Checks if the min profit was reached
        if (profits[i].variation > process.env.MIN_PROFIT) {
            //Send message to cellphone
            resp = await this.sendMessage(JSON.stringify(profits[i]))
                .then(resp => {return resp.status})
                .catch(resp => {return resp});
        }
    }
    return resp;
}