// db_user.js
var async = require('async');
var pool = require('./datasource');

//로그인
exports.login = (params, callback) => {
	pool.getConnection((err, conn) => {
		if(err) console.error('err', err);
		var sql = 'select id, username from tb_user where id = ? and password = ? ';
		conn.query(sql, params, (err, results) => {
			if(err) console.error('err', err);
			conn.release();
			callback(err, results);
		});
	});
};

//회원가입
exports.join = (datas, callback) => {
	pool.getConnection((err, conn) => {
		if(err) console.error('err', err);
		
		// var params = [id, password, username, aptname, address, email, officeNumber, phoneNumber];
		var sql = ' insert into tb_user(id, password, username, aptname, address, email,  officeNumber, phoneNumber, reg_date) '
						+ ' values (?, ?, ?, ?, ?, ?, ?, ?, now() ) ';
		conn.query(sql, datas, (err, row) => {
			if(err) console.error('err', err);
			console.log('row', row);
			if(row.affectedRows == 1) {
				console.log('111111111111111111111111111');
				success = true;
			}
			console.log('222222222222222222222222222');
			conn.release();
			console.log('33333333333333333333333333');
			callback(success);
		});
	});
};



