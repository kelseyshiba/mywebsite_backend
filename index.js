var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var cors = require('cors');
const creds = require('./config');

//const path = require('path');

//Static file 
//declarationapp.use(express.static(path.join(__dirname, 'client/build')));
//production mode
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));  //  
//   app.get('*', (req, res) => {    
//     res.sendfile(path.join(__dirname = 'client/build/index.html'));  
//   })
//   }
//build 
//modeapp.get('*', (req, res) => {  
  //res.sendFile(path.join(__dirname+'/client/public/index.html'));
//})
//start 
//serverapp.listen(port, (req, res) => {  console.log( `server listening on port: ${port}`);})

var transport = {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `
  
    var mail = {
      from: name,
      to: 'developerkelseyshiba@gmail.com',
      subject: 'New Message from Contact Form',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          status: 'fail'
        })
      } else {
        res.json({
         status: 'success'
        })
      }
    })
  })
  
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use('/', router)
  //app.listen(3002)

  // app.all('https://shibadeveloper.com', function(req, res, next) {
  // var origin = req.get('origin'); 
  // res.header('Access-Control-Allow-Origin', origin);
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  // next();
  // })