const User = require('../models/user')

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(400).send("Please fill all the details")
        }

        const user = new User(req.body)

        const usedEmail = await User.findOne({ email })
        if (usedEmail) {
            res.status(400).send("Email already in use")
        }

        await user.save()
        const token = await user.createJWT()
        res.status(200).json({ user: user.name, token })


    } catch (error) {
        res.status(400).send(err)
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).send("Please fill all the details")
        }

        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).send("The email doesn't exist")
        }

        const isMatch = user.comparePassword(password)
        if (!isMatch) {
            res.status(400).send("Incorrect password")
        }

        const token = await user.createJWT()
        res.status(200).json({ user: { name: user.name }, token })

    } catch (error) {
        res.status(400).send(err)
    }

}

module.exports = {
    signup,
    login
}