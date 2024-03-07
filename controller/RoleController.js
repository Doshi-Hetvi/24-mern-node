const roleSchema = require('../models/RoleModel')


const createRole = async (req,res) =>{
  try{
    const createrole = await roleSchema.create(req.body);
    res.status(200).json({
      message: "Created Successfully",
      data: createrole,
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

const getRole = async(req,res) =>{
  try{
    const getrole = await roleSchema.find()
    res.status(200).json({
        message:"Get all roles",
        data:getrole,
    })
  }
  catch(err){

    res.status(500).json({
        message:"Error in getting all roles",
        data:err,
        flag:-1
    })

}
}

const deleteRole = async (req, res) => {

  try{
      const id = req.params.id
      const deletedrole = await roleSchema.findByIdAndDelete(id)
      if(deletedrole==null){
          res.status(404).json({
              message:"Role not found",
              flag:-1
          })
      }
      else{
          res.status(200).json({
              message:"Role deleted successfully",
              flag:1,
              data:deletedrole
          })
      }

  }catch(err){

      res.status(500).json({
          message:"Error in deleting role",
          data:err,
          flag:-1
      })

  }

}

const getRoleById = async (req, res) => {

  try{

      const id = req.params.id
      const role = await roleSchema.findById(id)
      if(role==null){
          res.status(404).json({
              message:"Role not found",
              flag:-1
          })
      }else{
          res.status(200).json({
              message:"Role found",
              flag:1,
              data:role
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

const updateRole = async (req, res) => {

      const id = req.params.id
      const newrole = req.body
      try{

          const updaterole = await roleSchema.findByIdAndUpdate(id,newrole)
          if(updaterole==null){
              res.status(404).json({
                  message:"Role not found",
                  flag:-1

              })
          }else{
              res.status(200).json({
                  message:"Role updated successfully",
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
  createRole,
  getRole,
  getRoleById,
  updateRole,
  deleteRole
}