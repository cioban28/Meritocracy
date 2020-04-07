const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.post('/addbook', function (req, res, next) {
	Book.addbook(req.body.book, function (value) {
		res.json(value);
	});

})

router.post('/getbooks', function (req, res, next) {
	Book.getbooks(function (books) {
		res.json(books);
	});

})

router.delete('/deletebook', function (req, res, next) {
	Book.deletebook(req.query.id);
	res.send('success');
})

router.get('/getbook', function (req, res, next) {
	Book.getbook(req.query.id, function (result) {
		res.json(result);
	})
})
module.exports = router;