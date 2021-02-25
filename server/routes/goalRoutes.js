import express from 'express';
import mongoose from 'mongoose';

// const User = mongoose.model('User');
const Goal = mongoose.model('Goal');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, parent, expireAt, duration, frequency, eachTime } = req.body;

  console.log(req.user._id);

  const goal = new Goal({
    userId: req.user._id,
    createdAt: Date.now(),
    name,
    parent,
    expireAt,
    duration,
    frequency,
    eachTime,
  });

  try {
    await goal.save();
    return res.send(goal);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

export default router;
