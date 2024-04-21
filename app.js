const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors')
const PORT = 4000


//..config...
app.use(express.json())
app.use(cors())
//connect to mongodb

var db = mongoose.connect("mongodb://127.0.0.1:27017/localservice-backend")
db.then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log(err)
})

//require all routes...

const categoryRoute = require("./Routes/CategoryRoute.js")
const roleRoute = require("./Routes/RoleRoute.js")
const serviceRoute = require("./Routes/ServiceRoute.js")
const serviceProviderRoute = require("./Routes/ServiceProviderRoute.js")
const subCategoryRoute = require("./Routes/SubCategoryRoute.js")
const typeRoute = require("./Routes/TypeRoute.js")
const userRoute = require("./Routes/UserRoute.js")
const bookingRoute = require("./Routes/BookingRoutes.js")
const addressRoutes = require("./Routes/AddressRoutes.js")


//provinding to server all routes...

app.use("/categories",categoryRoute)
app.use("/roles",roleRoute)
app.use("/services",serviceRoute)
app.use("/serviceproviders",serviceProviderRoute)
app.use("/subCategories",subCategoryRoute)
app.use("/types",typeRoute)
app.use("/users",userRoute)
app.use("/bookings",bookingRoute)
app.use("/addresses",addressRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    //console.log("server is running on port "+PORT)
})