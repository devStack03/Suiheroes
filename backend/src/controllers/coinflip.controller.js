const CoinflipService = require("../services/coinflip.service")

class CoinflipController {
	putGame = async(req, res, next)=> {
		try{
			const result = await CoinflipService.putGame(req.body)
			res.send(result)
		}catch(err){
			next(err)
		}
	}

	getGames = async(req, res, next)=> {
		try{
			const result = await CoinflipService.getGames()
			res.send(result)
		}catch(err){
			next(err)
		}
	}
}

module.exports = new CoinflipController