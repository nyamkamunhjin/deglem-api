const router = require('express').Router();

const passport = require('passport');
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

// get net average calorie intake

module.exports = router;
