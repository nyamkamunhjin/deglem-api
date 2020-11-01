const router = require('express').Router();
const passport = require('passport');
const Food = require('../../models/foodSchema');

// router.get('/', (req, res) => {
//   res.status(200).send('hello from api');
// });

// create
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const food = new Food({
        ...req.body,
        creator: req.user._id,
      });

      return food.validate((err) => {
        if (err) {
          console.log(err);
          // throw err;
        } else {
          food.save((err) => {
            if (err) throw new Error('food validation failed.');
            else {
              res
                .status(200)
                .json({ success: true, message: 'food added to database.' });
            }
          });
        }
      });
    } catch (err) {
      res.status(409).json({ success: false, message: err.message });

      throw err;
    }
  }
);

// read
// router.get('/', async (req, res) => {
//   try {
//     const foods = await Food.find({});
//     res.status(200).json(foods);
//   } catch (err) {
//     throw err;
//   }
// });

// read by barcode
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { barcode } = req.query;

      console.log(barcode);
      if (!barcode) throw new Error('barcode required.');

      const food = await Food.findOne({ barcode }).exec();
      if (food === null) throw new Error('product not found');
      res.status(200).json(food);
    } catch (err) {
      res.status(409).json({ message: err.message });

      throw err;
    }
  }
);

router.put(
  '/update/:barcode',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { barcode } = req.params;
      console.log(barcode);
      if (!barcode) throw new Error('barcode required.');

      const food = await Food.findOneAndUpdate({ barcode }, req.body, {
        new: true,
      });

      res.status(200).json(food);
    } catch (err) {
      res.status(409).json({ message: err.message });

      throw err;
    }
  }
);

// searching foods

router.get(
  '/search',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { query } = req.query;
      const limit = parseInt(req.query.limit, 10);

      const search = await Food.aggregate()
        .search({
          regex: {
            query: `${query}.*`,
            path: 'name',
            allowAnalyzedField: true,
          },
        })
        .project({ document: '$$ROOT', name_length: { $strLenCP: '$name' } })
        .sort({ name_length: 1 })
        .project({ name_length: 0 })
        .limit(limit);
      console.log(search);

      // const search = await Food.find({
      //   name: new RegExp(`^${query}`, 'i'),

      // })

      res.status(200).json(search);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
    }
  }
);

// router.get(
//   '/search',
//   passport.authenticate('jwt', { session: false }),
//   async (req, res) => {
//     try {
//       const { query } = req.query;
//       const limit = parseInt(req.query.limit, 10);

//       const search = await Food.aggregate()
//         .search({
//           // regex: {
//           //   query: `${query}.*`,
//           //   path: 'name',
//           //   allowAnalyzedField: true,
//           // },
//           text: {
//             query: query,
//             path: 'name',
//           },
//         })
//         .project({ document: '$$ROOT', name_length: { $strLenCP: '$name' } })
//         .sort({ name_length: 1 })
//         .project({ name_length: 0 })
//         .limit(limit);

//       res.status(200).json(search);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//       console.log(err);
//     }
//   }
// );
module.exports = router;
