const mongoose = require('mongoose')
const Dice = new mongoose.Schema(
    {
        player: {type: String, required: true},
        amount: {type: Number, required: true},
        select: {type: Number, required: true},
        dice1: {type: Number, required: true},
        dice2: {type: Number, required: true},
    },{
        timestamps: true,
        virtuals: {
            result:{
                get(){
                    return (this.select==0 && this.dice1>this.dice2) || (this.select==1 && this.dice1==this.dice2) || (this.select==2 && this.dice1<this.dice2)
                }
            }
        }
    }
)
module.exports = mongoose.model('dice', Dice)