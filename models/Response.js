const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResponseSchema = mongoose.Schema({
	discussion: { type: Schema.ObjectId, ref: 'Discussion', required: true },
	question: { type: Schema.ObjectId, ref: 'Question', required: true },
    created_at: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Response', ResponseSchema);
