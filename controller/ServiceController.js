const serviceSchema = require('../models/ServiceModel')
const multer = require('multer')
const path = require('path')
const cloudinaryController = require("./CloudinaryController")

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
                const result = await cloudinaryController.uploadImage(req.file.path)
                const obj = ({
                    servicename: req.body.servicename,
                    category: req.body.category,
                    subCategory: req.body.subCategory,
                    serviceprovider: req.body.serviceprovider,
                    type: req.body.type,
                    amount: req.body.amount,
                    area: req.body.area,
                    city: req.body.city,
                    state: req.body.state,
                    imageUrl: result.secure_url
                }
                )
                const savservice = await serviceSchema.create(obj);
                res.status(200).json({
                    message: "File Uploaded",
                    data: savservice,
                    flag: 1
                })
            }
        }
    })
}

const getService = async (req, res) => {
    try {
        const getservice = await serviceSchema.find().populate("category").populate("subCategory").populate("serviceprovider").populate("type")
        res.status(200).json({
            message: "Get all service",
            data: getservice,
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

        const updateservice = await serviceSchema.findByIdAndUpdate(id, newservice)
        if (updateservice == null) {
            res.status(404).json({
                message: "Service not found",
                flag: -1

            })
        } else {
            res.status(200).json({
                message: "Service updated successfully",
                flag: 1,
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

const getServiceByServiceProviderID = async (req, res) => {
    const serviceProviderId = req.params.id
    try {
        const services = await serviceSchema.find({ serviceProvider: serviceProviderId }).populate("category").populate("subCategory").populate("serviceprovider").populate("type")
        console.log(services);
        if (services && services.length > 0) {
            res.status(200).json({
                message: "service found",
                flag: 1,
                data: services
            })
        }
        else {
            res.status(404).json({
                message: "no service found",
                flag: -1,
                data: []
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: "error in getting",
            flag: -1,
            data: []
        })
    }
}

module.exports = {
    createService,
    getService,
    getServiceById,
    updateService,
    deleteService,
    getServiceByServiceProviderID
}