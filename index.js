const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN;

console.log(accountSid, authToken);

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
		console.log(req.body);

		const message = "cc";
		const twiml = new MessagingResponse();

		twiml.message(message);

		res.writeHead(200, { 'Content-Type': 'text/xml' });
		res.end(twiml.toString());
	})
	
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));









// client.messages
//   .create({
//      mediaUrl: ['https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'],
//      from: 'whatsapp:+14155238886',
//      body: `It's taco time!`,
//      to: 'whatsapp:+15017122661'
//    })
//   .then(message => console.log(message.sid));
