const User = require("../models/user");
const _=require("lodash");
const formidable = require("formidable");//for image
const fs =require("fs")//filesystem


exports.hasAuthorization=(req,res,next)=>{
	const authorized=req.profile && req.auth && req.profile._id===req.auth._id
	if(!authorized){
		return res.status(403).json({
			error:"user is not authorized to perform this act"
		})
	}
}
exports.userById=(req,res,next,id)=>{

	User.findById(id).
	//populate('following','_id name')	.populate('followers','_id name').
	
	exec((err,user)=>{

		if(err ||!user){
			return res.status(400).json({
				error:"user not found"
			})
		}
		console.log("hello form userbyid")

		req.profile=user;
		next();
	})
};

// exports.updateUser=(req,res,next)=>{
// 	let user =req.profile;0
// 	user=_.extend(user,req.body);
// 	user.updated=Date.now();
// 	user.save((err)=>{
// 		if(err){
// 		return res.status(400).json({
// 			error:"you are not authorizedto update or perform this oeration"
		
// 		})
// 	 }
// 	 user.hashed_password=undefined;
// 	 user.salt=undefined;
// 	 res.json({user});
// 	})
// }
/*exports.updateUser=(req,res,next)=>{
	let form =new formidable.IncomingForm()
	form.keepExtensions=true
	form.parse(req,(err,fields,files)=>{
		if(err){
			return res.status(400).json({
				error:"photo cant be uploaded"
			})
		}
		//for saving user
		let user=req.profile
		user=_.extend(user,fields)
		user.updated=Date.now()
		
		if(files.photo){
			user.photo.data=fs.readFileSync(files.photo.path)
			user.photo.contentType=files.photo.type
		}
		user.save((err,result)=>{
			if(err){
				return res.status(400).json({
					error:err
				})
			}
			user.hashed_password=undefined;
			user.salt=undefined;
			res.json(user);
		})
	})
}*/
exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm();
    // console.log("incoming form data: ", form);
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Photo could not be uploaded'
            });
        }
        // save user
        let user = req.profile;
        // console.log("user in update: ", user);
        user = _.extend(user, fields);

        user.updated = Date.now();
        // console.log("USER FORM DATA UPDATE: ", user);

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            // console.log("user after update with formdata: ", user);
            res.json(user);
        });
    });
};
exports.userPhoto=(req,res,next)=>{
	if(req.profile.photo.data){
		res.set("Content-Type",req.profile.photo.contentType);
		return res.send(req.profile.photo.data)
	}
	next()
};



exports.deleteUser=(req,res,next)=>{
	let user=req.profile;
	user.remove((err,user)=>{
		if(err){
			return res.status(400).json({
				error:err
			});
		}
		
	    //res.json({user});
	    res.json({message:"user deleted sucessfullly"});
	});
};

exports.addFollowing=(req,res,next)=>{
	console.log("in addfollwers");
	User.findByIdAndUpdate(req.body.userId,
		{$push:{following:req.body.followId}},
		(err,result)=>{
		if(err){
			
			
			return res.status(400).json({error:err,})
		}
		next()
	})
};
exports.addFollowers=(req,res,next)=>{
	console.log("in addfollwers");
	User.findByIdAndUpdate(req.body.followId,
		{$push:{followers:req.body.userId}},
		{new:true}
		
		).
		populate('following','_id name')
		populate('followers','_id name')
		.exec((err,result)=>{
			if(err){
				
				return res.status(400).json({error:err})
			}
			result.hashed_password=undefined;
			result.salt=undefined;	
			res.json(result)

		})
};


exports.removeFollowing=(req,res,next)=>{
	User.findByIdAndUpdate(req.body.userId,
		{$pull:{following:req.body.unfollowId}},
		(err,result)=>{
		if(err){
			return res.status(400).json({error:err})
		}
		next()
	})
};
exports.removeFollowers=(req,res,next)=>{
	User.findByIdAndUpdate(req.body.unfollowId,
		{$pull:{followers:req.body.userId}},
		{new:true}
		).
		populate('following','_id name')
		populate('followers','_id name')
		.exec((err,result)=>{
			if(err){
				return res.status(400).json({error:err})
			}
			result.hashed_password=undefined;
			result.salt=undefined;	
			res.json(result)

		})
};