const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Client = require('./models/client');
const Question = require('./models/question');
const Proposition = require('./models/proposition');
const Discussion = require('./models/discussion');
const Response = require('./models/response');
const { buildQuestion } = require('./utils');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN;

try {
	const client = require('twilio')(accountSid, authToken);
}
catch (e) {
	console.log('ENV VAR NOT FUND');
}

const PORT = process.env.PORT || 5000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });


mongoose.connect('mongodb+srv://admin:admin@cluster0.eal7i.mongodb.net/doctor_sex?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	
	.get('/', (req, res) => res.render('pages/index'))

	.post('/wa', urlencodedParser, (req, res) => {

		const twiml = new MessagingResponse();

		const number = req.body.From.split("whatsapp:")[1];

		Client.findOne({ whatsapp: number })
			.then((client) => {

				if (client === null) {

					client = new Client({whatsapp: number});
					client.save()
						.then((c) => {

						    // console.log(" nouveau client");

						    Question.findOne({ _id: "5fa041465ea6f12644e72477" })
                                .then( ques => {

                                    const discussion = new Discussion({
                                        client: c._id,
                                        currentQuestion: ques._id,
                                    });
                                    discussion.save()
                                        .then( (disc) => {
                                            // console.log("Discussion created");
											buildQuestion(ques, twiml, res);
                                        } )
                                        .catch( (e) => console.log(e) );

                                })
                                .catch( e => console.log(e) );
                        })
						.catch((e) => console.log(e))

				}else {

					const answer = req.body.Body;
					console.log(answer);
					Discussion.findOne({ client: client._id, isEnded: { $ne: true } })
						.then( discussion => {

							console.log("DISCUSSION", discussion);

							Proposition.find({ question: discussion.currentQuestion._id })
								.then( propositions => {

									let chosenProposition = null;
									for (const proposition of propositions) {
										if (proposition.tag === answer) {
											chosenProposition = proposition;
										}
									}

									if (chosenProposition) {

										const response = new Response({ question: discussion.currentQuestion, discussion: discussion._id }).save()
											.then( r => {

												Discussion.updateOne({ _id: discussion._id }, { currentQuestion: chosenProposition.nextQuestion })
													.then( () => {

														Question.findOne({ _id: chosenProposition.nextQuestion })
															.then( q => {
																console.log("QUESTION", q);
																buildQuestion(q, twiml, res);
															})
															.catch( e => console.log(e) );
													})
													.catch( e => console.log(e) );
											})
											.catch( e => console.log(e));
									}
								} )
								.catch( e => { console.log(e) });
						} )
				}

			})
			.catch((e) => console.log(e));

		// message.media('https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80');
	})
	


	.listen(PORT, () => console.log(`Listening on ${ PORT }`));









// client.messages
// //   .create({
// //      mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
// //      from: 'whatsapp:+14155238886',
// //      body: `It's taco time!`,
// //      to: 'whatsapp:+15017122661'
// //    })
// //   .then(message => console.log(message.sid));
