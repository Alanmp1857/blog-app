const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const {checkForAuthenticationCookie} = require("./middlewares/authentication");

const Blog = require('./models/blog');

const userRoutes = require('./routes/user');
const blogRoutes = require('./routes/blog');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blogify')
.then(() => console.log("Connected to DB"))
.catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

app.get("/", async(req,res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
      user: req.user,
      blogs: allBlogs
    });
})

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});