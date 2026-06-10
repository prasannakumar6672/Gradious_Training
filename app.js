let express = require("express");
let authRouter = require("./routes/authRoutes.js");
let app = express();
app.use(express.json());


app.use("/auth",authRouter);


module.exports = app;