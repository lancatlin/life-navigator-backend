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

export default router;
