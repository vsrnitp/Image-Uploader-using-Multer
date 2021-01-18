var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        var timestamp  = Date.now();
        //console.log(timestamp);
      cb(null, timestamp + '.jpg') //Appending .jpg
    }
  })
  
  var upload = multer({ storage: storage });


var app = express();

//using body-parser...
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//setting up the view engine....
app.set("view engine","ejs");

//telling express where are we keeping our index.js...
app.set("views",__dirname+"/views");

app.get('/',(req,res)=>{
    res.render("index");
});

app.post('/upload',upload.single('avatar'),(req,res)=>{
    res.send('Image uploaded successfully!');
})






app.listen(8080,(err)=>{
    if(err) console.log(err);
    else{
        console.log('App running on port 8080');
    }
})
