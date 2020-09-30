const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//post model
const Post = require("./../../models/Post");
const Profile = require("./../../models/Profile");
//valedation
const validatePostInput = require("./../../validation/post");
// Get request api/posts/test
// test the route
//access public

router.get("/test", (req, res) => res.json({ message: "Post Works" }));
// route GET request api/posts
// test Get posts
//access piblic
router.get("/", (req, res) => {
  Post.find()
    .sort({ data: -1 })
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => res.status(404).json({ nopostfound: "No posts found " }));
});

// route GET request api/posts/:id
// test Get posts
//access piblic
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.json(post);
    })
    .catch((err) =>
      res.status(404).json({ nopostfound: "No post found with this id" })
    );
});
// route post request api/posts
// test create post
//access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check valedation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    });
    newPost.save().then((post) => {
      res.json(post);
    });
  }
);
// route Delete request api/posts/:id
// test delete post
//access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          //check for post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ notauthrzed: "User not authorized" });
          }
          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);
// route post like api/posts/like/:post_id
// test add like post
//access private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          //add user id to like
          post.likes.unshift({ user: req.user.id });
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);
// route post remove like api/posts/unlike/:post_id
// test remove like post
//access private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post yet" });
          }
          //get remove index
          const removeIndex = post.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          //splice out of array
          post.likes.splice(removeIndex, 1);

          //save
          post.save().then((post) => res.json(post));
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);
// route post  comment api/posts/comment/:post_id
// test add comment post
//access private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check valedation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id).then((post) => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
      };
      //Add to comments ARRAY
      post.comments.unshift(newComment);

      //save
      post
        .save()
        .then((post) => {
          res.json(post);
        })
        .catch((err) =>
          res.status(404).json({ postnotfound: "No post found" })
        );
    });
  }
);

// route delete  comment api/posts/comment/:id/comment_id
// test remove comment post
//access private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then((post) => {
        //check if the comment exists
        if (
          post.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "comment does not exist" });
        }
        const removeIndex = post.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        //splice out of array
        post.comments.splice(removeIndex, 1);

        //save
        post.save().then((post) => res.json(post));
      })

      .catch((err) => res.status(404).json({ postnotfound: "No post found" }));
  }
);
module.exports = router;
