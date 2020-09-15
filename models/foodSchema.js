const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  barcode: {
    type: Schema.Types.Number
  },
  name: {
    type: Schema.Types.String,
    required: true
  },
  serving: {
      size: {
          type: Schema.Types.Number,
          required: true
      },
      unit: {
          type: Schema.Types.String,
          required: true
      },
      servingPerContainer: {
          type: Schema.Types.Number,
          required: true
      }
  },
  calories: {
      type: Schema.Types.Number,
      required: true,
  },
  totalFat: {
    type: Schema.Types.Number
  },
  saturatedFat: {
    type: Schema.Types.Number
  },
  transFat: {
    type: Schema.Types.Number
  },
  polyUnsaturatedFat: {
    type: Schema.Types.Number
  },
  monoUnsaturatedFat: {
    type: Schema.Types.Number
  },
  cholestrol: {
    type: Schema.Types.Number
  },
  sodium: {
    type: Schema.Types.Number
  },
  totalCarbohydrates: {
    type: Schema.Types.Number
  },
  dietaryFibers: {
    type: Schema.Types.Number
  },
  sugars: {
    type: Schema.Types.Number
  },
  addedSugars: {
    type: Schema.Types.Number
  },
  sugarAlchohols: {
    type: Schema.Types.Number
  },
  protein: {
    type: Schema.Types.Number
  },
  vitaminD: {
    type: Schema.Types.Number
  },
  calcium: {
    type: Schema.Types.Number
  },
  iron: {
    type: Schema.Types.Number
  },
  potassium: {
    type: Schema.Types.Number
  },
  vitaminA: {
    type: Schema.Types.Number
  },
  vitaminC: {
    type: Schema.Types.Number
  }
});


module.exports = mongoose.model('Food', foodSchema)
