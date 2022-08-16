const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      lower: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create Category slug from the name
CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Cascade delete variants when a category is deleted
CategorySchema.pre("remove", async function (next) {
  console.log(`Variants being removed from Category ${this._id}`);
  await this.model("Variant").deleteMany({ category: this._id });
  next();
});

// Reverse populate with virtuals
CategorySchema.virtual("variants", {
  ref: "Variant",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});

module.exports = mongoose.model("Category", CategorySchema);
