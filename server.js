import express  from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
const JWT_SECRET = "12345"

app.use( cors({ origin: 'http://localhost:3000', credentials: true } ) )

app.use(express.json())
app.use(cookieParser())

let users = [  ]

const authentication = (req, res, next) => {
    
    const userToken = req.cookies.userToken
    console.log('USER TOKEN: ',userToken)
    if (!userToken){
        return next(new Error('Whats wrong with you'))
    }
    try{
        const dataDecoded = jwt.verify( userToken, JWT_SECRET )
        req.user = dataDecoded
        next() 
    }
    catch(error){
        next(error)
    }
}

app.get('/', (req, res, next) => {
    res.json({message: 'Here is nothing'})
})

app.get('/checkAuth', authentication, (req,res) => {
    res.json(req.user)
})

app.post('/login', (req, res, next) => {
    const {username, password} = req.body
    const findUser = (user) => {
        return user.username === username
    }
    
    const userFind = users.find(findUser)
    if (!userFind) next(new Error('Wrong Input'))
    const checkHash = bcrypt.compareSync(password, userFind.password)
    if (!checkHash) next(new Error('PW wrong'))
    
    let token = jwt.sign( userFind, JWT_SECRET, {expiresIn: '30m'} )
    const sessionTime = 1000*300
    res.cookie('userToken', token, {maxAge:sessionTime, httpOnly: true})
    res.json({username: userFind.username})
    }
)

app.post('/adduser', (req,res) => {
    const newUser = {...req.body }
    newUser.password = bcrypt.hashSync(newUser.password, 10)
    users.push(newUser)
    res.json(newUser)
})


app.get('/users',authentication, (req,res,next) => {
    const tmpUser = users.map(element => {
        console.log(element)
        return element.username})
    console.log(tmpUser)
    res.json(tmpUser)
})

app.get("/logout", (req, res, next) => {
    console.log('logout requested')
    res.clearCookie("userToken")
    res.json({ message: "Logged you out successfully, buddhy!" })
  })

app.use((err, req, res, next) => {
    res.status(err.status || 400).json({error: err.message})
})

const PORT = 5000
app.listen(PORT, () => {
    console.log('API Listen on ', PORT)
})