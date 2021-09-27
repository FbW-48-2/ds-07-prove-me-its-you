import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()

app.use( express.json() )
app.use( cors({ origin: 'http://localhost:3000', credentials: true }) )
app.use( cookieParser() )

const JWT_SECRET = 'topSecret'

let users = [
  {
    username: 'rob',
    password: 'rob123'
  },
  {
    username: 'vas',
    password: 'vas123'
  }
]

const auth = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return next( new Error('You need to be logged in to access here') )
  }
  try {
    const userDecoded = jwt.verify( token, JWT_SECRET )
    req.user = userDecoded
    next()
  } catch (err) {
    next( err )
  }
}


app.post('/login', (req, res, next) => {
  try {
    const userFound = users.find(
      user => user.username === req.body.username && user.password === req.body.password
    )
    if (!userFound) {
      return next(new Error('Login failed'))
    }
    let token = jwt.sign(
      userFound,
      JWT_SECRET,
      { expiresIn: '30m' }
    )
    res.cookie('token', token, { httpOnly: true })
    res.json( userFound )
  } catch (err) {
    next( err )
  }
})

app.get('/users', auth, (req, res, next) => {
  try {
    res.json( users )
  } catch (err) {
    next( err )
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  })
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
