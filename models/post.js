const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const postSchema=new mongoose.Schema({
	title:{
		type: String,
		require:"titile is required for",
		minlength:4,
		maxLength:150
	},
	body:{
		type:String,
		require:"body is required",
		minlength:4,
		maxLength:200
	},
	photo:{
		data:Buffer,
		contentType:String

	},
	postedBy:{
		type:mongoose.Schema.Types.Mixed,
		ref:"Users"
		

	},
	created:{
		type:Date,
		default:Date.now

	}


});

module.exports=mongoose.model("Post",postSchema);
