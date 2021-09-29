import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'

const app = express()

app.use( express.json() )
app.use( cors({ origin: 'http://localhost:3000', credentials: true }) )
app.use( cookieParser() )

const JWT_SECRET = 'topSecret'

let users = [{
  username: 'lucas',
  password: 'asd123'
}]
console.log('users' , users)

const auth = (req, res, next) => {
  const token = req.cookies.token
  console.log('token -', token)
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

app.post('/signup', (req, res, next) => {
  const newUser = { ...req.body }

  newUser.password = bcrypt.hashSync( newUser.password, 10 )
  newUser.id = Date.now().toString()

  users.push( newUser )
  console.log('newUser =>', newUser)

  let token = jwt.sign(
    {
      id: newUser.id,
      username: newUser.username
    },
    JWT_SECRET,
    { expiresIn: '30m' }
  )
  console.log('token =>', token)

  res
    .cookie('token', token, {
      sameSite: 'None',
      secure: true,
      expires: new Date(Date.now() + 172800000),
      httpOnly: true
    })
    .json({ username: newUser.username })
})

app.post('/login', (req, res, next) => {
  const { username, password } = req.body
  console.log('user' , req.body)
  const userFound = users.find(
    user => user.username === username
  )
  
  try {

    if (!userFound) {
      return next(new Error(`user ${username} not found`))
    }

    const loginSuccessful = bcrypt.compareSync( password, userFound.password )

    if (!loginSuccessful) {
      return next( new Error(`Password doesn't match`))
    }
    
    let token = jwt.sign(
      {
        id: userFound.id,
        username: userFound.username
      },
      JWT_SECRET,
      { expiresIn: '30m' }
    )
    
    res
      .cookie('token', token, {
        sameSite: 'None',
        secure: true,
        expires: new Date(Date.now() + 172800000),
        httpOnly: true
      })
      .json({ username: userFound.username })

  } catch (err) {
    console.log('error', err)
    next( err )
  }
})

app.get('/users', auth, (req, res, next) => {
  try {
    let usersArr = users.map(
      x => ({ username: x.username })
    )
    res.json( usersArr )
  } catch (err) {
    next( err )
  }
})

app.get("/signout", (req, res, next) => {
  res.clearCookie("token")
  res.json({ message: "Logged you out successfully, buddhy!" })
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
