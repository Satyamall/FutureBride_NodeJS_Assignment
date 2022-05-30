

const express = require("express");
const User = require("./model");
const router = express.Router();
const {body, validationResult} = require("express-validator");

router.post("/",
  body("username").isLength({min: 5}).isString().withMessage("Name should be greater than or equal to 5 letter and required"),
  body("role").isLength({min: 3}).isString().withMessage("role should be greater than or equal to 3 and required"),
  body("active").isBoolean().withMessage("Active is required in true or false"),
  body("age").isNumeric().withMessage("Age should be Numeric and required"),
 async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errorData: errors.array()})
        }
         const user = await User.create(req.body);
         if(!user) return res.status(400).json({message: "User Not Created"});
         res.status(201).json({payload: user});
})

router.get("/", async(req,res)=>{
         const users = await User.find({});
         if(!users) return res.status(400).json({message: "No Users Present"});
         return res.status(200).json({payload: users});
})

router.get("/:id",async(req,res)=>{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(400).json({message: "User Not found"});
        return res.status(200).json({payload: user});
})

module.exports = router;
