const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const PORT = process.env.PORT || 5000;


mongoose.connect('mongodb+srv://admin:admin@cluster0.eal7i.mongodb.net/doctor_sex?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	
	.get('/', (req, res) => res.render('pages/index'))

	.post('/wa', (req, res) => {
		console.log(req.body);

		const message = "cc";
		const twiml = new MessagingResponse();

		twiml.message(message);

		res.writeHead(200, { 'Content-Type': 'text/xml' });
		res.end(twiml.toString());
	})
	
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));
