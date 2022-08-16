const express = require("express");
const {
  getVariants,
  getVariant,
  addVariant,
  updateVariant,
  deleteVariant,
} = require("../controllers/variants");

const Variant = require("../models/Variant");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Variant, {
      path: "category",
      select: "title description",
    }),
    getVariants
  )
  .post(protect, authorize("admin"), addVariant);

router
  .route("/:id")
  .get(getVariant)
  .put(protect, authorize("admin"), updateVariant)
  .delete(protect, authorize("admin"), deleteVariant);

module.exports = router;
