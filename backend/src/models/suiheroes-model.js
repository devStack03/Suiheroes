const mongoose = require('mongoose')
const Suiheroes = new mongoose.Schema(
    {
        totalBet: {type: Number, require: true, default: 0},
        totalBetAmount: {type: Number, require: true, default: 0},
        totalWin: {type: Number, require: true, default: 0},
        totalWinAmount: {type: Number, require: true, default: 0},
    },{
        timestamps: true
    }
)
module.exports = mongoose.model('suiheroes', Suiheroes)