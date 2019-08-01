const {
  homeHandler,
  getCitiesHandler,
  postCityHandler,
  publicHandler,
  errorHandler, getSignupPage, getLoginPage
} = require('./handlers')

const router = (request, response) => {
  const { url } = request

  if (url === '/') {
    homeHandler(response)
  } else if (url === '/cities') {
    // You shuold Check if the user is signed in first if not redirect
    // to the home page
    getCitiesHandler(response)
  } else if (url === '/add-city') {
    // You shuold Check if the user is signed in first if not redirect
    // to the home page
    postCityHandler(request, response)
  } else if (url.includes('public')) {
    publicHandler(url, response)
  } else if (url === '/signup' && request.method === 'GET') {
    getSignupPage(response)
  } else if (url === '/login' && request.method === 'GET') {
    getLoginPage(response)
  } else if (url === '/signup' && request.method === 'POST') {
    // handle Signup Request
    // Hence you may need to use the bcryptjs pacakge
  } else if (url === '/login' && request.method === 'POST') {
    // handle Signin Request
    // Hence you may need to use the jsonwebtoken pacakge
    // You also may need to add a secret in the environment vairable
  } else {
    errorHandler(response)
  }
}

module.exports = router
