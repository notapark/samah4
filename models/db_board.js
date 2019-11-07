// db_board.js
var async = require('async');
var pool = require('./datasource');

exports.getList = (params, callback) => {
	pool.getConnection((err, conn) => {
		if(err) console.error('err', err);
		var sql = ' select board_id, board_pid'
						+ '			, title, board_pass'
						+	' 		, content, board_type'
						+ '			, hits'
						+ '			, DATE_FORMAT(reg_date, \'%Y-%m-%d %H:%i:%s\') regdate  '
						+ '			, reg_user_id  '
						+ ' from tb_board '
						+ ' where board_type = ? ';
		conn.query(sql, params, (err, results) => {
			if(err) console.error('err', err);
			conn.release();
			callback(err, results);
		});
	});
};



exports.getView = (params, callback) => {
	pool.getConnection((err, conn) => {
		if(err) console.error('err', err);
		var sql = ' select board_id, board_pid, title, board_pass'
						+	' 		, content, board_type'
						+ '			, hits'
						+ '			, DATE_FORMAT(reg_date, \'%Y-%m-%d %H:%i:%s\') regdate  '
						+ '			, reg_user_id  '
						+ '  from tb_board '
						+ ' where board_type = ? '
						+ '   and board_id = ?';
		conn.query(sql, params, (err, row) => {
			if(err) console.error('err', err);
			console.log('row', row);
			if(row.affectedRows == 1) {
				success = true;
			}
			conn.release();
			console.log('row', row);
			callback(null, row);
		});
	});
};


exports.write = (parambody, callback) => {
	const sqlGetBoardId = 'SELECT GET_SEQ(\'board\') board_id FROM DUAL';
	const sql = ' insert into tb_board(board_id, title, board_pass, content, board_type, reg_date, reg_user_id) '
					+ ' values( ?, ?, ?, ?, ?, now(), ? )';

	const task = [
		(callback) => {
			pool.getConnection((err, conn) => {
				if(err) console.error('err', err);
				callback(null, conn);
			});
		},
		(conn, callback) => {
			conn.query(sqlGetBoardId, [], (err, results) => {
				if(err) {
					console.error('err', err);
					success = false;
				}
				
				var boardId = results[0].board_id;
				var title = parambody.title;
				var boardPass = '000000000'
				var content = parambody.content;
				var boardtype = parambody.boardtype;
				var userId = parambody.userid;
				params = [boardId, title, boardPass, content, boardtype, userId];

				console.error('ttttttttttttttt params : ', params);
				callback(null, conn, params);
			});
		},
		( conn, params, callback) => {
			conn.query(sql, params, (err, row) => {
				if(err) {
					console.error('err', err);
					success = false;
					callback(err, success);
				}else{
					callback(null, row);

				}
			});
		}
	];

	async.waterfall( task, (err, results) => {
		console.error('eeeeeeeeeeeeeeeeeee : ' , results);
	});
};



