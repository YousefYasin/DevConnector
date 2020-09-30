const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const passport = require('passport');

const user = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
// const { initialize } = require("passport");

const app = express();

//Body parser middleware

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//DB condig

const db = require("./config/keys").mongoURI;

//connect to moongodb

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log("err from mongodb=>", err);
  });

  //passport middeleware
app.use(passport.initialize())
app.use(passport.session());

//passport config
require('./config/passport')(passport)
//use Routess
app.use("/api/users", user);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is working on => ${port}`));
