const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
	whatsapp: { type: String, required: true, unique: true },
	dateJoined: { type: String, required: true, default: Date.now },
	telephones: { type: Array, required: false },
});

module.exports = mongoose.model('Client', ClientSchema);
