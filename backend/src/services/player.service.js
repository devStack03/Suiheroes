const Player = require("../models/player-model")

class PlayerService{
    constructor(){
    }

    static async updatePlayerDataAfterOneGame(rawData){
        try{
            console.log(rawData)
            let player = await Player.findOne({address: rawData.address})
            if(player==null) player = new Player({address: rawData.address})
            player.totalBet++;
            player.totalBetAmount+=rawData.amount
            if(rawData.result){
                player.totalWin++;
                player.totalWinAmount+=rawData.amount
            }
            await player.save()            
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = PlayerService