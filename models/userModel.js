const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true , "Please add the user name"]
    },
    email:{
        type:String,
        required:[true , "Please add the user email"],
        unique:[true , "Email id already exists"],
    },
    password:{
        type:String,
        required:[true,"User passowrd is madatory"]
    },
},
    {
        timestamps:true
    }
);

module.exports = mongoose.model("User" , userSchema);
