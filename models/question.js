const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = Schema({
	content: { type: String, required: true },
});

module.exports = mongoose.model('Question', QuestionSchema);
