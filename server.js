import express  from "express";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { body } from 'express-validator'

dotenv.config();

const app = express()

const JWT_SECRET = process.env.SECRET_KEY

let users = []

console.log(users);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use( express.json() )
app.use( cookieParser() )

app.get('/', (req, res)=> {
    res.send(`<h1>Auth first exercise</h1>`)
})

const auth = (req, res, next) => { 
    console.log(req.cookies);
    const token = req.cookies.token
  if(!token) {
    return next( new Error("You do not have a token") )
  }
  try {
    const userDecoded = jwt.verify( token, JWT_SECRET )
    req.user = userDecoded
    next()
  } catch (error) {
    next(error)
  }
}

app.get('/users', auth, (req, res, next) => {
    try {
        if(users.length === 0){
            throw new Error('No users found')
        }
        res.json(users)
    } catch (error) {
        next(error)
    }
})

app.post('/login', [
    body("username").escape(), 
    body("password").escape()
  ],(req, res, next) => {
    const { username, password } = req.body
    try {
        // const findUser = users.find(user => user.username === body.username && user.password === body.password)
        const findUser = users.find(user => user.username === username)
        if(!findUser){
            throw new Error('Invalid credentials: not user found')
        }
        const loginSuccessful = bcrypt.compareSync(password, findUser.password)

        if(!loginSuccessful){
            throw new Error(`Invalid credentials: password does not match with username: ${findUser.username}`)
        }
        let jwtToken = jwt.sign({ username: findUser.username }, JWT_SECRET, { expiresIn: '30m' })

        const sessionTimeInSecs = 1000*60*3
        res.cookie('token', jwtToken, { maxAge: sessionTimeInSecs, httpOnly: true })
        res.json({ username: findUser.username })
    } catch (error) {
        next(error)
    }
})

app.post('/signup', [
    body("username").escape(), 
    body("password").escape()
  ],(req, res, next) => {
    const body = req.body
    const user = body
    user._id = Math.random().toString(36).slice(2);

    user.password = bcrypt.hashSync(user.password, 10)
    users.push(user)
    const resp = {username: user.username}
    res.json(resp)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message})
  })

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT} !`);
})
