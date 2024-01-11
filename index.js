// localhost:2203/insta

const express = require("express");
const app = express();
const port = 2203;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodoverhide = require("method-override");

// Lines For Render index.ejs in browser.
app.use(express.urlencoded({extended: true}));
app.use(methodoverhide("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
// For Exicute style.css in index.ejs

let posts = [
  {
    id: uuidv4(),
    caption: "At Sophos Lab",
    content: "I Like Coding..",
  },
  {
    id: uuidv4(),
    caption: "Ganesh Chaturthi",
    content: "Ganpati Bappa Moriya..",
  }
]

app.get("/insta", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/insta/addpost", (req, res) => {
  res.render("newpost.ejs");
});

app.post("/insta", (req, res) => {
  let {caption, content} = req.body;
  let id = uuidv4();
  posts.push({id, caption, content});
  res.redirect("/insta");
});

app.get("/insta/:id/detail", (req, res) => {
  let {id} = req.params;
  let post = posts.find((bio) => id === bio.id);
  res.render("detail.ejs", {post});
});

app.delete("/insta/:id", (req, res) => { 
  let {id} = req.params;
  posts = posts.filter((bio) => id !== bio.id);
  res.redirect("/insta");
});

app.get("/insta/flash.bot", (req, res) => {
   res.send("Flash : Wellcome Priyanshu");
});


app.listen(port, () => {
    console.log("_____________________________________________________________");
});