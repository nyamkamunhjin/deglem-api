const router = require('express').Router();
const User = require('../../models/userSchema');

router.get('/', (req, res) => {
  res.send('hello from users');
});

router.get('/dailylog', async (req, res) => {
  try {
    const { id } = req.query;
    
    // check if id is null
    if (!id) throw new Error('id query is null');

    // find user by id and populate daily log
    const user = await User.findOne({ _id: '5f607f85a586e00e416f2124' })
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
    // send error
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
