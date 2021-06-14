const mongoose = require("mongoose");
const uuidv1=require("uuid");
//import { createHmac } from 'crypto';
const crypto = require("crypto");
const {ObjectId} =mongoose.Schema;

const userSchema=new mongoose.Schema({
	name:{
		type: String,
		required:true,
		min:4,max:30,
		trim: true
	},
	email:{
		type: String,
		required:true,
		min:4,max:30,
		trim: true

	},
	hashed_password: {
		type:String,
		required:true
	},
	
	likes:{
		type:Number

	},
	posts:{
		type:Number

	},

	salt:String,

	created:{
		type:Date,
		default:Date.now
	},
	bio:{
		type:String,
		
	},

	updated:Date,
	photo:{
		data:Buffer,
		contentType:String

	},
	following:[{
		type:ObjectId,
		ref:"Users"}],
	followers:[{
		type:ObjectId,
		ref:"Users"}]
	
	


});


userSchema.virtual('password')
.set(function(password){
	
	this._password=password;
	this.salt=uuidv1.v1();
	this.hashed_password=this.encryptPassword(password);
})
.get(function(){
	return this._password;

} );

userSchema.methods={
	authenticate:function(plaintext){
		return this.encryptPassword(plaintext)===this.hashed_password;
	},



	encryptPassword:function(password){
		if(!password) return "";
		else
		return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
		
	}
}


module.exports=mongoose.model("user",userSchema);