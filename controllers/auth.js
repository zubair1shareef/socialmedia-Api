const User = require("../models/user");
//const jwt= require("jsonwebtoken");
var jwt = require('jsonwebtoken');
const dotenv =require('dotenv');
dotenv.config();

const expressJwt = require('express-jwt');
const JWT_SECRET="SJKFB3KJB32KRB32VKJN37"
	
	

	//env is not workinng here
	

exports.getusers=(req, res)=> {
	const user= User.find().select("name email created followers following likes ")
	
	.then(user=>{
		res.json({user})
	})
	.catch(err => console.log(err));
 
};


exports.signup= async(req,res)=>{
	const userExists=await User.findOne({email:req.body.email});

	if(userExists) return res.status(403).json({
		error:"Email is taken"
	})
		const user =await new User(req.body	,req.body.likes=0,req.body.posts=0)
		await user.save();
		res.status(200).json({user});

};


//SINGIN
exports.signin=(req,res)=>{

	const {email, password}=req.body;
	User.findOne({email},(err,user)=>{
		if(err ||! user){
			return res.status(401).json({
				error:"email dont exists"
			});
		}



    //for signin validation check
	if(!user.authenticate(password)){
		return res.status(401).json({
			error:"email and password not match"
		});
	}
	//adding token in  cookie 
	//const token=jwt.sign({ _id : user._id},process.env.JWT_SECRET)

	const token=jwt.sign({ _id : user._id},JWT_SECRET);

	res.cookie("t",token,{expire:new Date()+1000})

	const {_id,name,email,followers,likes}=user;
	return res.json({token,user:{_id,email,name,followers,likes}})

	});


};


exports.signout=(req,res)=>{
	res.clearCookie("t");
	return res.json({message:"signout successfully"});

}

exports.requireSignin=expressJwt({
	secret:JWT_SECRET,userProperty:"auth", algorithms: ['HS256']
});

exports.getuser=(req,res)=>{
	req.profile.hashed_password=undefined;
	req.profile.salt=undefined;
	return res.json(req.profile)
};

