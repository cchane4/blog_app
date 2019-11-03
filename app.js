const body_parser = require ("body-parser"); 
const mongoose = require("mongoose"); 
const express = require ('express');  
app = express (); 

mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true, useUnifiedTopology: true }); 
app.set("view engine", "ejs"); 
app.use(express.static("public")); 
app.use(body_parser.urlencoded({extended: true})); 
 

app.listen(3000, () => { 
    console.log("yelp server has started"); 
});