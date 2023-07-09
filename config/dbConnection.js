const mongoose = require("mongoose");

/**
 * Connects to the database using the provided connection string.
 *
 * @return {Promise<void>} - A promise that resolves when the connection is established or rejects with an error.
 */
/*
This code snippet defines an asynchronous function called connectDB 
that connects to a MongoDB database using the Mongoose library. 
It uses the mongoose.connect method to establish the connection, and if successful, logs a message with the connection details. 
If an error occurs during the connection, it logs the error and exits the process.
*/
const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Datbase connected ",connect.connection.host , connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;