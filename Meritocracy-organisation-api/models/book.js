const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true }
});

const Books = module.exports = mongoose.model('book', BookSchema);

module.exports.addbook = function(value,callback)
{
	var BookDetail = new Books(value);
	BookDetail.save(function(err,doc){
		callback(doc);
	});
}

module.exports.getbooks = function(callback)
{
	Books.find({},function(err,docs){
		callback(docs);
	})
}

module.exports.deletebook = function(id)
{
	Books.remove({_id:id},function(err){
		
	})
}

module.exports.getbook = function(id,callback)
{
	Books.find({_id:id},function(err,doc){
		callback(doc[0]);
	})
}