var express = require('express');
var router  = express.Router();

var Bear    = require('../models/bear');



router.use(function(req, res, next) {
  console.log("something happened");
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
  console.log("2");
  res.render('index', { title: 'New Title' });
});


router.get('/bears', function(req, res) {

  Bear.find(function(err, bears) {
    if (err) res.send(err);

    res.json(bears);
  });
});

router.post('/bears', function(req, res) {
  var bear = new Bear();
  bear.name = req.body.name;


  bear.save(function(err) {
    if (err) res.send(err);

    res.json({ message: 'Bear Created!' });
  });

});

router
  .get('/bears/:bear_id', function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);

      res.json(bear);
    });
  })
  .put('/bears/:bear_id', function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);

      bear.name = req.body.name;

      bear.save(function(err) {
        if (err) res.send(err);

        res.json({ message: 'Bear Updated!' });
      })

    });
  })
  .delete('/bears/:bear_id', function(req, res) {
    Bear.remove({ _id: req.params.bear_id }, function(err, bear) {
      if (err) res.send(err);

      res.json({ message: 'Successfully deleted!' });
    });
  });


module.exports = router;
