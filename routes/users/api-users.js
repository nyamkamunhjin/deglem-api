const router = require('express').Router();

const passport = require('passport');
const User = require('../../models/userSchema');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      console.log(req.user);

      res.status(200).json(req.user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        { $set: req.body },
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
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

module.exports = router;
