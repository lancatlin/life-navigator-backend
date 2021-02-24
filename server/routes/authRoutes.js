import express from 'express'
import mongoose from 'mongoose'

const User = mongoose.model('User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)

  try {
    const user = new User({ email, password })
    await user.save()
    console.log(`Create user ${user}`)
    res.send('Success')
  } catch (err) {
    res.status(422).send(err.message)
  }
})

export default router
