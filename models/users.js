const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
//bta5od function msh btrga3 promise wt5aleha trga3 promise
const util=require('util');
//bdeha el function ely msh btrga3 promise ftrga3 promise (jwt.sign)
const signPromise=util.promisify(jwt.sign);
const secretKey="hello";
const verifyToken=util.promisify(jwt.verify);

const saltrounds=7;
// const myplaintext='whvcjhm';

// bcrypt.hash(myplaintext,saltrounds)
// .then(hashedpass=>{
//      debugger;
// }).catch(err=>{
//     debugger
// })



const userSchema = new mongoose.Schema({
    // _id: {
    //     type: Number,
    //     required: true,
    // },
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        unique: true,
        required: 'Email address is required',
        // validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required:true,
        hidden:true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'N/A'],
    },
    contry: {
        type: String,
        required: true,
    },
}, 
{
    autoIndex: true,
    toJSON:{
        transform:(doc ,ret, options)=>{
            delete ret.password;
            return ret;
        },
    }
    
});

//bcrypt de btrga3 promise f 3mlt t7t lma ndaht 3al func await
const hashPassword=(currUserPass)=>bcrypt.hash(currUserPass,saltrounds);
  
userSchema.method('verifyPassword',function(pass){
const currUser=this;
return bcrypt.compare(pass,currUser.password);
});


userSchema.method('generateToken',function(){

    const currUser=this;
    return signPromise({_id:currUser._id},secretKey,{expiresIn:'2h'})

});

// userSchema.options.toObject


//this hna hwa l model
userSchema.static('verifyToken',async function(token){
    const userModel=this;
    //lw 3rf yfok l token hyrga3 l body bta3 l token l hwa l payload lw m3rfsh hydrb error
    const decoded=await verifyToken(token,secretKey);
    const userId=decoded._id;
    return userModel.findById(userId);
});


//b3ml hna function 3adya 3shan 3ayza l this bta3 l user l 3aml login delwa2tii 
//lw 3mlt promis mfehash this f msh h3raf amsk l user l 7aly
userSchema.pre('save',async function(){
    const currentUser=this; 
    // debugger;
    if(currentUser.isNew )
    {
        currentUser.password=await hashPassword(currentUser.password)
    }
    // console.log(this);

});

const User = mongoose.model('Users', userSchema);

module.exports = User;