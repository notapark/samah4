var express = require('express');
var router = express.Router();
var db_board = require('../models/db_board');
const multer = require('multer');
const upload = multer({ dest: 'uploads/tmp/' });


router.get('/notice', function(req, res, next) {
  var sess = req.session;
  res.render('notice', { 
    username : '박종우', //sess.username
    userid : 'notapark' //sess.userid
  })

});

router.get('/board/list/:boardtype', function(req, res) {
  var sess = req.session;

  
  var params = [boardtype];
  console.log('aaaaaaaaaaaaaaaaaaa : ' + params);

	db_board.getList(params, (err, results) => {
    console.log("board/list : " , results);
    var row = {data: results};
    res.json(row);
	});
});

//게시판 조회
router.get('/write/:boardtype', function(req, res, next) {
  console.log('req.body.boardtype=', req.body.boardtype);
  var sess = req.session;
  // if(!sess.userid){
  //   res.send('<script>alert("로그인 후 이용해주세요.");history.back();</script>');
  // }
  var boardtype = req.body.boardtype;
  res.render('write', { 
    boardtype : boardtype,
    username : '박종우', //sess.username
    userid : 'notapark' //sess.userid
  })

});




router.post('/doWrite', upload.array('attachfile1'), function(req, res, next) {
  console.log('req.body.boardtype=', req.body.boardtype);
  var sess = req.session;
  var boardtype = req.body.boardtype;
  var user_id = req.body.userid;
  var title = req.body.title;
  var content = req.body.content;
  var upfile = req.files;
  params = [user_id, title, content, boardtype];

  console.log("dowrite params : ", params);
  console.log("dowrite upfile : ", upfile);

	db_board.write(req.body, upfile, (results) => {
		if(results) {
      console.log('ttttttttttttttttttttttttt : ' , results);
			res.redirect('/notice');
		} else {
			res.send('<script>alert("저장 실패. 다시 시도하십시오.");history.back();</script>')
		}
	});

});

module.exports = router;
