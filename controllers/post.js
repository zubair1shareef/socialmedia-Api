const Post=require('../models/post');
const formidable = require("formidable");
const fs =require("fs")//filesystem


exports.getpost=(req, res)=> {
	const posts= Post.find()
	.select("_id title body postedBy")
	.then(posts=>{
		
		res.json({posts})
	})
	.catch(err => console.log(err));
 
};

exports.createPost=(req,res,next) =>{
	//for image 
	let form =new formidable.IncomingForm()
	form.keepExtensions=true;
	form.parse(req,(err,fields,files)=>{
		if(err){
			return res.status(400).json({
				error:"image could not be uploaed"
			});
		}
		let post = new Post(fields);
		req.hashed_password=undefined;
	    req.salt=undefined;
		post.postedBy=req.profile;
		console.log(req.profile)
		if(files.photo){
			post.photo.data=fs.readFileSync(file.photo.path)
			post.photo.contentType=files.photo.type
		}
		post.save((err,result)=>{
			if(err){
				return res.status(400).json({
					error:err
				})
			}
			res.json(result)
		})

	});

	
}


exports.postsByUser=(req,res)=>{
		Post.find({postedBy:req.profile})
				.sort("_created")
		.exec((err,posts)=>{
			if(err){
				return res.status(400).json({error:err});
			}
			res.json(posts);
		});
};


exports.postById=(req,res,next,id)=>{
	Post.findById(id)
	//.populate("postedBy","_id name")
	.exec((err,post) =>{
		if(err||!post){
			return res.status(400).json({
				error:err
			});
		}
		req.post=post;
		next();
	})
}

exports.isPoster=(req,res,next)=>{
	let isPoster=req.post && req.auth ;
	if(!isPoster){
		return res.status(403).json({
			error:"User is not authorized"
		});
	}
   next();
};

exports.deletePost=(req,res)=>{
	let post=req.post
	post.remove((err,post)=>{
		if(err){
			return res.status(400).json({
				error:err
			});
		}
		res.json({
			message:"Post deleted sucessfully"
		});
	});
};