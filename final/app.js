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
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "MAILTRAP_SMTP_USERNAME",
        pass: "MAILTRAP_SMTP_PASSWORD"
    }
  });

  const mailOptions= {
    from: '"Test Server" <test@example.com>',
    to: req.body.email,
    subject: "Email Test",
    text: "This is an email test using Mailtrap.io"
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if(err){
        console.log(err);
        return reject();
    }
    console.log("Info: ", info);
    res.json({
      message: "Email successfully sent."
    });
  });

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