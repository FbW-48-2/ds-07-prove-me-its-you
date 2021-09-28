import express  from "express";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

const app = express()

const JWT_SECRET = `thatSmySecretMdF123456`

let users = [ 
    { username: 'rob', password: 'rob123' }, 
    { username: 'vas', password: 'vas123' }
]


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

app.post('/login', (req, res, next) => {
    const body = req.body
    try {
        const findUser = users.find(user => user.username === body.username && user.password === body.password)
        if(!findUser){
            throw new Error('Invalid credentials, username or password wrong.')
        }
        let jwtToken = jwt.sign(findUser, JWT_SECRET, { expiresIn: '30m' })

        const sessionTimeInSecs = 1000*60*3
        res.cookie('token', jwtToken, { maxAge: sessionTimeInSecs, httpOnly: true })
        res.json(findUser)
    } catch (error) {
        next(error)
    }
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message})
  })

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT} !`);
})