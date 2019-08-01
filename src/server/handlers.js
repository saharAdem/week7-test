const { readFile } = require('fs')
const path = require('path')
const qs = require('querystring')
const addCity = require('../database/queries/postData')
const getCities = require('../database/queries/getData')
const serverError = (err, response) => {
  response.writeHead(500, 'Content-Type:text/html')
  response.end('<h1>Sorry, there was a problem loading the homepage</h1>')
  console.log(err)
}

const homeHandler = response => {
  const filepath = path.join(__dirname, '..', '..', 'public', 'index.html')
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(file)
  })
}

const getCitiesHandler = response => {
  getCities((error, result) => {
    if (error) return serverError(error, response)
    response.writeHead(200, { 'Content-Type': 'Application-json' })
    response.end(result)
  })
}

const postCityHandler = (request, response) => {
  let data = ''
  request.on('data', chunk => {
    data += chunk
  })
  request.on('end', () => {
    console.log(qs.parse(data))
    addCity(qs.parse(data), (error, result) => {
      if (error) return serverError(error, response)
      response.writeHead(200, { 'Content-Type': 'text/html' })
      response.write('<div style="text-align:center;">')
      response.write('<h2>City Added Succesfuly</h2>')
      response.write('<a href="#" onclick="history.go(-1)"> Click Here to go Back<a/>')
      response.end('</div>')
    })
  })
}

const publicHandler = (url, response) => {
  const filepath = path.join(__dirname, '..', '..', url)
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response)
    const extension = url.split('.')[1]
    const extensionType = {
      html: 'text/html',
      css: 'text/css'
    }
    response.writeHead(200, { 'content-type': extensionType[extension] })
    response.end(file)
  })
}

const errorHandler = response => {
  response.writeHead(404, { 'content-type': 'text/html' })
  response.end('<h1>404 Page Requested Cannot be Found</h1>')
}

const getSignupPage = response => {
  const filepath = path.join(__dirname, '..', '..', 'public', 'signup.html')
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(file)
  })
}

const getLoginPage = response => {
  const filepath = path.join(__dirname, '..', '..', 'public', 'login.html')
  readFile(filepath, (err, file) => {
    if (err) return serverError(err, response)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(file)
  })
}

module.exports = {
  homeHandler,
  getCitiesHandler,
  postCityHandler,
  publicHandler,
  getLoginPage,
  getSignupPage,
  errorHandler
}
