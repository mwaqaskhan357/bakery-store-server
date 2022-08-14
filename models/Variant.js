const mongoose = require("mongoose");
const slugify = require("slugify");

const VariantSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  price: {
    type: Number,
    required: [true, "Please add price"],
  },
  image: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
});

// Create Variant slug from the name
VariantSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Variant", VariantSchema);
