const  pool  = require("./../db");
let bcrypt = require("bcrypt");
let jsonwebbtoken = require("jsonwebtoken");
let login = async(req,res,next)=>{
    console.log(req.body,"req body");
    try{
        let user = req.body;
        let dbuser = await pool.query("select email,password from users where email = ?",[user.email]);
        dbuser = dbuser[0];
        if(dbuser.length == 0){
            throw new Error("no user exists");
        }
        let exUser = dbuser[0];
        let same = await bcrypt.compare(user.password,exUser.password);
        if(!same){
            throw new Error("Invalid Credentials");
        }
        let token = jsonwebbtoken.sign({email:exUser.email},
        process.env.JWTSECRET,
        {expiresIn:"1h"});
        res.json({
            token:token,
        })
    }
    catch(error){
        next(error);
    }
    
}
let signup = async(req,res,next)=>{
    try{
        // i get info
        let user = req.body;
        let dbuser = await pool.query("select 1 from users where email = ?",[user.email]);
        dbuser = dbuser[0];
        if(dbuser.length > 0){
            throw new Error("email already exists");
        }
        let hashpass = await bcrypt.hash(user.password,10);
        let uc = await pool.query("insert into users(name,email,password) values(?,?,?)",[user.name,user.email,hashpass]);
        res.status(201)
        res.json({
            status:"success",
            data: uc[0],
        })
}
catch(error){
    next(error);
}
}
module.exports = {login,signup};