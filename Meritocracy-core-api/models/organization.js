const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const organSchema = new mongoose.Schema({
    clientId: { type: String, required: true },
    protocol: { type: String, required: true },
    rootUrl:{ type: String, required: true }
});

const organization  = mongoose.model('organization', organSchema);

module.exports.addorganization = function(data,callback){
	var organ = new organization(data);
	organ.save(callback);
}

module.exports.getorganizations = function(callback)
{
	organization.find(callback);
}