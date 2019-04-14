var express = require('express');
var router = express.Router();
const createError=require('http-errors');

const msgModel=require('./../models/messages');
const auth=require('./../middleWares/authentication');
/* GET users listing. */
debugger
// router.use(auth);

router.get('/', /*async*/(req, res, next)=> {
   /* const msgs=await*/
   debugger
  msgModel.find({})
  .then(msgs=>res.send(msgs))
  .catch(err=>next(createError(500,err.message)));
  // res.send(msgs);
});
router.get('/:id', /*async*/(req, res, next)=> {
  debugger
    /*const msg=await*/
    msgModel.findById(req.params.id)
    .then(msgs=>res.send(msgs))
    .catch(err=>next(createError(404,err.message)));
    // res.send(msg);
  });
  router.patch('/:id', function(req, res, next){
    debugger
    msgModel.findByIdAndUpdate(req.params.id,req.body)
    .then(msgs=>res.send('Updated'))
    .catch(err=>next(createError(500,err.message)));
  });
  router.delete('/:id', function(req, res, next){
    debugger
    msgModel.findByIdAndDelete(req.params.id)
    .then(msgs=>res.send('deleted'))
    .catch(err=>next(createError(500,err.message)));
    
 });
 router.post('/', /*async*/(req, res, next)=> {
  debugger
  /*await*/ msgModel.create(req.body)
  .then(msgs=>res.redirect('/'))
  .catch(err=>next(createError(400,err.message)));

  
});
module.exports = router;
