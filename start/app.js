const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const validator = require("validator");
const nodemailer = require("nodemailer");
const app = express();
const port = 8001;


app.use(morgan("dev"));
app.use(bodyParser.json());


app.post("/email", (req, res, next) => {
  if(!validator.isEmail(req.body.email)){
    const err= new Error("Invalid email address.");
    err.status = 400;
    return next(err);
  }
  
  //Start Here

});

//Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error"
    }
  })
})

app.listen(port, () => {
  console.log(`Server Running on port:${port}`);
})