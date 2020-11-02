const mongoose = require('mongoose');
const { Schema } = mongoose;

const PropositionSchema = Schema({
	content: { type: String, required: false },
	tag: { type: String, required: false },
	entryType: { type: String, required: false },
	question: { type: Schema.ObjectId, ref: 'Question', required: true },
	nextQuestion: { type: Schema.ObjectId, ref: 'Question', required: false },
});

module.exports = mongoose.model('Proposition', PropositionSchema);
