const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }

        // Hash the password
        const hashpassword = await bcrypt.hash(password, 10);

        // Create a new user
        
        const user = new User({ email, username, password: hashpassword });

        // Save the user and respond
        await user.save();
        res.status(200).json({message:"Sign Up Successfull"});

    } catch (error) {
        res.status(200).json({ message: "Internal server error" });
    }
});
//sign in

router.post("/signin" , async (req,res) => {
    try {
 const user = await User.findOne({email:req.body.email});
 if(!user){
    res.status(200).json({message:"Please Sign Up First"});
 }
 const isPasswordCorrect = bcrypt.compareSync(
    req.body.password, 
    user.password
);
if(!isPasswordCorrect){
    res.status(200).json({message:" Password is not correct"});
 }
 const{ password, ...others} = user._doc;
 res.status(200).json({ others});

    } catch (error) {
        res.status(200).json({message:"user already exists"});
    }
});

module.exports = router;