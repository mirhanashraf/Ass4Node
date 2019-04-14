var express = require('express');
var router = express.Router();

const userModel=require('./../models/users');
const msgModel=require('./../models/messages');

const createError=require('http-errors');
// const jwt=require('jsonwebtoken');

const auth=require('./../middleWares/authentication');
/* GET users listing. */


//3mlnaha post 3shan l user hydenii data
router.post('/login',async (req,res,next)=>{//////////////////////
  debugger
  const{name,password}=req.body;
  const currentUser= await userModel.findOne({name});
  //3mlna hna return 3shan lw m3mltsh kan hynafz l next w ykml b2et l lines l t7t
  if(!currentUser) return next(createError(401)); 
  //3mlna await 3shan btraga3 promise
  let passwordMatch= await currentUser.verifyPassword(password);
  if(!passwordMatch)return next(createError(401));

  const token =await currentUser.generateToken(); 

  res.send({
    profile:currentUser,
    token
  })
})
debugger
// router.use(auth);
//lw l middleware bta3 l authorization 3yza arkbo 3al rout da bs h3ml kda
router.get('/',/*auth ,*/async(req, res, next)=> {///////////////////////
  
debugger
//lw 3mlt hna req.user hla2ii l user l ana 7teto mn l authontication b3d ma 3mlt verify lel token wt2kedt nu sa7

 /*const users=await*/ userModel.find({})
  // .exec() de lw 3ayza a7welha le promise w a3ml await lakn .then de msh promise find feha property esmha .then w .catch
  .then(users=>res.send(users))
  .catch(err=>next(createError(500,err.message)));
  // res.send(users);
});


router.get('/:id', async(req, res, next)=> {//////////////////////////
  
 /* const users=await */
  userModel.findById(req.params.id)
  .then(users=>res.send(users))
  .catch(err=>next(createError(404,err.message)));
  // res.send(users);
});
router.get('/:id/from', async(req, res, next)=> {//////////////////////
  /*const users=await*/
   msgModel.find({from:req.params.id})
  .then(users=>res.send(users))
  .catch(err=>next(createError(404,err.message)));;;
  // res.send(users);
});
router.get('/:id/to', async(req, res, next)=> {/////////////////////////
  /*const users=await*/
  msgModel.find({to:req.params.id})
  .then(users=>res.send(users))
  .catch(err=>next(createError(404,err.message)));
  // res.send(users);
});
router.post('/', function(req, res, next) {
  debugger
  const user=new userModel(req.body);
  //hna 3mlnaha .save msh create 3shan yndah 3la pre save yhash l pasword
  //lakn lw kant .create fl create bt3ml save lw7daha f msh h3rf bt3mlha emta bzabt 
  //w tela3 create bttrigger l function ely esmaha save y3nii bardo mmkn a3mlha
  user.save()
  .then(user=>{
    res.redirect('/')
  })
  .catch(err=>{
    next(createError(400),err.message);
  })
});



module.exports = router;
