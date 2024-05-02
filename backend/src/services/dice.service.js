const PlayerService = require('./player.service')
const Dice = require('../models/dice-model')

class DiceService{
    constructor(){
    }

    static async putGame(rawData){
        try{
            const dice = new Dice(rawData)
            await dice.save()
            await PlayerService.updatePlayerDataAfterOneGame({address: dice.player, amount: dice.amount, result: dice.result})
            return {response: true, message: "Success!"}
        }catch(err){
            console.log(err)
            return {response: false, message: err.message}
        }
    }

    static async getGames(){
        try{
            let data = await Dice.find().limit(10)
            return {response: true, data: data}
        }catch(err){
            console.log(err)
            return {response: false, message: err.message}
        }
    }
}

module.exports = DiceService