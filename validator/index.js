exports.createPostValidator=(req,res,next)=>{
	req.check('title',"write a title" ).notEmpty();
	req.check("title","title must have 4 to 150 lenght ").isLength({
		min:4,
		max:150
	});
	req.check("body","write a title" ).notEmpty();
	req.check("body","body must have 4 to 2000 lenght ").isLength({
		min:4,
		max:2000
	});

	const errors=req.validationErrors()

	if(errors){
		const firstError=errors.map((error)=> error.msg)[0]
		return res.status(400).json({error:firstError})
	}
	next();
	

}

exports.userSignupValidator=(req,res,next)=>{
	req.check("name","Name is required").notEmpty();
	req.check("name","body must have 4 to 2000 lenght ").isLength({
		min:4,
		max:2000
	});
	req.check("email","Name is required").notEmpty();
	req.check("email","body must have 4 to 2000 lenght ").matches(/.+\@.+\..+/)
	.withMessage("Email must conatin @").isLength({
		min:4,
		max:2000
	});
	req.check("password","Name is required").notEmpty();
	req.check("password","password must have 4 to 2000 lenght ").matches(/\d/)
	.withMessage("password should conatin numbers").isLength({
		min:4,
		max:2000
	});




	const errors=req.validationErrors()

	if(errors){
		const firstError=errors.map((error)=> error.msg)[0]
		return res.status(400).json({error:firstError})
	}
	next();
}