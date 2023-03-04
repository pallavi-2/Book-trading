const express = require('express')
const app = express()

require('dotenv').config()

const connectDB = require('./database/connectdb')
const auth = require('./authentication/auth')
const authRouter = require('./routes/auth')
const bookPosts = require('./routes/bookposts')

app.use(express.json())

app.use(authRouter)
app.use(auth, bookPosts)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(5000, () => console.log("Server running on port 5000"))
    } catch (err) {
        console.log(err)
    }
}

start()