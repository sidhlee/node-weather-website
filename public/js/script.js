const addressForm = document.querySelector('form.address-form')
const locationElm = document.querySelector('.weather-display > .location')
const timeElm = document.querySelector('.weather-display > .time')
const weatherInfoElm = document.querySelector(
  '.weather-display > .weather-info'
)

addressForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const addressInputEl = e.target.address
  const address = addressInputEl.value
  // const origin = `http://localhost:5000`
  const origin = ``
  const url = origin + `/weather?address=${encodeURIComponent(address)}`

  locationElm.textContent = 'Loading...'
  timeElm.textContent = ''
  weatherInfoElm.textContent = ''

  try {
    // fetch returns Response obj on which you call .json to get the data
    const response = await fetch(url)
    const {
      searchAddress,
      localTime,
      description,
      temperature,
      feelsLike,
      error,
    } = await response.json() // response.json returns Promise!

    if (error) {
      locationElm.textContent = `..Oops! 🤭`
      weatherInfoElm.textContent = error
      return
    }

    locationElm.textContent = searchAddress
    timeElm.textContent = new Date(localTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    weatherInfoElm.textContent = `${description}, ${temperature}°C, feels like ${feelsLike}°C`
  } catch (err) {
    console.log(err)
  }
  addressInputEl.value = ''
})
