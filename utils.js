const Client = require('./models/client');
const Question = require('./models/question');
const Proposition = require('./models/proposition');
const Discussion = require('./models/discussion');

function buildQuestion(question, twiml, res) {

    Proposition.find({ question: question._id })
        .then( propositions => {

            let msg = `${question.content}\n\n`;

            if (propositions.length > 0) {
                for (const proposition of propositions) {
                    msg += `${proposition.tag}. ${proposition.content}\n`
                }
            }

            const message = twiml.message();
		    message.body(msg);

		    res.writeHead(200, { 'Content-Type': 'text/xml' });
		    res.end(twiml.toString());

        } )
        .catch( e => { console.log(e) });

}

module.exports = {
    buildQuestion: buildQuestion,
};
