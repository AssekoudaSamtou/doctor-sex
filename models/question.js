const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = Schema({
	content: { type: String, required: true },
	next: { type: Schema.ObjectId, ref: 'Question', required: false },
});

module.exports = mongoose.model('Question', QuestionSchema);
