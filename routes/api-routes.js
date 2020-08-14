const router = require('express').Router();
const Food = require('../models/foodSchema');

router.get('/', (req, res) => {
  res.status(200).send('hello from api');
});

// create
router.post('/add', async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();

    res.status(200).json(food);
  } catch (err) {
    res.status(409).json(err);
    throw err;
  }
});

// read
router.get('/foods/', async (req, res) => {
  try {
    const foods = await Food.find({});
    res.status(200).json(foods);
  } catch (err) {
    throw err;
  }
});

// read by barcode
router.get('/foods/:barcode', async (req, res) => {
  try {
    const { barcode } = req.params;
    const food = await Food.findOne({ barcode }).exec();
    if (food === null) throw new Error('product not found');
    res.status(200).json(food);
  } catch (err) {
    res.status(409).json({ message: err.message });

    throw err;
  }
});

router.put('/update/:barcode', async (req, res) => {
  try {
    const { barcode } = req.params;

    const food = await Food.findOneAndUpdate({ barcode }, req.body, {
      new: true,
    });

    res.status(200).json(food);
  } catch (err) {
    res.status(409).json({ message: err.message });

    throw err;
  }
});

module.exports = router;
