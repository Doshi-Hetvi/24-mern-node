const userSchema = require('../models/UserModel')
const ServiceProviderSchema = require('../models/ServiceProviderModel')
const encrypt = require('../util/Encrypt')
const mailUtil = require("../util/MailUtils")
const otpSchema = require("../models/OtpModel")


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
    const otp = req.body.otp
    const time = req.body.time
    console.log(email)
    console.log(password)
    const getUserForOtp = await otpSchema.findOne({ email: email })
    console.log(getUserForOtp);
    if (getUserForOtp) {
        if (getUserForOtp.otp === otp) {
            const timeDifference = time - getUserForOtp.time
            const is60SecondGap = timeDifference >= 6000

            if (is60SecondGap) {
                res.status(404).json({
                    message: "OTP is expired",
                    flag: -1,
                })
            }
            else {
                const hashedPassword = await encrypt.encryptPassword(password);
                try {
                    const updateUserPassword = await userSchema.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } })
                    await otpSchema.findOneAndDelete({ email: email })
                    const updateServiceProviderPassword = await ServiceProviderSchema.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } })
                    await otpSchema.findOneAndDelete({ email: email })
                    res.status(200).json({
                        message: "Password updated successfully",
                        flag: 1,
                    })
                } catch (err) {
                    console.log(err)
                    res.status(500).json({
                        message: "Error in updating password",
                        flag: -1,
                    })
                }
            }
        }
        else {
            await otpSchema.findOneAndDelete({ email: email })
            res.status(404).json({
                message: "Invalid OTP",
                flag: -1,
            })
        }
    }
    else {
        await otpSchema.findOneAndDelete({ email: email })
        res.status(500).json({
            message: "Error...",
            flag: -1,
        })

    }

}

const isUserExist = async (req, res) => {

    try {
        const email = req.body.email
        const getUserByEmail = await userSchema.findOne({ email: email })
        const getServiceProvider = await ServiceProviderSchema.findOne({ email: email })

        console.log(getUserByEmail);
        console.log(getServiceProvider);
        if (getUserByEmail) {
            const otp = Math.floor(1000 + Math.random() * 9000)
            const mailRes = await mailUtil.mailSend(getUserByEmail.email,
                "OTP For Reset Password...",
                `Your OTP for reset password is ${otp}`
            )
            const otpobj = {
                otp: otp,
                email: getUserByEmail.email,
                status: true,
            }
            await otpSchema.create(otpobj)

            res.status(200).json({
                message: "User found",
                flag: 1,
                data: getUserByEmail
            })
        } else if (getServiceProvider) {
            const otp = Math.floor(1000 + Math.random() * 9000)
            const mailRes = await mailUtil.mailSend(getServiceProvider.email,
                "OTP For Reset Password...",
                `Your OTP for reset password is ${otp}`
            )

            const otpodj1 = {
                otp: otp,
                email: getServiceProvider.email,
                status: true,
            }
            await otpSchema.create(otpodj1)

            res.status(200).json({
                message: "ServiceProvider found",
                flag: 1,
                data: getServiceProvider
            })
        }
        else {

            res.status(404).json({
                message: "User not found",
                flag: -1
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Error in getting User by email",
            flag: -1
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
            role: req.body.role,
            isDefault: req.body.isDefault
        }
        const createuser = await userSchema.create(Userobj);
        const mailRes = await mailUtil.mailSend(createuser.email, "Welcome mail", "Welcome to local service...")
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
        const getUser = await userSchema.find().populate('role').populate({
            path:'address',
            populate: {
                path: "address",
                model: "Address"
            }
        })
        res.status(200).json({
            message: "Get all user",
            data: getUser,
            flag: 1
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
        const deleteduser = await userSchema.findByIdAndDelete(id)
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
        const user = await userSchema.findById(id).populate('role').populate('address')
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
    isUserExist,
    resetPassword
}