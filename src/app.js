const path = require('path'); // core Node module
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 5000; // Heroku will set env.PORT

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

// Setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup page routes and render templates with context
const name = 'Sid H. Lee';

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name,
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpMessage: 'Need help?',
    title: 'Help',
    name,
  });
});

// Setup API routes and handlers
app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({ error: 'You must provide the address.' });
  }

  // default parameter prevents TypeError when there is an error and the response is undefined.
  geocode(address, (error, { lat, lng, placeName } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, lng, (err, { description, temperature, feelslike } = {}) => {
      if (err) {
        return res.send(err);
      }
      return res.send({
        forecast: { temperature, description, feelslike },
        location: placeName,
        address,
      });
    });
  });
});

// Handle page-specific 404
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name,
    errorMessage: 'Help article not found',
  });
});

// Handle general 404
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name,
    errorMessage: 'Page Not Found.',
  });
});

// Start server
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
