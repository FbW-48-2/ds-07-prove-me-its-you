import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();

app.use( express.json() ); 
app.use( cors({
  origin: 'http://localhost:3000',
  credentials: true 
}) );
app.use( cookieParser() );

const users = [ 
    { username: 'corey', password: '1234' }, 
    { username: 'shinhee', password: '1234' }, 
    { username: 'lara', password: '1234' } 
];
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

app.post('/login', (req, res)=> {
    
    const { username, password } = req.body;
    
    try {
        let authUser = users.find(user => user.username === username && user.password === password);
        let token = jwt.sign(authUser, secret)
        console.log(token);
        let sessionInSec = 1000*60*30;
        res.cookie("token", token, {maxAge: sessionInSec, httpOnly: true});
        console.log('logged in successfully');
        res.json(authUser);
    }
    
    catch {
        console.log('login failed');
        throw new Error('login failed');
    }      
    }  
);

app.get('/users', auth, (req, res)=> {
    res.json(users)
})





app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message})
  })
  
  const PORT = 5000
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}!`);
  });