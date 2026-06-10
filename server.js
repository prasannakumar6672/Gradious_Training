let app  = require("./app.js");
let dotenv = require("dotenv");
dotenv.config();
app.listen(4001,"localhost",(err) => {
    if(err){
        console.log("error in starting the app");
    }else{
        console.log(`app is started at ${process.env.PORT_NUM}`);
    }
})
//changes updated in prasanna kumar branch