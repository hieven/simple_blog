var express = require('express');
var router  = express.Router();

var Post    = require('../models/post');


/*  POST middleware */
router.use(function (req, res, next) {
  console.log("This is Post middleware!");

  next();
});

/* INDEX */
router.get('/', function(req, res) {
  console.log("INDEX POST");

  Post.find(function(err, posts) {
    if (err) res.send(err);

    res.json(posts);
  });
});

/* NEW*/
router.get('/new', function(req, res) {
  console.log('NEW POST');

  res.json({ message: "NEW PAGE" });
});

/* CREATE */
router.post('/new', function(req, res) {
  console.log('CREATE POST');

  Post.findById(req.params.post_id, function(err, post) {
    if (err) res.send(err);

    var post = new Post();
    post.title = req.body.title;
    post.body  = req.body.body;

    post.save(function(err) {
      if (err) res.send(err);

      res.json({ message: 'successfully created!' });
    });
  });
});

/* SHOW */
router.get('/:post_id', function(req, res) {
  console.log('SHOW POST');

  Post.findById(req.params.post_id, function(err, post) {
    if (err) res.send(err);

    res.json(post);
  });
});

/* UPDATE */
router.put('/:post_id/edit', function(req, res) {
  console.log('UPDATE POST');

  Post.findById(req.params.post_id, function(err, post) {
    if (err) res.send(err);

    post.title = req.body.title;
    post.body  = req.body.body;

    post.save(function(err) {
      if (err) res.send(err);

      res.json({ message: 'successfully created!' });
    });
  });
});

/* DELETE */
router.delete('/:post_id', function(req, res) {
  console.log('DELETE POST');

  Post.remove({ _id: req.params.post_id }, function(err, post) {
    if (err) res.send(err);

    res.json({ message: 'successfully deleted!' });
  });
});

module.exports = router;