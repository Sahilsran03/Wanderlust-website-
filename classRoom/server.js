const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const flash= require("connect-flash");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(flash());

const sessionOtion={
    secret:"mysecretstring",resave:false,saveUninitialized:true
};

app.use(session(sessionOtion));
app.use((req,res,next)=>{
    res.locals.msg=req.flash("success");
    res.locals.err=req.flash("error");
    next();
})

app.get("/test",(req,res)=>{
    res.send("test scessful");
})

app.get("/count",(req,res)=>{
    if (req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    res.send(`count is${req.session.count}`);
})

app.get("/register",(req,res)=>{
    let {name="anny"}= req.query;
    if(name==="anny"){
        req.flash("error","user not register")
    }
    else{
        req.flash("success","user are login scessfuly")
    }
    res.redirect ("/hello");
})

app.get("/hello",(req,res)=>{

    res.render("index.ejs",{name:req.session.name});
})




app.listen(5405, () => {
    console.log("server is listen")
});