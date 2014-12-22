module.exports = function(router){

	router.get('/users', function(req, res) {

		var db = req.db;
		var collec = db.get('users');

		collec.find({},function(e,docs){
			if (!e) {
				res.render('users', {
					title: 'Users',
					data: docs,
				});
			} else {
				res.render('error',{message:e});
			}
		});

	});

	return router;
}