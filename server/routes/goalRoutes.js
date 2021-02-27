import express from 'express';
import Goal from '../models/Goal';

const router = express.Router();

router.post('/goals', async (req, res) => {
  const { name, sessionId, expireAt, duration, frequency, eachTime } = req.body;

  const goal = new Goal({
    userId: req.user._id,
    sessionId,
    name,
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
