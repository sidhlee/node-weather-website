const axios = require('axios')

const getCurrentWeather = async (address) => {
  const url = `http://api.weatherstack.com/current?access_key=${
    process.env.WEATHERSTACK_API
  }&query=${encodeURIComponent(address)}`

  try {
    const { data } = await axios.get(url)

    // Weatherstack API returns 200 on error
    if (data.error) {
      throw data
    }

    return data
  } catch (err) {
    // thrown by axios (connection error)
    if (err.request) {
      throw new Error(
        'Unable to connect to the weather server. Please try again.'
      )
    } else if (err.error) {
      // error object sent from Weatherstack api
      throw Error('Unable to find the location. Please try again.')
    }
  }
}

module.exports = {
  getCurrentWeather,
}
