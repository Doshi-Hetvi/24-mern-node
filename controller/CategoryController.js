const categorySchema = require('../models/CategoryModel')


const createCategory = async (req,res) =>{
  try{
    const createcategory = await categorySchema.create(req.body);
    res.status(200).json({
      message: "Created Successfully",
      data: createcategory,
      flag: 1 
    })
  }
  catch(err) {
    res.status(500).json({
      message: "Error in creating category",
      data: err,
      flag: -1,
    })

  }
} 

const getCategory = async(req,res) =>{
  try{
    const getcategory = await categorySchema.find()
    res.status(200).json({
        message:"Get all category",
        data:getcategory,
    })
  }
  catch(err){

    res.status(500).json({
        message:"Error in getting all category",
        data:err,
        flag:-1
    })

}
}

const deleteCategory = async (req, res) => {

  try{
      const id = req.params.id
      const deletedCategory = await categorySchema.findByIdAndDelete(id)
      if(deletedCategory==null){
          res.status(404).json({
              message:"Category not found",
              flag:-1
          })
      }
      else{
          res.status(200).json({
              message:"Category deleted successfully",
              flag:1,
              data:deletedCategory
          })
      }

  }catch(err){

      res.status(500).json({
          message:"Error in deleting category",
          data:err,
          flag:-1
      })

  }

}

const getCategoryById = async (req, res) => {

  try{

      const id = req.params.id
      const category = await categorySchema.findById(id)
      if(category==null){
          res.status(404).json({
              message:"Category not found",
              flag:-1
          })
      }else{
          res.status(200).json({
              message:"Category found",
              flag:1,
              data:category
          })

      }


  }catch(err){
      res.status(500).json({
          message:"Error in getting category by id",
          data:err,
          flag:-1
      })

  }


}

const updateCategory = async (req, res) => {

      const id = req.params.id
      const newCategory = req.body
      try{

          const updateCategory = await categorySchema.findByIdAndUpdate(id,newCategory)
          if(updateCategory==null){
              res.status(404).json({
                  message:"Category not found",
                  flag:-1

              })
          }else{
              res.status(200).json({
                  message:"Category updated successfully",
                  flag:1,
              })
          }

      }catch(err){

          res.status(500).json({
              message:"Error in updating category",
              data:err,
              flag:-1
          })

      }


}


module.exports = {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
}