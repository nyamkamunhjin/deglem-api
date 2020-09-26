const router = require('express').Router();
const { Types } = require('mongoose');
const { formatDate } = require('../../functions/functions');
const { Diary, SingleFood } = require('../../models/diarySchema');
const userSchema = require('../../models/userSchema');
const User = require('../../models/userSchema');

router.get('/', (req, res) => {
  res.send('hello from users');
});

router.get('/dailylog', async (req, res) => {
  /*
  GET ALL DIARIES OF A USER

  */
  try {
    const { id } = req.query;

    // check if id is null
    if (!id) throw new Error('id query is null');

    // find user by id and populate daily log
    const user = await User.findOne({ _id: id })
      .populate({
        path: 'dailyLog',
        populate: {
          path: 'breakfast',
          populate: {
            path: 'food',
            model: 'Food',
          },
        },
      })
      .populate({
        path: 'dailyLog',
        populate: {
          path: 'lunch',
          populate: {
            path: 'food',
            model: 'Food',
          },
        },
      })
      .populate({
        path: 'dailyLog',
        populate: {
          path: 'dinner',
          populate: {
            path: 'food',
            model: 'Food',
          },
        },
      })
      .populate({
        path: 'dailyLog',
        populate: {
          path: 'snacks',
          populate: {
            path: 'food',
            model: 'Food',
          },
        },
      })
      .exec();
    if (user.dailyLog !== undefined) res.status(200).json(user.dailyLog);
    console.log(user);
    // send error
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/dailylog/food/add', async (req, res) => {
  /* 
  INSERT NEW FOOD
  1. find user by id 
  2. check if the day's diary exists else create new diary 
  3. add the food to a diary by id
  */
  try {
    console.log({ user_id: req.body.user_id });

    Diary.findOneAndUpdate(
      {
        user_id: req.body.user_id,
        date: req.body.diary.date,
      },
      {
        date: req.body.diary.date,
        user_id: req.body.user_id,
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
});

router.put('/dailylog/food/update', async (req, res) => {
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
          console.log(doc);
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
});

router.delete('/dailylog/food/delete', async (req, res) => {
  /*
  REMOVE LOGGED FOOD 
  */
  try {
    Diary.updateOne(
      {
        $pull: req.body.pull,
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
});

module.exports = router;
