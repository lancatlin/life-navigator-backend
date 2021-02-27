import express from 'express';
import Session from '../models/Session';

const router = express.Router();

router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user._id });
    res.send(sessions);
  } catch (err) {
    res.status(422).send(err);
  }
});

router.post('/sessions', async (req, res) => {
  const { name, time } = req.body;
  try {
    const session = new Session({
      userId: req.user._id,
      name,
      time,
    });
    await session.save();
    res.send(session);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.put('/sessions/:id', async (req, res) => {
  try {
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    res.send(session);
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.delete('/sessions/:id', async (req, res) => {
  try {
    const { deletedCount } = await Session.deleteOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    res.send({ deletedCount });
  } catch (err) {
    res.status(422).send(err.message);
  }
});

export default router;
