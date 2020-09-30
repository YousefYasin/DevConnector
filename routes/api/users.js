const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrybt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//load inpit Valdiotion
const validateRegisterInput = require("./../../validation/register");
const validateLoginInput = require("./../../validation/login");
const keys = require("./../../config/keys");
const User = require("./../../models/User.js");
const { hash } = require("bcryptjs");
// Get request api/users/test
// test the route
//access public
router.get("/test", (req, res) => res.json({ message: "user Works" }));

// Get request api/users/register
// test  register user
//access public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, name, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      errors.email = "the email is already exist";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", // Rating
        d: "mm", //Deafult
      });

      const newUser = new User({
        name: name,
        email: email,
        avatar,
        password: password,
      });
      bcrybt.genSalt(10, (err, salt) => {
        bcrybt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((result) => {
              console.log("USER created");
              res.status(200).json({ msg: result });
            })
            .catch((err) => {
              console.log("ERROR from register=>", err);
              res.status(500).json({ error: err });
            });
        });
      });
    }
  });
});
// Get request api/users/login
// test  login user
//access public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;

  //find the user
  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else {
      //check the password
      bcrybt.compare(password, user.password).then((ismatch) => {
        if (ismatch) {
          //sign token
          const payload = {
            id: user._id,
            name: user.name,
            avatar: user.avatar,
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
          // res.json({ msg: "succes", user: user });
        } else {
          errors.password = "password incorrect";
          return res.status(400).json(errors);
        }
      });
    }
  });
});
// Get request api/users/current
// test  return current user
//access private
router.get(
  "/current",
  passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(res,'sssssss', req);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  })

module.exports = router;
