const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")
//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async(req,res)=>{
    const {username , email , password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvalilable = await User.findOne({email})
    if(userAvalilable){
        res.status(400);
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);
    console.log(hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({_id: user.id ,email: user.email});
    }
    else{
        res.status(400);
        throw new Error("Invalid user data")
    }
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async(req,res)=>{
    //fetch the email and the password from the user(req.body)
    const {email , password} = req.body;
    //if any of the field is empty alert all the fileds are mandatory
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    //fetch the user by using his email idfrom the database
    const user = await User.findOne({email});
    //if that user exists and the entered password mathches with hashed password in the database
    //here we are comparing the password with the hashed password of the user 
    //if matches provide the access token to the response
    if(user && (await bcrypt.compare(password , user.password))){
        res.status(200).json({
            _id:user.id,
            email:user.email,
            token:jwt.sign({id:user.id} , process.env.JWT_SECRET , {expiresIn:"1d"})
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid credentials")  
    }
});

//@desc current user info
//@route GET /api/users/current
//@access private


const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user)
});

module.exports={registerUser , loginUser , currentUser};