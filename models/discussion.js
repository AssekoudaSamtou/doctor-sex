const mongoose = require('mongoose');
const { Schema } = mongoose;

const DiscussionSchema = mongoose.Schema({
	client: { type: Schema.ObjectId, ref: 'Client', required: true },
    dateStarted: { type: Date, required: true, default: Date.now },
    dateEnded: { type: Date, required: false },
    currentQuestion: { type: Schema.ObjectId, required: true, ref: 'Question' },
    isEnded: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
