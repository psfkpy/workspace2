var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

// DB setting ...
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once("open", function(){
  console.log("DB connceted");
});
db.on("error", function(err){
  console.log("DB ERROR:", err);
});



// Other settings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3


var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Contact = mongoose.model("contact", contactSchema);

// Contact : 모델을 담는 변수
// contact : collection(= tabele)명
// contactSchema : 데이터 스키마


//"로그인 기능이 있는 게시판을 만듭니다.
//모델과 스키마를 구상해 보세요." 라고 물으신다면, "유저(user)모델과 게시글(post)모델이 필요합니다.
//유저스키마는 아이디, 비밀번호가 필요하고, 게시글스키마는 글제목, 글내용, 작성자, 작성시간이 필요합니다."
//뭐 대충 이런식입니다. 이해가 되셨나요?



app.get("/", function(req,res){
  res.redirect("/contacts");
});

app.get("/contacts", function(req, res){
  Contact.find({}, function(err, contacts){
      if(err) return res.json(err);
      res.render("contacts/index", {contacts:contacts});
  })
});

app.get("/contacts/new", function(req,res){
  res.render("contacts/new");
});
// app.get 요청시에는 url 주소체계이며 /contacts 처럼 슬러쉬로 시작되어야 되고
// res.render 요청시에는 views 디렉토리경로체계이며 contacts/index 처럼 슬러쉬 없이 시작되어야 함

app.post("/contacts", function(req,res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  })
});




// Port setting ﻿...
app.listen(3000, function(){
  console.log("server on");
});
