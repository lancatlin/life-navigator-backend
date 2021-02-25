import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send(req.user.email);
});

export default router;
