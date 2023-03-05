const Books = require('../models/books')
const Trade = require('../models/trade')
const Rate = require('../models/rate')

const myPosts = async (req, res) => {
    try {
        const userId = req.user.userId
        const books = await Books.find({ createdBy: userId })
        res.status(200).json(books)
    } catch (error) {
        res.status(400).send(err)
    }

}

const allPosts = async (req, res) => {
    try {
        const books = await Books.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(400).send(err)
    }

}

const createPost = async (req, res) => {
    try {
        const userId = req.user.userId
        const books = new Books({ ...req.body, createdBy: userId })
        await books.save()
        res.status(200).json(books)
    } catch (error) {
        res.status(400).send(err)
    }

}

module.exports = {
    myPosts, allPosts,
    createPost
}