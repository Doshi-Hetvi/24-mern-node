const serviceSchema = require('../models/ServiceModel')
const multer = require('multer')
const path = require('path')
const cloudinaryController = require("./CloudinaryController")
const { log } = require('console')

const storage = multer.diskStorage({
    //destination : './uploads',
    filename: function (req, file, cb) {
        // cb(null,file.filename + '-' + Date.now() + path.extname(file.originalname));
        cb(null, file.originalname);
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single('myImage');

const createService = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(500).json({
                message: "Error Uploading File"
            })
        }
        else {
            if (req.file == undefined) {
                res.status(400).json({
                    message: "No File Selected"
                })
            }
            else {
                try {
                    const result = await cloudinaryController.uploadImage(req.file.path)
                    const obj = ({
                        servicename: req.body.servicename,
                        category: req.body.category,
                        subCategory: req.body.subCategory,
                        serviceprovider: req.body.serviceprovider,
                        servicedescription: req.body.servicedescription,
                        type: req.body.type,
                        amount: req.body.amount,
                        area: req.body.area,
                        city: req.body.city,
                        state: req.body.state,
                        imageUrl: result.secure_url
                    }
                    )
                    const newService = await serviceSchema.create(obj);
                    res.status(200).json({
                        message: "File Uploaded",
                        data: newService,
                        flag: 1
                    })
                }
                catch (error) {
                    console.log(error);
                    res.status(500).json({
                        message: "Error uploading image to Cloudinary",
                        flag: -1
                    })
                }
            }
        }
    })
}

const getService = async (req, res) => {
    try {
        const service = await serviceSchema.find().populate("category").populate("subCategory").populate("serviceprovider").populate("type")
        res.status(200).json({
            message: "Get all service",
            data:service,
        })
    }
    catch (err) {

        res.status(500).json({
            message: "Error in getting all service",
            data: err,
            flag: -1
        })

    }
}

const deleteService = async (req, res) => {

    try {
        const id = req.params.id
        const deletedservice = await serviceSchema.findByIdAndDelete(id)
        if (deletedservice == null) {
            res.status(404).json({
                message: "Service not found",
                flag: -1
            })
        }
        else {
            res.status(200).json({
                message: "Servie deleted successfully",
                flag: 1,
                data: deletedservice
            })
        }

    } catch (err) {

        res.status(500).json({
            message: "Error in deleting",
            data: err,
            flag: -1
        })

    }

}

const getServiceById = async (req, res) => {

    try {

        const id = req.params.id
        const service = await serviceSchema.findById(id).populate("category").populate("subCategory").populate("serviceprovider").populate("type")
        if (service == null) {
            res.status(404).json({
                message: "Service not found",
                flag: -1
            })
        } else {
            res.status(200).json({
                message: "Service found",
                flag: 1,
                data: service
            })

        }


    } catch (err) {
        res.status(500).json({
            message: "Error in getting service by id",
            data: err,
            flag: -1
        })

    }


}

const updateService = async (req, res) => {

    const id = req.params.id
    const newservice = req.body
    try {
        let imageUrl = newservice.imageUrl; // Default to existing image
        if (req.file) {
            // If a new image is uploaded, update the imageUrl
            const result = await cloudinaryController.uploadImage(req.file.path);
            imageUrl = result.secure_url;
        }

        const updateservice = await serviceSchema.findByIdAndUpdate(id, {...newservice,imageUrl:imageUrl}, {new:true})
        if (!updateservice) {
            res.status(404).json({
                message: "Service not found",
                flag: -1

            })
        } else {
            res.status(200).json({
                message: "Service updated successfully",
                flag: 1,
                data:updateservice
            })
        }

    } catch (err) {

        res.status(500).json({
            message: "Error in updating",
            data: err,
            flag: -1
        })

    }
}


const getServiceByServiceProviderID = async(req,res) => {
    const serviceProviderId = req.params.id
    console.log(serviceProviderId);
    const ser = await serviceSchema.find({serviceprovider : serviceProviderId}).populate("category").populate("subCategory").populate("serviceprovider").populate("type")
    console.log(ser);
    try{
        if(ser.length === 0){
        res.status(404).json({
            message: "Service not found",
            data: []
        })
    }
    else{
        res.status(200).json({
            message: "Successfully fetched services of the provider",
            data: ser,
            flag:1
        })
    }
}
catch(err){
    res.status(500).json({
        message: "No service Found",
        flag:-1,
        data: []
    });
}
}

const filterService = async (req,res) =>{
    try{
        
    console.log(req.query);
    const filter = await serviceSchema.find({servicename : {$regex : req.query.servicename, $option: "(?i)"}}).populate("category").populate("subCategory").populate("serviceprovider").populate("type")
    if (filter && filter.length > 0) {
        res.status(200).json({
          message: "service found.",
          data: filter,
          flag: 1,
        });
      } else {
        res.status(404).json({
          message: "No service found",
          data: [],
        });
      }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Error in filtering services",
            data: [],
            flag: -1,
        });
    }
}



const getServiceByCategory = async (req, res) => {
    const categoryId = req.params.categoryId
    try {
      const services = await serviceSchema.find({ category: categoryId }).populate("category")
      console.log(services);
      // if (subcategories.length === 0) {
      //   res.status(404).json({
      //     message: "Subcategories not found",
      //     data: []
      //   })
      // }
      // else {
      res.status(200).json({
        message: "Services found for category",
        flag: 1,
        data: services
      })
      // }
    }
    catch (err) {
      res.status(500).json({
        message: "Error in getting services from category",
        data: [],
        flag: -1
      })
  
    }
  }

module.exports = {
    createService,
    getService,
    getServiceById,
    updateService,
    deleteService,
    getServiceByServiceProviderID,
    filterService,
    getServiceByCategory
}