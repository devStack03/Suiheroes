const mongoose = require('mongoose')
const Coinflip = new mongoose.Schema(
    {
        player: {type: String, required: true},
        amount: {type: Number, required: true},
        select: {type: Number, required: true},
        result: {type: Boolean, required: true},
    },{
        timestamps: true,    
    }
)
module.exports = mongoose.model('coinflip', Coinflip)