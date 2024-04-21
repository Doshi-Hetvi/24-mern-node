const subcategorySchema = require('../models/SubCategoryModel')


const createSubCategory = async (req, res) => {
  try {
    const createsubcategory = await subcategorySchema.create(req.body);
    res.status(200).json({
      message: "Created Successfully",
      data: createsubcategory,
      flag: 1
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Error in creating category",
      data: err,
      flag: -1,
    })

  }
}

const getSubCategory = async (req, res) => {
  try {
    const getsubcategory = await subcategorySchema.find().populate('category')
    res.status(200).json({
      message: "Get all category",
      data: getsubcategory,
    })
  }
  catch (err) {

    res.status(500).json({
      message: "Error in getting all category",
      data: err,
      flag: -1
    })

  }
}

const deleteSubCategory = async (req, res) => {

  try {
    const id = req.params.id
    const deletedSubCategory = await subcategorySchema.findByIdAndDelete(id)
    if (deletedSubCategory == null) {
      res.status(404).json({
        message: "Category not found",
        flag: -1
      })
    }
    else {
      res.status(200).json({
        message: "Category deleted successfully",
        flag: 1,
        data: deletedSubCategory
      })
    }

  } catch (err) {

    res.status(500).json({
      message: "Error in deleting category",
      data: err,
      flag: -1
    })

  }

}

const getSubCategoryById = async (req, res) => {

  try {

    const id = req.params.id
    const subcategory = await subcategorySchema.findById(id).populate('category')
    if (subcategory == null) {
      res.status(404).json({
        message: "Category not found",
        flag: -1
      })
    } else {
      res.status(200).json({
        message: "Category found",
        flag: 1,
        data: subcategory
      })

    }


  } catch (err) {
    res.status(500).json({
      message: "Error in getting category by id",
      data: err,
      flag: -1
    })

  }


}

const updateSubCategory = async (req, res) => {

  const id = req.params.id
  const newSubCategory = req.body
  try {

    const updatesubCategory = await subcategorySchema.findByIdAndUpdate(id, newSubCategory)
    if (updatesubCategory == null) {
      res.status(404).json({
        message: "Category not found",
        flag: -1

      })
    } else {
      res.status(200).json({
        message: "Category updated successfully",
        flag: 1,
      })
    }

  } catch (err) {

    res.status(500).json({
      message: "Error in updating category",
      data: err,
      flag: -1
    })

  }

}

const getSubCategoryByCategory = async (req, res) => {
  const categoryId = req.params.categoryId
  try {
    const subcategories = await subcategorySchema.find({ category: categoryId }).populate("category")
    console.log(subcategories);
    // if (subcategories.length === 0) {
    //   res.status(404).json({
    //     message: "Subcategories not found",
    //     data: []
    //   })
    // }
    // else {
    res.status(200).json({
      message: "Subcategories found for category",
      flag: 1,
      data: subcategories
    })
    // }
  }
  catch (err) {
    res.status(500).json({
      message: "Error in getting subcategories for category",
      data: [],
      flag: -1
    })

  }
}

module.exports = {
  createSubCategory,
  getSubCategory,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryByCategory
}