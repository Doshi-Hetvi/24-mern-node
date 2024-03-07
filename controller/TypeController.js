const typeSchema = require('../models/TypeModel')


const createType = async (req,res) =>{
  try{
    const createtype = await typeSchema.create(req.body);
    res.status(200).json({
      message: "Created Successfully",
      data: createtype,
      flag: 1 
    })
  }
  catch(err) {
    res.status(500).json({
      message: "Error in creating",
      data: err,
      flag: -1,
    })

  }
} 

const getType = async(req,res) =>{
  try{
    const gettype = await typeSchema.find()
    res.status(200).json({
        message:"Get all types",
        data:gettype,
    })
  }
  catch(err){

    res.status(500).json({
        message:"Error in getting all types",
        data:err,
        flag:-1
    })

}
}

const deleteType = async (req, res) => {

  try{
      const id = req.params.id
      const deletedtype = await typeSchema.findByIdAndDelete(id)
      if(deletedtype==null){
          res.status(404).json({
              message:"Type not found",
              flag:-1
          })
      }
      else{
          res.status(200).json({
              message:"Type deleted successfully",
              flag:1,
              data:deletedtype
          })
      }

  }catch(err){

      res.status(500).json({
          message:"Error in deleting type",
          data:err,
          flag:-1
      })

  }

}

const getTypeById = async (req, res) => {

  try{

      const id = req.params.id
      const type = await typeSchema.findById(id)
      if(type==null){
          res.status(404).json({
              message:"Type not found",
              flag:-1
          })
      }else{
          res.status(200).json({
              message:"Type found",
              flag:1,
              data:type
          })

      }


  }catch(err){
      res.status(500).json({
          message:"Error in getting type by id",
          data:err,
          flag:-1
      })

  }


}

const updateType = async (req, res) => {

      const id = req.params.id
      const newtype = req.body
      try{

          const updatetype = await typeSchema.findByIdAndUpdate(id,newtype)
          if(updaterole==null){
              res.status(404).json({
                  message:"Type not found",
                  flag:-1

              })
          }else{
              res.status(200).json({
                  message:"Type updated successfully",
                  flag:1,
              })
          }

      }catch(err){

          res.status(500).json({
              message:"Error in updating",
              data:err,
              flag:-1
          })

      }


}


module.exports = {
  createType,
  getType,
  getTypeById,
  updateType,
  deleteType
}