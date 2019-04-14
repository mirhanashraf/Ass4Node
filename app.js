var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagessRouter=require('./routes/messages');

const createError=require('http-errors');

require('./db')
const cors=require('cors');

var app = express();

debugger
// esta5dmna bdal l middleware da module esmo cors hwa byhandl l mawdo3 da
// app.options('/*',(req,res,next)=>{
//     debugger 
//     res.set({
//         'Access-Control-Allow-Origin':req.headers.origin,
//         'Access-Control-Allow-Method':"POST",
//         'Access-Control-Allow-Headers':"content-type"  
//     })
//     res.end();
// }) 
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/', indexRouter);

app.use('/api/users', usersRouter);
debugger
app.use('/api/messages', messagessRouter);

app.use((req,res,next)=>{
    debugger
    next(createError(404));
})
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.status|| 500);
    res.send(err);
})

module.exports = app;
