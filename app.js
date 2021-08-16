const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const nodemailer=require("nodemailer");
const mongoose=require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const articleContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

//transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "soniaprasad66@gmail.com",
    pass: "Soniaprasad1403"
  }
})

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/article", function(req, res){
  res.render("article", {articleContent: articleContent});
});

app.get("/login",function(req,res){
  res.render("login");
})

app.post("/login",async function(req,res){
  var mailOptions = {
    from: "soniaprasad66@gmail.com",
    to: req.body.mail,
    subject: "verfication code",
    html: "<h4>Hi " + req.body.userName + ", Thanks, for signing up our page.</h4>"
  };
  mail(mailOptions)
  res.render("verification");
})

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  
  });

function mail(mailOptions){
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);
    }
    else{
      console.log("e-mail sent!!")
    }
  })
}

// cards

app.get("/card-1",function(req,res){
  res.render("card-1")
})

app.get("/card-2",function(req,res){
  res.render("card-2")
})

app.get("/card-3",function(req,res){
  res.render("card-3")
})

app.get("/card-4",function(req,res){
  res.render("card-4")
})

app.get("/card-5",function(req,res){
  res.render("card-5")
})

app.get("/card-6",function(req,res){
  res.render("card-6")
})


// // DeletingDB

// Post.deleteOne({_id:"60b6014879a4602af879d557"} ,function(err){
//   if(err){
//     console.log(err)
//   }
//   else{
//     console.log("successsful")
//   }
// })


app.listen(5000, function() {
  console.log("Server started on port 5000");
});
