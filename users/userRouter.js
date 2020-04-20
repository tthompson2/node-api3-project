const express = require('express');
const users = require("./userDb");
const router = express.Router();

router.post('/', (req, res, next) => {

  users.insert(req.body)
    .then((blog) => {
      res.status(200).json(blog)
    })
    .catch((error) => {
      next(error)
    })

});

router.post('/:id/posts', validatePost(), (req, res) => {
  // do your magic!
});

router.get('/', (req, res, next) => {

  users.get()
    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((error) => {
      next(error)
    })

});

router.get('/:id', validateUserId(), (req, res) => {

  users.getById(req.params.id)
    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retreiveing the user by ID"
      })
    })

});

router.get('/:id/posts/:postID', validateUserId(), (req, res) => {

  users.getUserPosts(req.params.postID)
    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({
        message: "Error retreiving the User's post by id"
      })
    })

});

router.delete('/:id', validateUserId(), (req, res) => {

  user.remove(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {

      res.status(500).json({
        message: "Unable to delete post at this ID"
      })

    })


});

router.put('/:id', validateUserId(), (req, res) => {

  user.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Unable to update user at this ID"
      })
    })

});

//custom middleware

function validateUserId() {

  return (req, res, next) => {
    users.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next()
        } else {
          res.status(404).json({
            message: "User not found",
          })
        }
      })
      .catch((error) => {
        next(error)
      })
  }

}

function validateUser() {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({
        message: "the json body is incorrectly formatted"
      })
    }
    next()
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({
        message: "the json body is incorrectly formatted"
      })
    }
    next()
  }
}

module.exports = router;
