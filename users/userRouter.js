const express = require('express');
const users = require("./userDb");
const router = express.Router();

router.post('/', (req, res) => {
  
   users.insert(req.body)
   .then((blog) => {
     res.status(200).json(blog)
   })
   .catch((error) => {
     console.log(error);
     res.status(500).json({
       message: "Unable to post"
     })
   })

});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {


  users.get()
  .then((blog) => {
    res.status(200).json(blog);
  })
  .catch((error) => {
     console.log(error)
     res.status(500).json({
       message: "Error retreiveing the users"
     })
  })

});

router.get('/:id', (req, res) => {
  
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

router.get('/:id/posts/:postID', (req, res) => {
  
  users.getUserPosts(req.params.postID)
  .then((blog) => {
    res.status(200).json(blog);
  })
  .catch((error) => {
     res.status(500).json({
       message: "Error retreiving the User's post by id"
     })
  })

});

router.delete('/:id', (req, res) => {
  
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

router.put('/:id', (req, res) => {
  
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

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
