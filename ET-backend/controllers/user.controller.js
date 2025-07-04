const UserModel = require("../models/user.model");
require("dotenv").config();
let bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const sendMail = require("../utils/sendMail");



// user Register
let userRegister = async (req, res) => {
  try {
    let { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await UserModel.findOne({ email: email });

    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already exiest",
      });
    }

    let hasedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ ...req.body, password: hasedPassword });


    const html = `
      <h3>Welcome, ${firstName} 👋</h3>
      <p>Thanks for joining <strong>Expense Tracker</strong>!</p>
      <p>Start adding and managing your expenses like a pro 💼.</p>
      <br/>
      <p>Regards,<br/>The Expense Tracker Team</p>
    `;

    await sendMail(email, '🎉 Welcome to Expense Tracker!', html);

    res.json({
      success: true,
      message: "User register successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "User registraction failed",
      error: error.message,
    });
  }
};


// User Login
let userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered",
      });
    }

    let isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "email or password is incorrect",
      });
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"});
    await UserModel.findByIdAndUpdate(user._id, {token})

    const cookieOptions = {
            expiresIn: "1d",
            httpOnly: true,
            secure: true,       
            sameSite: 'none', 
        };
        
        res.cookie('token', token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: "User login successfully",
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "User registraction failed",
      error: error.message,
    });
  }
};


// logout user

const logoutUser = async (req, res) =>{
    return res.status(201).cookie('token' , "" , {expaireIn: new Date(Date.now())}).json({
        success: true,
        message: "User logged out successfully",
    })
}

module.exports = {
  userRegister,
  userLogin,
  logoutUser,
};
