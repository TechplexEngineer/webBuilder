module.exports = function(router){

	// -- READ --
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

	// -- CREATE --
	router.get('/add', function(req, res) {

		res.render('items/add_edit', {
			title: 'Add an Item',
			data: {
				name:'',
				desc:''
			},
		});

	});
	router.post('/add', function(req, res) {

		var db = req.db;
		var collec = db.get('items');

		collec.insert(req.body, function (err, count, status) {
			console.log("update",err,count,status);
			res.redirect('/')
		})

	});

	// -- UPDATE --
	router.get('/edit/:id', function(req, res) {

		var db = req.db;
		var collec = db.get('items');

		collec.findById(req.params.id, function(e, doc){
			if (!e) {
				res.render('items/add_edit', {
					title: 'Edit an Item',
					data: doc
				});
			} else {
				res.render('error',{message:e});
			}
		});

	});
	router.post('/edit/:id', function(req, res) {

		var db = req.db;
		var collec = db.get('items');

		collec.update(req.params.id, {$set:req.body}, function (err, count, status) {
			console.log("update",err,count,status);
			res.redirect('/')
		})

	});
	// -- DELETE --
	router.get('/delete/:id', function(req, res) {

		var db = req.db;
		var collec = db.get('items');

		collec.findById(req.params.id, function(e, doc){
			if (!e) {
				res.render('items/delete', {
					title: 'Are you sure you want to delete?',
					data: doc
				});
			} else {
				res.render('error',{message:e});
			}
		});

	});
	router.post('/delete/:id', function(req, res) {

		var db = req.db;
		var collec = db.get('items');

		if ('action-delete' in req.body) {

			collec.remove({_id:req.params.id}, function (err, count, status) {
				console.log("remove",err,count,status);
				res.redirect('/')
			})
		}

	});

	return router;
}
