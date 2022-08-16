const { Schema } = require('mongoose');
const mongoose = require('mongoose');
// const LineItem = new mongoose.Schema({
//   quantity: {
//     type: Number,
//   },
//   variant: {
//     type: mongoose.Schema.ObjectId,
//     ref: 'Variant',
//     required: true,
//   },
// });
const OrderSchema = new mongoose.Schema(
  {
    order_number: {
      type: Number,
    },
    variants: [
      {
        variant: {
          type: mongoose.Schema.ObjectId,
          ref: 'Variant',
          required: true,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    total_bill: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Prevent user from submitting more than one review per bootcamp
// OrderSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('Order', OrderSchema);
