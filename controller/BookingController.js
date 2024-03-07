const bookingSchema = require('../models/BookingModel')

const createBooking = async (req,res) =>{
  try{
    const create = await bookingSchema.create(req.body);
    res.status(200).json({
      message: "Created Successfully",
      data: create,
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

const getBooking = async(req,res) =>{
  try{
    const getbooking = await bookingSchema.find().populate('service').populate('serviceprovider').populate('user')
    res.status(200).json({
        message:"Get all booking",
        data:getbooking,
    })
  }
  catch(err){

    res.status(500).json({
        message:"Error in getting all booking",
        data:err,
        flag:-1
    })

}
}

const deleteBooking = async (req, res) => {

  try{
      const id = req.params.id
      const deleted = await bookingSchema.findByIdAndDelete(id)
      if(deleted==null){
          res.status(404).json({
              message:" not found",
              flag:-1
          })
      }
      else{
          res.status(200).json({
              message:" deleted successfully",
              flag:1,
              data:deleted
          })
      }

  }catch(err){

      res.status(500).json({
          message:"Error in deleting ",
          data:err,
          flag:-1
      })

  }

}

const getBookingById = async (req, res) => {

  try{

      const id = req.params.id
      const booking = await bookingSchema.findById(id).populate('service').populate('serviceprovider').populate('user')
      if(booking==null){
          res.status(404).json({
              message:" not found",
              flag:-1
          })
      }else{
          res.status(200).json({
              message:" found",
              flag:1,
              data:booking
          })

      }


  }catch(err){
      res.status(500).json({
          message:"Error in getting by id",
          data:err,
          flag:-1
      })

  }


}

const updateBooking = async (req, res) => {

      const id = req.params.id
      const newBooking = req.body
      try{

          const updated = await bookingSchema.findByIdAndUpdate(id,newBooking)
          if(updated==null){
              res.status(404).json({
                  message:" not found",
                  flag:-1

              })
          }else{
              res.status(200).json({
                  message:" updated successfully",
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
 createBooking,
 deleteBooking,getBookingById,updateBooking,getBooking
}