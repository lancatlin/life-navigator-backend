import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import process from 'process';

const User = mongoose.model('User');

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send('You must be logged in.');
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).send('Invalid token.');
    }

    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
    return 0;
  });
  return 0;
};
