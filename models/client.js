const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
	whatsapp: { type: String, required: true },
	dateJoined: { type: String, required: true },
	telephones: { type: Array, required: false },
});

module.exports = mongoose.model('Client', ClientSchema);
