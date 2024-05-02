const PlayerService = require('./player.service')
const Coinflip = require('../models/coinflip-model')

class CoinflipService{
	constructor(){
	}

	static async putGame(rawData){
		try{
			const coinflip = new Coinflip(rawData)
			await coinflip.save()
			await PlayerService.updatePlayerDataAfterOneGame({address: rawData.player, amount: rawData.amount, result: rawData.result})
			return {response: true, message: "Success!"}
		}catch(err){
			console.log(err)
			return {response: false, message: err.message}
		}
	}

	static async getGames(){
		try{
			let data = await Coinflip.find().sort({"createdAt":"desc"}).limit(10)
			return {response: true, data: data}
		}catch(err){
			console.log(err)
			return {response: false, message: err.message}
		}
	}
}

module.exports = CoinflipService