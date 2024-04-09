const userSchema = require('../models/UserModel')
const ServiceProviderSchema = require('../models/ServiceProviderModel')
const encrypt = require('../util/Encrypt')
const mailUtil = require("../util/MailUtils")

const loginUser = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const userfromemail = await userSchema.findOne({ email: email })
        if (userfromemail != null) {
            console.log("User found");
            const flag = encrypt.comparePassword(password, userfromemail.password)
            if (flag == true) {
                res.status(200).json({
                    message: "login successfully",
                    data: userfromemail,
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

const resetPassword = async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    console.log(email)
    console.log(password)
    const hashedPassword = await encrypt.encryptPassword(password)

    try{
        
        const updateUser = await userSchema.findOneAndUpdate({email:email},{$set:{password:hashedPassword}})
        const updatServiceProvider = await ServiceProviderSchema.findOneAndUpdate({email:email},{$set:{password:hashedPassword}})
        res.status(200).json({
            message:"Password updated successfully",
            flag:1,
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Error in updating password",
        })
    }
}

const isUserExist= async (req, res) => {

    try{
        const email = req.body.email
        const getUserByEmail = await userSchema.findOne({email:email})
        const getServiceProvider = await ServiceProviderSchema.findOne({email:email})
        if(getUserByEmail){
            res.status(200).json({
                message:"User found",
                flag:1,
                data:getUserByEmail
            })
        }else if(getServiceProvider){
            res.status(200).json({
                message:"ServiceProvider found",
                flag:1,
                data:getServiceProvider
            })
        }
        else{

            res.status(404).json({
                message:"User not found",
                flag:-1
            })
        }
    }catch(err){
        res.status(500).json({
            message:"Error in getting User by email",
        })

    }
}

const createUser = async (req, res) => {
    try {

        const hashedPassword = encrypt.encryptPassword(req.body.password)
        const Userobj = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            role: req.body.role
        }
        const createuser = await userSchema.create(Userobj);
        const mailRes = await mailUtil.mailSend(createuser.email,"Welcome mail","Welcome to local service...")
        res.status(200).json({
            message: "Created Successfully",
            data: createuser,
            flag: 1
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Error in creating",
            data: err,
            flag: -1,
        })

    }
}

const getUser = async (req, res) => {
    try {
        const getUser = await userSchema.find().populate('role')
        res.status(200).json({
            message: "Get all user",
            data: getUser,
        })
    }
    catch (err) {

        res.status(500).json({
            message: "Error in getting all user",
            data: err,
            flag: -1
        })

    }
}

const deleteUser = async (req, res) => {

    try {
        const id = req.params.id
        const deleteduser = await userSchema.findByIdAndDelete(id).populate('role')
        if (deleteduser == null) {
            res.status(404).json({
                message: "User not found",
                flag: -1
            })
        }
        else {
            res.status(200).json({
                message: "User deleted successfully",
                flag: 1,
                data: deleteduser
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

const getUserById = async (req, res) => {

    try {

        const id = req.params.id
        const user = await userSchema.findById(id)
        if (user == null) {
            res.status(404).json({
                message: "User not found",
                flag: -1
            })
        } else {
            res.status(200).json({
                message: "User found",
                flag: 1,
                data: user
            })

        }


    } catch (err) {
        res.status(500).json({
            message: "Error in getting user by id",
            data: err,
            flag: -1
        })

    }


}

const updateUser = async (req, res) => {

    const id = req.params.id
    const newuser = req.body
    try {

        const updateuser = await userSchema.findByIdAndUpdate(id, newuser)
        if (updateuser == null) {
            res.status(404).json({
                message: "User not found",
                flag: -1

            })
        } else {
            res.status(200).json({
                message: "User updated successfully",
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


module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    isUserExist,resetPassword
}