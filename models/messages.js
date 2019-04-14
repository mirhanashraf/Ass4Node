const mongoose=require('mongoose');

const msgSchema=new mongoose.Schema({
    // _id:{
    //     type:Number,
    //     required:true
    // },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true   
    },
    text:{
        type:String,
        required:true 
    },
    date:{
        type: Date, 
        default: Date.now
    }
    
});

const msgs = mongoose.model('Messages', msgSchema);

module.exports=msgs;