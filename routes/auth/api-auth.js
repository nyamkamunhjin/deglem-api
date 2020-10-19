const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../../models/userSchema');
const addedSeconds = 60 * 60 * 24 * 7; // 7 days

router.get('/', (req, res) => {
  res.send('hello from auth');
});

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const user = {
      email: req.body.email,
    };
    console.log('/login', user);

    // calc expire date
    let expiresIn = new Date();

    expiresIn.setSeconds(expiresIn.getSeconds() + addedSeconds);

    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: addedSeconds,
    });

    return res.json({
      token,
      expires: expiresIn.toISOString(),
    });
  }
);

router.post('/register', async (req, res) => {
  try {
    const {
      userInfo: { password },
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let userData = req.body;
    userData.userInfo.password = hashedPassword;

    const user = new User(userData);
    user.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          successful: false,
          message: 'Failed.',
        });
      } else {
        return res.status(200).json({
          successful: true,
          message: 'Please confirm your email',
        });
      }
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ successful: false, message: err.message });
  }
});

// router.get(
//   '/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email'],
//   })
// );

// router.get(
//   '/google/redirect',
//   passport.authenticate('google', { session: false }),
//   async (req, res) => {
//     // return res.json({ token, userId: user.id, expires: expiresIn.toISOString });
//     try {
//       const user = req.user;
//       console.log('redirect: ', user, user.username === '');

//       if (user.username === '') {
//         res.redirect(
//           url.format({
//             pathname: keys.url.front_end + '/register',
//             query: user,
//           })
//         );
//       } else {
//         const user = {
//           id: req.user.id,
//           email: req.user.email,
//         };
//         // calc expire date
//         let expiresIn = new Date();
//         expiresIn.setSeconds(expiresIn.getSeconds() + addedSeconds);

//         const token = jwt.sign({ user }, process.env.JWT_SECRET, {
//           expiresIn: addedSeconds,
//         });

//         return res.json({ token, expires: expiresIn.toISOString() });
//       }
//     } catch (err) {
//       console.log(err);
//       res.json({ successful: false });
//     }
//   }
// );

module.exports = router;
