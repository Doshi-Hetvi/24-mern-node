const serviceProviderSchema = require('../models/ServiceProviderModel')
const encrypt = require('../util/Encrypt')
const mailUtil = require('../util/MailUtils')

const loginServiceProvider = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const serviceProviderfromemail = await serviceProviderSchema.findOne({ email: email })
        if (serviceProviderfromemail != null) {
            console.log("User found");
            const flag = encrypt.comparePassword(password, serviceProviderfromemail.password)
            if (flag == true) {
                res.status(200).json({
                    message: "login successfully",
                    data: serviceProviderfromemail,
                    flag: 1
                })
            }
            else {
                res.status(404).json({
                    message: "Not found",
                    flag: -1
                })
            }
        }
        else {
            res.status(404).json({
                message: "Not found",
                flag: -1
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Error in login",
            flag: -1
        })
    }
}

const createServiceProvider = async (req,res) =>{
  try{
    const hashedPassword = encrypt.encryptPassword(req.body.password)
    const ServiceProviderobj = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        role: req.body.role,
        company: req.body.company,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        postalcode: req.body.postalcode,
        aboutme: req.body.aboutme
    }
    const createserviceProvider = await serviceProviderSchema.create(ServiceProviderobj);
    const mailRes = await mailUtil.mailSend(createserviceProvider.email,"Welcome mail","Welcome to local service...")
    res.status(200).json({
      message: "Created Successfully",
      data: createserviceProvider,
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

const getServiceProvider = async(req,res) =>{
  try{
    const getserviceProvider = await serviceProviderSchema.find().populate('role')
    res.status(200).json({
        message:"Get all service provider",
        data:getserviceProvider,
    })
  }
  catch(err){

    res.status(500).json({
        message:"Error in getting all service provider",
        data:err,
        flag:-1
    })

}
}

const deleteServiceProvider = async (req, res) => {

  try{
      const id = req.params.id
      const deletedserviceProvider = await serviceProviderSchema.findByIdAndDelete(id)
      if(deletedserviceProvider==null){
          res.status(404).json({
              message:"Service provider not found",
              flag:-1
          })
      }
      else{
          res.status(200).json({
              message:"Service provider deleted successfully",
              flag:1,
              data:deletedserviceProvider
          })
      }

  }catch(err){

      res.status(500).json({
          message:"Error in deleting",
          data:err,
          flag:-1
      })

  }

}

const getServiceProviderById = async (req, res) => {

  try{
      const id = req.params.id
      const serviceProvider = await serviceProviderSchema.findById(id).populate('role')
      if(serviceProvider==null){
          res.status(404).json({
              message:"Service provider not found",
              flag:-1
          })
      }else{
          res.status(200).json({
              message:"Service provider found",
              flag:1,
              data:serviceProvider
          })

      }


  }catch(err){
      res.status(500).json({
          message:"Error in getting service provider by id",
          data:err,
          flag:-1
      })

  }


}

const updateServiceProvider = async (req, res) => {

      const id = req.params.id
      const newserviceProvider = req.body
      try{

          const updateserviceProvider = await serviceProviderSchema.findByIdAndUpdate(id,newserviceProvider)
          if(updateserviceProvider==null){
              res.status(404).json({
                  message:"Service provider not found",
                  flag:-1

              })
          }else{
              res.status(200).json({
                  message:"Service provider updated successfully",
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
  createServiceProvider,
  getServiceProvider,
  getServiceProviderById,
  updateServiceProvider,
  deleteServiceProvider,
  loginServiceProvider
}