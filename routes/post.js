const express = require("express");
const postController= require("../controllers/post");
const {requireSignin}= require("../controllers/auth");
const validator=require("../validator")
const user= require("../controllers/user");

 const router =express.Router();
 router.get("/",postController.getpost);


 router.post("/Post/new/:userId",
 	requireSignin,
 	postController.createPost
 	,validator.createPostValidator);


 router.get("/posts/by/:userId",
 	requireSignin,postController.postsByUser);

 router.delete("/post/:postId",requireSignin,postController.isPoster,postController.deletePost);

router.param("userId",user.userById);
router.param("postId",postController.postById);


module.exports=router;

