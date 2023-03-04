const Books = require('../models/books')
const Trade = require('../models/trade')

const myPosts = async (req,res)=>{
    try {
        const userId = req.user.userId
        const books = await Books.find({createdBy:userId})
        res.status(200).json(books)
    } catch (error) {
        res.status(400).send(err)
    }

}

const allPosts = async (req,res)=>{
    try {
        const books = await Books.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(400).send(err)
    }

}

const createPost = async (req,res)=>{
    try {
        const userId = req.user.userId
        const books = new Books({...req.body,createdBy:userId})
        await books.save()
        res.status(200).json(books)
    } catch (error) {
        res.status(400).send(err)
    }

}

const tradebooks = async(req,res)=>{
    try {
        const trade ={}
        const {wantsId, offersId} = req.params
        const wantBook = await Books.findById(wantsId)
        const wantUser = await User.findById({_id:wantBook.createdBy})
        const offerBook = await Books.findById(offersId)
        const offerUser = await User.findById({_id:offer.createdBy})
        trade.want.name =wantBook.name
        trade.offer.name =offerBook.name
        trade.wantedUser.name =wantUser.name
        trade.wantedUser.email =wantUser.email
        trade.offeringUser.name =offerUser.name
        trade.offeringUser.email =offerUser.email
        trade.accepted = false

        const tradeBook = new Trade(trade)
        await tradeBook.save()
    } catch (error) {
        res.status(400).send(err)
    }
}

const acceptTrade = async(req,res)=>{
     try{
        const id = req.params.id
        const trade = await Trade.findById({_id:id})
        trade.accepted= true
        await trade.save()

     }catch(err){
        res.status(400).send(err)
     }
}

const declineTrade = async(req,res)=>{
    try{
       const id = req.params.id
       await Trade.remove({_id:id})

    }catch(err){
       res.status(400).send(err)
    }
}

module.exports = {myPosts,allPosts,
                    createPost,tradebooks,
                acceptTrade,declineTrade}