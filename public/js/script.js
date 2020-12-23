const addressForm = document.querySelector('form.address-form')

addressForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const addressInputEl = e.target.address
  const address = addressInputEl.value
  const origin = `http://localhost:5000`
  const url = origin + `/weather?address=${encodeURIComponent(address)}`
  try {
    const response = await fetch(url)
    if (response) {
      console.log(await response.json())
    }
  } catch (err) {
    console.log(err)
  }
  addressInputEl.value = ''
})
