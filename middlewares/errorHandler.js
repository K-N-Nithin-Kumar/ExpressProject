/*
 * Handles errors and sends appropriate response based on the error code.
 *
 * @param {Error} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 */

const{constants} = require("../contacts")
const errorHandler = (err , req,res , next)=>{
   const statusCode = res.statusCode ? res.statusCode : 500;

   switch(statusCode)
   {
      case constants.VALIDATION_ERROR:
        res.json({title:"Validation failed",message:err.message , stackTrace:err.stack});
        break;
      case constants.NOT_FOUND:
        res.json({title:"Not found",message:err.message , stackTrace:err.stack});
        break;
      case constants.UNAUTHORISED:
        res.json({title:"Unauthorised",message:err.message , stackTrace:err.stack})
        break;
      case constants.FORBIDDEN:
        res.json({title:"Forbidden",message:err.message , stackTrace:err.stack})
        break;
      case constants.INTERNAL_SERVER_ERROR:
        res.json({title:"Internal server error",message:err.message , stackTrace:err.stack})
        break;
      default:
        console.log("No error all good");
        break;
   }
   
 }

 module.exports = errorHandler