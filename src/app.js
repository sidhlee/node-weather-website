const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

const PORT = process.env.PORT || 5000
// Both rel | abs path work
const viewsPath = path.join(__dirname, './templates/views/')
const partialsPath = path.join(__dirname, './templates/partials/')
const publicPath = path.join(__dirname, '../public/')

app.use(express.static(publicPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
  return res.render('index', { title: 'Weather' })
})

app.get('/about', (req, res) => {
  return res.render('about', { title: 'About' })
})

app.get('/help', (req, res) => {
  return res.render('help', {
    title: 'FAQ',
    entries: [
      {
        question: `I don't know the exact address of the location.`,
        answer:
          'You can search the weather by partial address like city, street, or postal code.',
      },
      {
        question: `The returned address is not the one I'm looking for.`,
        answer: `The algorithm returns the first match of many possible addresses. Try adding more details like country, state or province.`,
      },
    ],
  })
})

// Handle 404
app.get('*', (req, res) => {
  return res.render('404', { title: 'Page Not Found' })
})

app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`)
})
