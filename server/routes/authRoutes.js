import express from 'express'
import mongoose from 'mongoose'
import process from 'process'
import jwt from 'jsonwebtoken'

const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)

  try {
    const user = new User({ email, password })
    await user.save()
    console.log(`Create user ${user}`)
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
    res.send({ token })
  } catch (err) {
    res.status(422).send(err.message)
  }
})

export default router
