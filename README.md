# socialmedia-Api
******post routes******
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


*******auth routes***
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

********important functions******
to check user is login =requireSignin();
