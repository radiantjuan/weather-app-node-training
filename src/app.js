const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { response } = require('express');
const { getWeatherForcast } = require('./weather');

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handle bars templates
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

//setup static directory
app.use(express.static(path.join(__dirname, '../public')));

//page routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome to index page',
    });
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Welcome to help page',
        name: 'Rad 2',
        content: 'this is a content 2'
    });
});

//API routes
app.get('/weather', async (request, response) => {
    const {address} = request.query;
    if (!address) {
        response.send({
            error: 'Please send a query address'
        });
    } else {
        response.send({
            forecast: await getWeatherForcast(address),
            location: address
        });
    }
});

//404 not found route
app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404 not found bitch!',
        name: 'Rad 3',
        content: 'Sorry the page that you are looking for is not existing'
    });
});

app.listen(port, () => {
    console.log(`sever is up in port ${port}`);
});