import express from 'express';
import cors from "cors";
import './db-connect.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from './User.js';

const app = express();

app.use( express.json() ); 
app.use( cors({
  origin: 'http://localhost:3000',
  credentials: true 
}) );
app.use( cookieParser() );

const users = [];
const secret = "dirtyLittleSecret";

const auth = (req, res, next) => {
   
    const token = req.cookies.token;
    
    if (!token) {
        next(new Error('no token found'));
    }

    try {
        let verifyUser = jwt.verify(token, secret)
        req.user = verifyUser;
        console.log(verifyUser);
        next();
    }

    catch(err) {
        next(err);
    }
}

app.get('/', (req, res)=> {
    res.send(`<h3>Shinhee's calling</h3>`)
});

app.post('/signup', async (req, res)=> {
    const userData = {...req.body};
    userData.password = bcrypt.hashSync(userData.password, 10);
    const newUser = await User.create(userData);
    users.push(newUser)
    console.log(users)
    res.json(newUser);
})


app.post('/login', async (req, res, next)=> {
    
    const {username, password} = {...req.body};
    const foundUser = await User.findOne({username});

    try {
        if(!foundUser) {
            return next(new Error('user does not exist'));
        };

        const loginSuccess = await bcrypt.compareSync(password, foundUser.password);
    
        if (!loginSuccess) {
            return next(new Error('login failed'));
        };
             
        let token = await jwt.sign(foundUser.toJSON(), secret);
        let sessionInSec = 1000*60*30;
        res.cookie('token', token, {maxAge: sessionInSec, httpOnly: true});
        console.log('logged in successfully');
        res.json( foundUser );
    
        } 
    catch(err) {
        next(err);
    }
    }
    
);

app.get('/users', auth, async (req, res)=> {
    const allUsers = await User.find();
    res.json(allUsers);
})


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message})
  })
  
  const PORT = 5000
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}!`);
  });