var express = require('express');
var router = express.Router();
var db_user = require('../models/db_user');
var crypto = require("crypto");

/* GET users listing. */

//로그인
router.post('/doLogin', function(req, res, next) {
  var sess = req.session;
  var hmac = crypto.createHmac('sha256', 'password');
  console.log('req.body=', req.body);

  var reqPage = req.body.reqPage;
  var id = req.body.id;
  var password = hmac.update(req.body.password).digest('hex');
  var params = [id, password];

	db_user.login(params, (err, result) => {
		if(result[0] == null) {
      console.log('login fail ', err);
			res.send('<script>alert("해당하는 아이디 및 비밀번호가 잘못되었습니다.");history.back();</script>');
		} else {
      console.log("result : ", result[0].username);
      sess.username = result[0].username;
      sess.userid = result[0].id;
      console.log('login sess.username : ', sess.username);
      res.redirect('/' + reqPage);
		}
	});
});

//로그 아웃
router.get('/doLogout', function(req, res){
  sess = req.session;
  reqPage = req.reqPage;
  if(sess.username){
      req.session.destroy(function(err){
          if(err){
              console.log(err);
          }else{
              res.redirect('/');
          }
      })
  }else{
      res.redirect('/');
  }
});


//로그인 폼
router.get('/joinForm', function(req, res){
  sess = req.session;
  res.render('join', {    

  })
});

//로그인 폼
router.post('/doJoin', function(req, res){
  var sess = req.session;
  var hmac = crypto.createHmac('sha256', 'password');
  console.log('req.body=', req.body);

  var reqPage = req.body.reqPage;
  var id = req.body.id;
  var password = hmac.update(req.body.password).digest('hex');
  var username = req.body.username;
  var aptname = req.body.aptname;
  var address = req.body.address;
  var email = req.body.email;
  var officeNumber = req.body.officeNumber;
  var phoneNumber = req.body.phoneNumber;
  var params = [id, password, username, aptname, address, email, officeNumber, phoneNumber];

	db_user.join(params, (success) => {
		if(success) {
			// res.send('<script>alert("회원가입에 성공 하셨습니다. 로그인 후 이용해주세요.")</script>');
      // res.redirect('/');
      var msg = "회원가입에 성공 하셨습니다. 로그인 후 이용해주세요.";
      
      res.render('', {    
        loginInfo : null,
        username : null,
        message : msg
      })
		} else {
			res.send('<script>alert("회원가입에 실패했습니다. 다시 시도해 주십시오.");history.back();</script>')
		}
	});
});



module.exports = router;
