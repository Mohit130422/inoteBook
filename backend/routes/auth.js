const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');



const JWT_SECRET = "StepToProgrammer$1304"

//ROUTE 1:- Create a User Using: POST /api/auth/createuser/ "No login required.."
router.post('/createuser', [
    body('name', 'Enter Valid Name').isLength({ min: 3 }),
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password Atleast have 5 Characters').isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors, Return Bad Request and the errors....
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check Whether the user email is the exsist already....
    try {


        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with the email already exists" })

        }
        //function for a create new user
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({ error: 'Please Enter Unique value of Email..', message: err.message })
        // })
        // console.log(req.body);
        // const user = User(req.body);
        // user.save()
        // res.send(req.body);
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        // res.json(user)
        res.json({ "authToken": authToken });
    } catch (error) {  //catch error
        console.error(error.message)
        res.status(500).send("Internal Server Errors");
    }
})
//ROUTE 2:- Login a User Using CREDS: POST /api/auth/login/ "No login required.."

router.post('/login', [
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    //If there are errors, Return Bad Request and the errors....

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if (!user){
            const success= false;
            return res.status(400).json({success, error:"Please try to put correct User Credentials."})  
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if (!passwordCompare){
            const success= false;
            return res.status(400).json({sucess, error:"Please try to put correct User Credentials."})  
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        const success = true;
        res.json({ "success":success,"authToken": authToken });
    } catch (error) {  //catch error
        console.error(error.message);
        res.status(500).send("Internal Server Errors");
    }

})

//ROUTE 3:- Get Login User details: POST /api/auth/getuser/ "login required.."

router.post('/getuser',fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await  User.findById(userId).select('-password')
        res.send(user);
        
    } catch (error) {  //catch error
        console.error(error.message);
        res.status(500).send("Internal Server Errors");
    }

})



module.exports = router