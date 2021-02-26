import mongoose from 'mongoose';

const Session = mongoose.model('Session');

export default (userId) => {
  return new Session({
    userId,
    name: 'default',
    time: new Array(24 * 7)
      .fill(0)
      .map((_, i) => (8 <= i % 24 && i % 24 < 22 ? 1 : 0)),
  });
};
