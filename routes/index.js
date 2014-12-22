module.exports = function(router){

	router.get('/', function(req, res) {

		var db = req.db;
		var collec = db.get('items');

		collec.find({},{ sort : [['name', 'asc']]},function(e,docs){
			if (!e) {
				res.render('index', {
					title: 'Items',
					data: docs,
				});
			} else {
				res.render('error',{message:e});
			}
		});

	});

	return router;
}
