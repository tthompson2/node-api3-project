const express = require('express');
const posts = require("./postDb");

const router = express.Router();

router.get('/', (req, res, next) => {
  posts.get()
    .then((blog) => {
      res.status(200).json(blog)
    })
    .catch((error) => {
       next(error)
    })
});

router.get('/:id', validatePostId(), (req, res) => {

  posts.getById(req.params.id)
    .then((blog) => {
      res.status(200).json(blog)
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Cannot retrieve post by ID"
      })
    })

});

router.delete('/:id', validatePostId(), (req, res) => {

  post.remove(req.params.id)
    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Wasn't able to delete post"
      })
    })

});

router.put('/:id', validatePostId(), (req, res) => {

  post.update(req.params.id)
    .then((blog) => {
      res.status(200).json(blog)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        meesage: "Wasn't update to update post"
      })
    })
});

// custom middleware

function validatePostId() {
  return (req, res, next) => {
    post.getById(req.params.id)
      .then((post) => {
        if (post) {
          req.post = post;
          // needs to drill down to the data that we want to pass to the functions
          next()
        }
        else {
          res.status(404).json({
            message: "User not found"
          })
        }
      })
      .catch((error) => {
        next(error)
      })
  }
}

module.exports = router;
