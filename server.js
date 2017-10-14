const express = require('express');
const hbs = require('hbs');

const fs=require('fs');

const port=process.env.PORT || 3000;

var app = express(); 

hbs.registerPartials(__dirname+'/views/partials')

app.set('view engine','hbs');


app.use((req,res,next)=>{
	var now= new Date().toString();
	var log= `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log+'\n');
	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintainence.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear()
});

hbs.registerHelper('screamit', (text) => {
	return text.toUpperCase();
});

//handler for http get request
app.get('/',(req,res) => {
	res.render('home.hbs',{
		pageTitle:'Home Page',
		welcomeMessage:'Welcome here!!!',
		//currentYear: new Date().getFullYear()
	})
});

app.get('/about', (req,res)=>{
	res.render('about.hbs',{
		pageTitle: 'About the Page',
		//currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req,res)=>{
	res.send({
		errorMessage: 'Unable to handle request'
	});
})



app.listen(port,()=>{
	console.log('Server is up on port '+port);
});