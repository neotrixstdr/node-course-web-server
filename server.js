const express = require('express');
const hbs = require('hbs');

const fs= require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log=`${now} : pagina solicitada ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log +'\n');
	next();
});
// app.use( (req,res,next) => {
// 	res.render('maintenance.hbs');
// });
//Carpeta con contenido estatico
app.use(express.static(__dirname + '/public'));


//Registramos el año pra poderle reutilizar
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		welcomeMessage: 'Welcome to the Home Page',
		pageTitle: 'Home Page'
		//currentYear: new Date().getFullYear()
	});
});

app.get('/about', (req, res) => {
	//res.send('About');
	res.render('about.hbs', {
		pageTitle: 'About Page Dinamic'
		//currentYear: new Date().getFullYear()
	});
});

app.get('/projects', (req, res) => {
	//res.send('About');
	res.render('projects.hbs', {
		pageTitle: 'Projects Test'
	});
});

// app.get('/', (req, res) => {
// 	res.send({
// 		name: 'Jose',
// 		age: 42,
// 		likes: [
// 			'games',
// 			'films'
// 		]
// 	})
// });


app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

app.listen(port, () => {
	console.log(`Server is Up on port ${port}`);
});