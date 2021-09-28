import express from 'express';
import cors from "cors";
import './db-connect.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();

app.use( express.json() ); 
app.use( cors({
  origin: 'http://localhost:3000',
  credentials: true 
}) );
app.use( cookieParser() );

const users = [];
const secret = JSON.stringify(users);

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
    const userData = req.body;
    userData.password = bcrypt.hashSync(userData.password, 10);
    users.push(userData);
    res.json(userData);
})


app.post('/login', async (req, res, next)=> {
    
    const userData = req.body;
    const foundUser = await users.find(user=> user.username == userData.username);

    if(!foundUser) {
        next(new Error('user does not exist'));
    };

    const loginSuccess = bcrypt.compareSync(userData.password, foundUser.password);

    if (!loginSuccess) {
        return next(new Error('login failed'));
    };
         
    let token = jwt.sign(foundUser, secret);
    let sessionInSec = 1000*60*30;
    res.cookie('token', token, {maxAge: sessionInSec, httpOnly: true});
    console.log('logged in successfully');
    delete foundUser.password;
    res.json( foundUser );

    } 
);

app.get('/users', auth, (req, res)=> {
    res.json(users);
})


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message})
  })
  
  const PORT = 5000
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}!`);
  });