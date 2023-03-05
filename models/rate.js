const mongoose = require('mongoose')

const RateSchema = new mongoose.Schema({
    originalUser:{
        name:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        }

    },
    currentUser :{
        name:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        }
    },

    bookname:{
        type:String,
        required:true

    },
    rating:{
        type:Number,
        default:0,
    },

    tradedBook:{
        type:String,
        required:true

    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Rate', RateSchema)
