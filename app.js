const body_parser = require ("body-parser"); 
const method_override = require('method-override'); 
const express_sanitizer = require("express-sanitizer"); 
const mongoose = require("mongoose"); 
const express = require ('express'); 
app = express (); 

//app config
mongoose.connect("mongodb://heroku_x6k50747:ot4t8uslpiie7n1g4mb8mfl4m6@ds061621.mlab.com:61621/heroku_x6k50747", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs"); 
app.use(express.static("public")); 
app.use(body_parser.urlencoded({extended: true}));
app.use(express_sanitizer()); //the following line has to be after body parser
app.use(method_override("_method")); 

// Mongoose/model config
let blog_schema = new mongoose.Schema({ 
    title: String, 
    image: String, 
    body: String, 
    created: { type: Date, default: Date.now}
})

let Blog = mongoose.model("Blog", blog_schema); 
//restful routes
 
// homepage 
app.get("/", (req, res) => { 
    res.redirect("/blogs"); 
  }); 

  // index route 
app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => { 
      if (err){ 
          console.log("Error!!"); 
      } else { 
          res.render("index", {blogs: blogs}); 
      }
  }); 
}); 

// new route 
app.get("/blogs/new", (req, res) => { 
    res.render("new"); 
}); 

// create route
app.post("/blogs", (req, res) => { 
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body); 
    Blog.create(req.body.blog, (err, new_blog) => { 
        if (err){ 
            res.render("new"); 
        } else { 
        // redirect to the index
        res.redirect("/blogs"); 
        }
    });   
}); 

//show route
app.get("/blogs/:id", (req, res)=> { 
    Blog.findById(req.params.id, (err, found_blog) => { 
        if (err){ 
            res.redirect("/blogs"); 
        } else { 
            res.render("show",{ blog: found_blog}); 
        }
    });
}); 

//edit route
app.get("/blogs/:id/edit", (req, res) => { 
    Blog.findById(req.params.id, (err, found_blog) => { 
       if (err){ 
           res.redirect("/blogs"); 
       } else { 
           res.render("edit", {blog: found_blog}); 
       }
    });
});

//update route 
app.put("/blogs/:id", (req, res) => {
 req.body.blog.body = req.sanitize(req.body.blog.body); 
 Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updated_blog) => { 
    if (err) { 
        res.redirect("/blogs"); 
    } else { 
        res.redirect("/blogs/" + req.params.id); 
    }
   });
}); 

//DELETE ROUTE 
app.delete("/blogs/:id", (req, res) => { 
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, (err, delete_blog) => { 
       if(err){ 
           res.redirect("/blogs"); 
       } else { 
           res.redirect("/blogs"); 
       }
    });
}); 


app.listen(process.env.PORT || 3000, () => { 
    console.log("yelp server has started"); 
});