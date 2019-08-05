const { readFile } = require('fs')
const path = require('path')
const qs = require('querystring')
const addCity = require('../database/queries/postData')
const getCities = require('../database/queries/getData')
const postSignupData = require('../database/queries/addUser')
const postLoginData = require('../database/queries/getUser')
const alert = require('alert-node')
const { sign, verify } = require('jsonwebtoken')
const cookie = require('cookie')

const bcrypt = require('bcrypt')

const serverError = (err, response) => {
  response.writeHead(500, 'Content-Type:text/html')
  response.end('<h1>Sorry, there was a problem loading the homepage</h1>')
  console.log(err)
}

const homeHandler = (response) => {
  const filepath = path.join(__dirname, '..', '..', 'public', 'index.html')
  readFile(filepath, (err, file) => {
    if (err) console.log(err)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end(file)
  })
}

const citiesHandler = (request, response) => {
  const comingToken = cookie.parse(request.headers.cookie).token
  verify(comingToken, process.env.secret, (err, result) => {
    if (err) return serverError(err, response)
    else {
      getCities((error, result) => {
        console.log(result)
        if (error) return serverError(error, response)
        response.writeHead(200, { 'Content-Type': 'Application-json' })
        response.end(JSON.stringify(result))
      })
    }
  })
}

const getCitiesHandler = (request, response) => {
  const comingToken = cookie.parse(request.headers.cookie).token
  verify(comingToken, process.env.secret, (err, result) => {
    if (err) {
      // response.writeHead(302, { Location: '/' })
    } else if (result) {
      const filepath = path.join(__dirname, '..', '..', 'public', 'cities.html')
      readFile(filepath, (err, file) => {
        if (err) return serverError(err, response)
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end(file)
      })
    }
  })
}

const postCityHandler = (request, response) => {
  console.log('enter add city handler')
  let data = ''
  request.on('data', chunk => {
    data += chunk
  })
  request.on('end', () => {
    console.log('data', data)

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

const postSignupHandler = (request, response) => {
  let body = ''
  request.on('data', chunk => {
    body += chunk.toString()
  })
  request.on('end', () => {
    const { email, password } = qs.parse(body)
    console.log('result', email)
    bcrypt.hash(password, 10, (hasherr, hashedPassword) => {
      if (hasherr) {
        serverError(hasherr, response)
      } else {
        postSignupData(email, hashedPassword, (err, data) => {
          if (err) serverError(err, response)
          response.writeHead(302, {
            Location: '/'
          })
          response.end()
        })
      }
    })
  })
}

const postLoginHandler = (request, response) => {
  let body = ''
  request.on('data', chunk => {
    body += chunk.toString()
  })

  request.on('end', () => {
    const { email, password } = qs.parse(body)
    postLoginData(email, (err, hashedPassword) => {
      if (err) {
        alert("email doesn't exist")
        response.writeHead(302, { Location: '/' })
        response.end('<h1> error</h1>')
      } else {
        const newHashPassword = hashedPassword.password
        bcrypt.compare(password, newHashPassword, (error, compared) => {
          if (compared) {
            const token = sign(email, process.env.secret)
            console.log('first token', token)
            response.writeHead(302, {
              Location: '/add-city', 'Set-Cookie': `token = ${token}`
            })
            response.end()
          } else if (!compared) {
            alert('password inncorrect!')
            response.writeHead(302, {
              Location: '/'
            })
            response.end()
          } else if (error) {
            serverError(error, response)
          }
        })
      }
    })
  })
}

module.exports = { citiesHandler,
  homeHandler,
  getCitiesHandler,
  postCityHandler,
  publicHandler,
  getLoginPage,
  getSignupPage,
  errorHandler,
  postSignupHandler,
  postLoginHandler

}
