const mongoose = require('mongoose')
const Player = new mongoose.Schema(
    {
        address: {type: String, required: true},
        totalBet: {type: Number, default: 0},
        totalWin: {type: Number, default: 0},
        totalBetAmount: {type: Number, default: 0},
        totalWinAmount: {type: Number, default: 0},
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model('player', Player)
