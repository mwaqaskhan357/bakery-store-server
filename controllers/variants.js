const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Variant = require("../models/Variant");
const Category = require("../models/Category");

// @desc      Get variants
// @route     GET /api/v1/variants
// @route     GET /api/v1/categories/:categoryId/variants
// @access    Public
exports.getVariants = asyncHandler(async (req, res, next) => {
  if (req.params.categoryId) {
    const variants = await Variant.find({ category: req.params.categoryId });

    return res.status(200).json({
      success: true,
      count: variants.length,
      data: variants,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single variant
// @route     GET /api/v1/variants/:id
// @access    Public
exports.getVariant = asyncHandler(async (req, res, next) => {
  const variant = await Variant.findById(req.params.id).populate({
    path: "category",
    select: "title description",
  });

  if (!variant) {
    return next(
      new ErrorResponse(`No variant with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @desc      Add variant
// @route     POST /api/v1/categories/:categoryId/variants
// @access    Private
exports.addVariant = asyncHandler(async (req, res, next) => {
  req.body.category = req.params.categoryId;

  const category = await Category.findById(req.params.categoryId);

  if (!category) {
    return next(
      new ErrorResponse(`No category with the id of ${req.params.bootcampId}`),
      404
    );
  }

  const variant = await Variant.create(req.body);

  res.status(200).json({
    success: true,
    data: variant,
  });
});

// @desc      Update variant
// @route     PUT /api/v1/variants/:id
// @access    Private
exports.updateVariant = asyncHandler(async (req, res, next) => {
  let variant = await Variant.findById(req.params.id);

  if (!variant) {
    return next(
      new ErrorResponse(`No variant with the id of ${req.params.id}`),
      404
    );
  }

  variant = await Variant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: variant,
  });
});

// @desc      Delete variant
// @route     DELETE /api/v1/variants/:id
// @access    Private
exports.deleteVariant = asyncHandler(async (req, res, next) => {
  const variant = await Variant.findById(req.params.id);

  if (!variant) {
    return next(
      new ErrorResponse(`No variant with the id of ${req.params.id}`),
      404
    );
  }

  await variant.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
