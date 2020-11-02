const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Client = require('./models/client');
const Question = require('./models/question');
const Proposition = require('./models/proposition');
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
		// console.log(req.body);





		(new Question({
			content: "Confirmer ?",
		})).save()
			.then((question) => {
				const proposition1 = new Proposition({
					content: "Oui",
					tag: "1",
					question: { _id: question._id }
				});
				const proposition2 = new Proposition({
					content: "Non",
					tag: "2",
					question: { _id: question._id }
				});

				proposition1.save();
				proposition2.save();

				(new Question({
					content: "Quantité ?",
				})).save()
					.then((question2) => {
						const proposition1 = new Proposition({
							entryType: "integer",
							nextQuestion: question._id,
							question: { _id: question2._id }
						});

						proposition1.save();

						(new Question({
							content: "Type de produit ?",
						})).save()
							.then((question3) => {
								const proposition1 = new Proposition({
									content: "Doctor Sex",
									tag: "1",
									nextQuestion: question2._id,
									question: { _id: question3._id }
								});
								const proposition2 = new Proposition({
									content: "Solution liquide",
									tag: "2",
									nextQuestion: question2._id,
									question: { _id: question3._id }
								});

								proposition1.save();
								proposition2.save();


								(new Question({
									content: "Action ?",
								})).save()
									.then((question4) => {
										const proposition1 = new Proposition({
											content: "Commander un produit",
											tag: "1",
											nextQuestion: question3._id,
											question: { _id: question4._id }
										});
										const proposition2 = new Proposition({
											content: "Informations sur un produit",
											tag: "2",
											nextQuestion: question3._id,
											question: { _id: question4._id }
										});
										const proposition3 = new Proposition({
											content: "Afficher mes commandes",
											tag: "3",
											question: { _id: question4._id }
										});

										proposition1.save();
										proposition2.save();
										proposition3.save();
									})
									.catch(error => console.log('Error !'));
							})
							.catch(error => console.log('Error !'));
					})
					.catch(error => console.log('Error !'));
			})
			.catch(error => console.log('Error !'));

























		const twiml = new MessagingResponse();
		const message = twiml.message();
		message.body('Store');
		// message.media('https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80');



		res.writeHead(200, { 'Content-Type': 'text/xml' });
		res.end(twiml.toString());
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
