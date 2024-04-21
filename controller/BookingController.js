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

const updateStatusById = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id)
      const updateStatus = await bookingSchema.findByIdAndUpdate(id,{
        status: "Done",
      });
      console.log(updateStatus);
      res.status(200).json({
        message: "Status Updated Successfully",
        flag: 1,
        data: updateStatus,
      });
    } catch (error) {
      
      res.status(500).json({
        message: "Server Error",
        flag: -1,
        data: error,
      });
    }
  };
  

const pendingStatusById = async(req,res) =>{
  const userId = req.params.id
    try {
      const doneStatus = await bookingSchema.find({user:userId, status: "Pending"}).populate("service").populate("serviceprovider").populate("user")
      if (doneStatus && doneStatus.length > 0) {
        res.status(200).json({
          message: "Pending Status are found",
          data: doneStatus,
          flag: 1
        })
      } else {
        res.status(404).json({
          message:"No Pending Status Found!",
          data:[],
          flag:-1
        })
      }
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        flag: -1,
        data: []
      })
    }
  }
  
  const doneStatusById = async (req, res) => {
    const userId = req.params.id
    try {
      const doneStatus = await bookingSchema.find({
        status: "Done",user:userId})
        .populate("service").populate({
          path:'service',
          populate: {
            path: 'category',
            model: 'Category'
          }
        })
        .populate("serviceprovider")
        .populate("user");
      if (doneStatus && doneStatus.length > 0) {
        res.status(200).json({
          message: "Done Status are found",
          data: doneStatus,
          flag: 1,
        });
      } else {
        res.status(404).json({
          message: "No Done Status Found!",
          data: [],
          flag: -1,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Server error",
        flag: -1,
        data: [],
      });
    }
  };
  
 const getBookingByUserId = async (req, res) => {
    const userId = req.params.id; //loggedin service provider id
    try {
      const booking = await bookingSchema.find({
        user: userId,
      })
        .populate("service")
        .populate("serviceprovider")
        .populate("user")
      console.log(booking);
      if (booking && booking.length > 0) {
        res.status(200).json({
          message: "booking found",
          flag: 1,
          data: booking,
        });
      } else {
        res.status(404).json({
          message: "no booking found",
          flag: -1,
          data: [],
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "no booking found",
        flag: -1,
        data: [],
      });
    }
  };
  const getBookingByServiceProviderId = async (req, res) => {
    try {
      const Userid = req.params.id; //loggedin service provider id
      const booking = await bookingSchema.find({
        serviceprovider: Userid,
      })
        .populate("service")
        .populate("serviceprovider")
        .populate("user")
      console.log(booking);
      if (booking && booking.length > 0) {
        res.status(200).json({
          message: "booking found",
          flag: 1,
          data: booking,
        });
      } else {
        res.status(404).json({
          message: "no booking found",
          flag: -1,
          data: [],
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "no booking found",
        flag: -1,
        data: [],
      });
    }
  };
  
  const doneStatusByServiceProviderId = async (req, res) => {
    const serproid = req.params.id; //loggedin service provider id
    try {
      const booking = await bookingSchema.find({
        serviceprovider: serproid,
      })
        .populate("service")
        .populate("serviceprovider")
        .populate("user")
      console.log(booking);
      if (booking && booking.length > 0) {
        res.status(200).json({
          message: "booking found",
          flag: 1,
          data: booking,
        });
      } else {
        res.status(404).json({
          message: "no booking found",
          flag: -1,
          data: [],
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
        flag: -1,
        data: [],
      });
    }
  };


  


module.exports = {
 createBooking,
 deleteBooking,
 getBookingById,
 updateBooking,
 doneStatusByServiceProviderId,
 getBooking,
 pendingStatusById,
 doneStatusById, 
 updateStatusById,
 getBookingByUserId,getBookingByServiceProviderId
}