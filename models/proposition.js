const mongoose = require('mongoose');
const { Schema } = mongoose;

const PropositionSchema = Schema({
	content: { type: String, required: true },
	tag: { type: String, required: true },
	question: { type: Schema.ObjectId, ref: 'Question', required: true },
});

module.exports = mongoose.model('Proposition', PropositionSchema);
