const Books = require('../models/books')
const Trade = require('../models/trade')
const Rate = require('../models/rate')

const tradebooks = async (req, res) => {
    try {
        const trade = {}
        const { wantsId, offersId } = req.params
        const wantBook = await Books.findById(wantsId)
        const wantUser = await User.findById({ _id: wantBook.createdBy })
        const offerBook = await Books.findById(offersId)
        const offerUser = await User.findById({ _id: offer.createdBy })

        trade.want.name = wantBook.name
        trade.offer.name = offerBook.name
        trade.wantedUser.name = wantUser.name
        trade.wantedUser.email = wantUser.email
        trade.eantedUser.userId = wantUser._id
        trade.offeringUser.name = offerUser.name
        trade.offeringUser.email = offerUser.email
        trade.offeringUser.userId = offerUser._id
        trade.accepted = false

        const tradeBook = new Trade(trade)
        await tradeBook.save()
    } catch (error) {
        res.status(400).send(err)
    }
}

const acceptTrade = async (req, res) => {
    try {
        const id = req.params.id
        const trade = await Trade.findById({ _id: id })
        trade.accepted = true

        const book = {}
        book.originalUser.name = trade.wantedUser.name
        book.originalUser.userId = trade.wantedUser.userId
        book.currentUser.name = trade.offeringUser.name
        book.currentUser.userId = trade.offeringUser.userId
        book.bookname = trade.want.name
        book.tradedBook = trade.offer.name

        const rate =new Rate(book)

        await trade.save()
        await rate.save()



    } catch (err) {
        res.status(400).send(err)
    }
}

const declineTrade = async (req, res) => {
    try {
        const id = req.params.id
        await Trade.remove({ _id: id })

    } catch (err) {
        res.status(400).send(err)
    }
}

const rateBooks = async(req,res)=>{
    try {
        const bookId = req.params.bookId
        const rating = req.body.rate
        const book = await Rate.findById({_id:bookId})
        book.rating = rating
        await book.save()
        
    } catch (err) {
        res.status(400).send(err)
    }
}

const toRate = async(req,res)=>{
    try {
        const id = req.user.userId
        const rate = Rate.find({"currentUser.userId":id})
        // const rates = Rate.find({currentUser:{$elemMatch:{userId:id}}})
        
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = {
    tradebooks,acceptTrade, declineTrade,rateBooks,toRate
}