let express = require('express');
const { userRegister, userLogin, logoutUser } = require('../controllers/user.controller');

let userRouter = express.Router();


userRouter.post("/register", userRegister);
userRouter.get("/login", userLogin);
userRouter.get("/logout", logoutUser);


module.exports = userRouter;