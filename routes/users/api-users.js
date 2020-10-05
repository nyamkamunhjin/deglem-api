const router = require('express').Router();
const moment = require('moment');

const passport = require('passport');
const { Diary } = require('../../models/diarySchema');

router.get('/', (req, res) => {
  res.send('hello from users');
});

router.get(
  '/dailylog',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    /*
  GET ALL DIARIES OF A USER

  */
    try {
      const { date } = req.query;
      const { _id: user_id } = req.user;
      const range = parseInt(req.query.range, 10);
      console.log(req.query);
      // check if id is null
      if (!user_id) throw new Error('id query is null');

      const diaries = await Diary.find({
        user_id,
        date: {
          $gte: moment(new Date(date)).add(-range, 'days').format('YYYY-MM-DD'),
          $lt: moment(new Date(date)).add(range, 'days').format('YYYY-MM-DD'),
        },
      })
        .populate({
          path: 'breakfast',
          populate: {
            path: 'food',
            model: 'Food',
          },
        })
        .populate({
          path: 'lunch',
          populate: {
            path: 'food',
            model: 'Food',
          },
        })
        .populate({
          path: 'dinner',
          populate: {
            path: 'food',
            model: 'Food',
          },
        })
        .populate({
          path: 'snacks',
          populate: {
            path: 'food',
            model: 'Food',
          },
        })
        .exec();

      if (diaries !== undefined) res.status(200).json(diaries);
      // send error
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
      // throw err;
    }
  }
);

router.post(
  '/dailylog/food/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    /* 
  INSERT NEW FOOD
  1. find user by id 
  2. check if the day's diary exists else create new diary 
  3. add the food to a diary by id
  */
    try {
      console.log(req.user);
      console.log({ user_id: req.user._id });

      Diary.findOneAndUpdate(
        {
          user_id: req.user._id,
          date: req.body.diary.date,
        },
        {
          date: req.body.diary.date,
          user_id: req.user._id,
          $push: req.body.diary.push,
        },
        { new: true, upsert: true },
        (err, doc) => {
          if (err || !doc) console.log(err);
          else {
            console.log('doc successfully updated');
            res
              .status(200)
              .json({ success: true, message: 'doc successfully updated.' });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

router.put(
  '/dailylog/food/update',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    /*
  UPDATE FOOD SERVING 
  */
    try {
      console.log(req.body);

      Diary.findOneAndUpdate(
        req.body.filter,
        {
          $set: req.body.update,
        },
        (err, doc) => {
          if (err || !doc) console.log(err);
          else {
            res.status(200).json({
              success: true,
              message: 'diary food successfully updated.',
            });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

router.delete(
  '/dailylog/food/delete',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    /*
  REMOVE LOGGED FOOD 
  */
    try {
      const { name, _id } = req.query;
      console.log(req.query);

      let filter = {};
      let data = {};

      filter[`${name.toLowerCase()}._id`] = _id;
      data[name.toLowerCase()] = {
        _id: _id,
      };

      console.log(data);

      Diary.update(
        filter,
        {
          $pull: data,
        },
        (err, doc) => {
          if (err || !doc) console.log(err);
          else {
            console.log(doc);
            res.status(200).json({
              success: true,
              message: 'diary food successfully removed.',
            });
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
