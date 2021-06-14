const express = require("express");
const auth= require("../controllers/auth");
const validator=require("../validator");
const user= require("../controllers/user");
const {requireSignin }= require("../controllers/auth");

 const router =express.Router();
 router.get("/users",auth.getusers);

 router.post("/Signup",validator.userSignupValidator,auth.signup);
 router.post("/Signin",auth.signin);
 router.get("/Signout",auth.signout);
 router.get("/user/:userId",requireSignin,auth.getuser);

 router.put("/user/:userId",requireSignin,user.updateUser);
router.delete("/user/:userId",requireSignin,user.deleteUser);
router.get("/user/photo/:userId",user.userPhoto);
router.put('/user/follow',requireSignin,user.addFollowing,user.addFollowers);
router.put('/user/unfollow',requireSignin,user.removeFollowing,user.removeFollowers);

 router.param("userId",user.userById);


module.exports=router;

