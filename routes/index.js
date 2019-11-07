var express = require('express');
var router = express.Router();

/* GET home page. */
//메인화면
router.get('/', function(req, res, next) {
  var sess = req.session;
  console.log("sess.name", sess.username);
  res.render('index', { 
    username : sess.username,
    message : false
  });
});





module.exports = router;
