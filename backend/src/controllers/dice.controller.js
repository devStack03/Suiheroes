const DiceService = require("../services/dice.service")

class DiceController {
    putGame = async(req, res, next) => {
        try{
            const result = await DiceService.putGame(req.body)
            res.send(result)
        }catch(err){
            next(err)
        }
    }

    getGames = async(req, res, next) => {
        try{
            const result = await DiceService.getGames()
            res.send(result)
        }catch(err){
            next(err)
        }
    }
}

module.exports = new DiceController