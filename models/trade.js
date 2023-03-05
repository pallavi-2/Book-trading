const mongoose = require('mongoose')

const TradeSchema = new mongoose.Schema({
    offer:{
        name:{
            type:String,
            required:true
        },
    },
    want:{
        name:{
            type:String,
            required:true
        },
    },
    offeringUser:{
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        }
    },
    wantedUser:{
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        }
    },
    accepted:{
        type:Boolean,
        required:true 
    }

})

module.exports = mongoose.model('Trade', TradeSchema);