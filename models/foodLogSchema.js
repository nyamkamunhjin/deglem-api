const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodLogSchema = new Schema({
  serving: Schema.Types.Number,
  foodId: {
    type: Schema.Types.ObjectId,
    ref: 'Food'
  }
})

module.exports = mongoose.model('FoodLog', FoodLogSchema);