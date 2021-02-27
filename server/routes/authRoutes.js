import express from 'express';
import process from 'process';
import jwt from 'jsonwebtoken';
import { defaultSession } from '../models/Session';
import User from '../models/User';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = new User({ email, password });
    await user.save();
    const session = defaultSession(user._id);
    await session.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.send({ token });
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).send('Email and password is required.');
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(422).send('Invalid email or password.');
    return;
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
    res.send({ token });
  } catch (err) {
    res.status(422).send('Invalid email or password.');
  }
});

export default router;
