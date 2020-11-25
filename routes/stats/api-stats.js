const router = require('express').Router();

const passport = require('passport');
const { Diary } = require('../../models/diarySchema');
const statisticSchema = require('../../models/statisticSchema');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const stats = await statisticSchema.find({
        user: req.user._id,
      });

      console.log(stats);

      res.status(200).json(stats);
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // console.log(req.body);
      // check date
      const stats = await statisticSchema.findOne({
        user: req.user._id,
        weights: {
          $elemMatch: { date: req.body.date },
        },
      });
      console.log(stats);
      if (stats) {
        // update by date
        statisticSchema.findOneAndUpdate(
          {
            user: req.user._id,
            weights: {
              $elemMatch: { date: req.body.date },
            },
          },
          { $set: { 'weights.$.weight': req.body.weight } },
          {
            new: true,
          },
          (err, doc) => {
            if (err || !doc) console.log(err);
            else {
              res.status(200).json(doc);
            }
          }
        );
      } else {
        statisticSchema.findOneAndUpdate(
          {
            user: req.user._id,
          },
          { $push: { weights: req.body } },
          {
            new: true,
            upsert: true,
          },
          (err, doc) => {
            if (err || !doc) console.log(err);
            else {
              res.status(200).json(doc);
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

router.get(
  '/diary',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    /*
  GET ALL DIARIES OF A USER
  */
    try {
      const { _id: user_id } = req.user;
      // const range = parseInt(req.query.range, 10);

      // check if id is null
      if (!user_id) throw new Error('id query is null');

      const diaries = await Diary.find({
        user_id,
      });

      if (diaries !== undefined) res.status(200).json(diaries);
      // send error
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
      // throw err;
    }
  }
);

module.exports = router;
