const body_parser = require ("body-parser"); 
const mongoose = require("mongoose"); 
const express = require ('express');  
app = express (); 

//app config
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true, useUnifiedTopology: true }); 
app.set("view engine", "ejs"); 
app.use(express.static("public")); 
app.use(body_parser.urlencoded({extended: true})); 

// Mongoose/model config
let blog_schema = new mongoose.Schema({ 
    title: String, 
    image: String, 
    body: String, 
    created: { type: Date, default: Date.now}
})

let Blog = mongoose.model("Blog", blog_schema); 
//restful routes
 

app.get("/", (req, res) => { 
    res.redirect("/blogs"); 
  }); 
  
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => { 
      if (err){ 
          console.log("Error!!"); 
      } else { 
          res.render("index", {blogs: blogs}); 
      }
  }); 
}); 


app.listen(3000, () => { 
    console.log("yelp server has started"); 
});