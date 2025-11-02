import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {generateToken} from "../lib/util.js"
import cloudinary from "../lib/cloudinary.js"

export const signup= async (req,res)=>{
    const{fullName,email,password}=req.body
try{
    if(!fullName || !email || !password) return res.status(400).json({message:"fill all the blanks"});
if(password.length<6) return res.status(400).json({message:"password lenght insufficent"});
const user=await User.findOne({email})
if(user) return res.status(400).json({message:"email already exists"});
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)
const newUser=new User(
    {
        fullName,
        email,
        password:hashedPassword
    }
)
if(newUser){
generateToken(newUser._id,res)
await newUser.save();
res.status(201).json({
    _id:newUser._id,
    fullName: newUser.fullName,
        email: newUser.email,
        profilepic: newUser.profilepic,
});
}
else{
    res.status(400).json({message:"Invalid user"});
}
}
catch(error){
console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
}
};

export const login=async (req,res)=>{
const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout=async (req,res)=>{
try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilepic, fullName } = req.body;
    const userId = req.user._id;

    const updateData = {};

    // Handle profile picture update
    if (profilepic) {
      // Check if it's an emoji (single character or short string)
      if (profilepic.length <= 5) {
        updateData.profilepic = profilepic;
      } else {
        // It's a base64 image, upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilepic);
        updateData.profilepic = uploadResponse.secure_url;
      }
    }

    // Handle full name update
    if (fullName) {
      updateData.fullName = fullName;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth=async (req,res)=>{
     try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const googleCallback = async (req, res) => {
  try {
    // Generate JWT token for the authenticated user
    generateToken(req.user._id, res);
    
    // Redirect to frontend with success
    res.redirect(`${process.env.CLIENT_URL}?auth=success`);
  } catch (error) {
    console.log("Error in googleCallback controller", error.message);
    res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
  }
};