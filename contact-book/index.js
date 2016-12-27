var express = require("express");
var mongoose = require("mongoose");
var app = express();

mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

db.once("open", function(){
  console.log("DB connceted");
});

db.on("error", function(err){
  console.log("DB ERROR:", err);
});

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

app.listen(3000, function(){
  console.log("server on");
});
