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

    res.render('post/index', {posts: posts});
  });
});

/* NEW*/
router.get('/new', function(req, res) {
  console.log('NEW POST');

  res.render('post/new');
});

/* CREATE */
router.post('/new', function(req, res) {
  console.log('CREATE POST');
  console.log(req);
  Post.findById(req.params.post_id, function(err, post) {
    if (err) res.send(err);

    var post = new Post();
    post.title = req.body.title;
    post.body  = req.body.body;

    post.save(function(err) {
      if (err) res.send(err);

      res.redirect('/posts/' + post._id);
    });
  });
});

/* SHOW */
router.get('/:post_id', function(req, res) {
  console.log('SHOW POST');

  Post.findById(req.params.post_id, function(err, post) {
    if (err) res.send(err);

    res.render('post/show', {post: post});
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