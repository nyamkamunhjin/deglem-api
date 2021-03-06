const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const foodSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  recipe: {
    type: Schema.Types.Boolean,
    required: false,
    default: () => false,
  },
  recipeDescription: {
    type: Schema.Types.String,
  },
  ingredients: [
    {
      food: { type: Schema.Types.ObjectId, ref: 'Food' },
      serving: Schema.Types.Number,
    },
  ],
  barcode: {
    type: Schema.Types.Number,
    unique: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    // unique: true,
  },
  serving: {
    size: {
      type: Schema.Types.Number,
      required: true,
    },
    unit: {
      type: Schema.Types.String,
      required: true,
    },
    servingPerContainer: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  calories: {
    type: Schema.Types.Number,
    required: true,
  },
  totalFat: {
    type: Schema.Types.Number,
    required: true,
  },
  saturatedFat: {
    type: Schema.Types.Number,
  },
  transFat: {
    type: Schema.Types.Number,
  },
  polyUnsaturatedFat: {
    type: Schema.Types.Number,
  },
  monoUnsaturatedFat: {
    type: Schema.Types.Number,
  },
  cholestrol: {
    type: Schema.Types.Number,
  },
  sodium: {
    type: Schema.Types.Number,
  },
  totalCarbohydrates: {
    type: Schema.Types.Number,
    required: true,
  },
  dietaryFibers: {
    type: Schema.Types.Number,
  },
  sugars: {
    type: Schema.Types.Number,
  },
  addedSugars: {
    type: Schema.Types.Number,
  },
  sugarAlchohols: {
    type: Schema.Types.Number,
  },
  protein: {
    type: Schema.Types.Number,
    required: true,
  },
  vitaminD: {
    type: Schema.Types.Number,
  },
  calcium: {
    type: Schema.Types.Number,
  },
  iron: {
    type: Schema.Types.Number,
  },
  potassium: {
    type: Schema.Types.Number,
  },
  vitaminA: {
    type: Schema.Types.Number,
  },
  vitaminC: {
    type: Schema.Types.Number,
  },
});

foodSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Food', foodSchema);
