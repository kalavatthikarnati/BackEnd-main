import userModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import validator from "validator";
import jwt from 'jsonwebtoken';

//Login User

const LoginUser = async (req, res) => {
   console.log("RAW BODY:", req.body); // debug
  const { email, password } = req.body;
  console.log("Enter the email and password",req.body);
  
  try {
    //check if user is exist
    const user = await userModel.findOne({ email });
    console.log("Enter the email",user);

    if (!user) 
      {
        return res.json({ "success": false, "message": "user not registered ,please register first to login"})
       }
    else 
     {
      //password matching
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
         {
           return res.json({ success: false, message: "Invalid Credential" })

         }

           const token = createToken(user._id) 
           console.log(token);
           res.json({ "success": true, "message": "user register successfully", "token": token });
      
        }
               
         }
    catch (error)
     {
       console.log(error);
        res.json({ "success": false, "message": " server error" })
     }

};


const createToken = (id) =>{
  return jwt.sign({id},process.env.JWT_SECRET)
}
//Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    //checking is user already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ "success": false, message: "user already exists" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email", });

    }

    // 3. Validate password length
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long", });

    }
    else {

      let salt = await bcrypt.genSalt(10);
      let hashpassword = await bcrypt.hash(password, salt);
      const newuser = new userModel({
        name: name,
        email: email,
        password: hashpassword
      })
      const user = await newuser.save();

     
     
      const token = createToken(user._id)
      console.log(token);
      res.status(200).json({ "success": true, "message": "user register successfully", "token": token });

    }
  } catch (error)
     {
       console.log(error);
       res.json({success:false,message:"Error"});
     }

};


 
export { registerUser, LoginUser };


