const express = require('express')
const path = require('path')
const hbs = require('hbs')

const entries = require('./help-entries')

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

// Setup routes
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

// Handle 404
app.get('*', (req, res) => {
  return res.render('404', { title: 'Page Not Found' })
})

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`)
})
