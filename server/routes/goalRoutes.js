import express from 'express';
import Goal from '../models/Goal';

const router = express.Router();

router.get('/goals', async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });
    res.send(goals);
  } catch (err) {
    res.status(422).send(err.messgae);
  }
});

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

router.put('/goals/:id', async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    res.send(goal);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/goals/:id', async (req, res) => {
  try {
    await Goal.deleteOne({ _id: req.params.id, userId: req.user._id });
    res.send('Success');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
