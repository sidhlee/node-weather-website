const navItems = document.querySelectorAll('nav > ul > li > a')
const path = window.location.pathname
navItems.forEach((a) => {
  // Array.slice returns an array!
  const to = a.href.split('/').slice(-1)[0]

  // String.slice returns a string
  if (to === path.slice(1)) {
    a.classList.add('active')
  } else {
    a.classList.remove('active')
  }
})
