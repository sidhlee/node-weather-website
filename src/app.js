const express = require('express')
const path = require('path')
const hbs = require('hbs')

const entries = require('./help-entries')
const { getCurrentWeather } = require('./utils/getCurrentWeather')

const app = express()

const PORT = process.env.PORT || 5000
// Both rel | abs path work
const viewsPath = path.join(__dirname, './templates/views/')
const partialsPath = path.join(__dirname, './templates/partials/')
const publicPath = path.join(__dirname, '../public/')

// Use static assets
app.use(express.static(publicPath))

// Setup Handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup page routes
app.get('/', (req, res) => {
  return res.render('index', { title: 'Weather' })
})

app.get('/about', (req, res) => {
  return res.render('about', { title: 'About' })
})

app.get('/help', (req, res) => {
  return res.render('help', {
    title: 'FAQ',
    entries,
  })
})

// Setup API routes
app.get('/weather', async (req, res) => {
  const { address } = req.query
  if (!address) {
    return res.send({ error: 'Please provide the address' })
  }

  try {
    const { current, location } = await getCurrentWeather(address)

    const searchAddress = `${location.name}, ${location.region}`
    const localTime = current.observation_time
    const temperature = current.temperature
    const feelsLike = current.feelslike // Cspell:disable-line

    return res.json({
      searchAddress,
      localTime,
      temperature,
      feelsLike,
    })
  } catch (err) {
    return res.json({
      error: err.message,
    })
  }
})

// Handle 404
app.get('*', (req, res) => {
  return res.render('404', { title: 'Page Not Found' })
})

app.listen(PORT, () => {
  return console.log(`Server is up on port: ${PORT}`)
})
