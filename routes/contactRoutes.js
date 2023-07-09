/*
This code is using the Express framework in Node.js to create a router. 
The router is then exported to be used in other parts of the application. 
It defines a single route for the root path ("/") that handles GET requests and responds with a JSON object containing the message "Get all contacts" and a status code of 200.
*/ 

const express = require("express")
const router = express.Router();
const {
    getContacts,
    createContact ,
    getContact ,
    updateContact , 
    deleteContact
} = require("../controller/contactController")

const validateToken = require("../middlewares/validateTokenHandler")

router.use(validateToken);

router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;