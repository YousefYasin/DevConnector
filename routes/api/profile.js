const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { request } = require("express");
const Profile = require("./../../models/Profile");
const User = require("./../../models/User");

//load validation
const validateProfileInput = require("./../../validation/profile");
const validateExperienceInput = require("./../../validation/experience");
const validateEducationInput = require("./../../validation/education");
// Get request api/profile/test
// test the route
//access public
router.get("/test", (req, res) => res.json({ message: "Profile Works" }));

// Get request api/profile
// GET current user profile
//access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "there is no profile";
          return res.status(400).json(errors);
        }
        res.status(200).json(profile);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// GET request api/profile/all
// GET  all profiles
//access public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "there are no profiles ";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ profile: "there are no profiles " });
    });
});

// GET request api/profile/handle/:handle
// GET  user profile by handle
//access public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// GET request api/profile/user/:user_id
// GET  user profile by user ID
//access public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "there is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch((err) => {
      res.status(404).json({ profile: "there is no profile for this user" });
    });
});
// post request api/profile
// post create or edit user profile
//access private
router.post(
  "/",
  passport.authenticate("jwt", { sesssion: false }),
  (req, res) => {
   
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }
    //Get fields
    const profileFields = {};
    profileFields.user = req.user;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // skills split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        //Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then((profile) => {
          res.json(profile);
        });
      } else {
        //create new one

        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "that handle already exists";
            res.status(400).json(errors);
          }
          //save profile
          new Profile(profileFields).save().then((profile) => {
            res.json(profile);
          });
        });
      }
    });
  }
);
// post request api/profile/experience
// post  add experience to  profile
//access private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      //add to exp array
      profile.experience.unshift(newExp);
      profile.save().then((profile) => {
        res.json(profile);
      });
    });
  }
);
// post request api/profile/education
// post  add education to  profile
//access private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      };
      //add to edu array
      profile.education.unshift(newEdu);
      profile.save().then((profile) => {
        res.json(profile);
      });
    });
  }
);

// DELETE request api/profile/expreience/:exp_id
// DELETE  add exp from  profile
//access private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      //GET remove index
      const removeIndex = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id);
      //splice out of array
      profile.experience.splice(removeIndex, 1);
      profile
        .save()
        .then((profile) => {
          res.json(profile);
        })
        .catch((err) => {
          res.status.json(err);
        });
    });
  }
);

// DELETE request api/profile/education/:exp_id
// DELETE  add edu from  profile
//access private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      //GET remove index
      const removeIndex = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id);
      //splice out of array
      profile.education.splice(removeIndex, 1);
      profile
        .save()
        .then((profile) => {
          res.json(profile);
        })
        .catch((err) => {
          res.status.json(err);
        });
    });
  }
);
// DELETE request api/profile
// DELETE   profile
//access private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ succes: true });
      });
    });
  }
);
module.exports = router;
