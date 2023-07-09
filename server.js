//1]This is the stage of the project

//creating a express server
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
connectDB();
//instance of express
const app = express();
//defining the port to listen
const port = process.env.PORT || 5000;
app.use(express.json());


/*
The code app.use("/api/contacts" , require("./routes/contactRoutes"));
is adding the contactRoutes router to the Express application app with a base path of "/api/contacts". 
This means that any requests that start with "/api/contacts" will be handled by the routes defined in the contactRoutes.js file.

*/
//use is the middleware
app.use("/api/contacts" , require("./routes/contactRoutes"));
app.use("/api/users" , require("./routes/userRoutes"));
app.use(errorHandler)
app.listen(port,()=>{
    console.log("server is running on port",port)
});
