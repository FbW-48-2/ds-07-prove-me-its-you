import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcryptjs';

// * SETUP
const JWT_SECRET = "thisIsTheSecretKey";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// * DATA
let users = [];

// * MIDDLEWARE
const auth = (req, res, next) => {
  console.log(req.cookies);
  const {token} = req.cookies;
  if(!token){
    return next(new Error("No token found, so sad."))
  } else {
    try {
      const decodedUser = jwt.verify(token, JWT_SECRET);
      req.user = decodedUser;
      next();
    } catch (err) {
      next(err);
    }
  }
}

// * ROUTES
app.post('/signup', async(req, res, next)=>{
  const userData = req.body;
  userData.password = bcrypt.hashSync(userData.password, 5);
  users.push(userData);
  res.json(userData);
})

app.post('/login', (req,res, next)=>{
  const data = req.body;
  const foundUser = users.find(user => user.username == data.username);
  if(!foundUser){
    return next(new Error(`No user with username ${data.username} found.`))
  }

  const loginSuccessful = bcrypt.compareSync(data.password, foundUser.password);
  if(!loginSuccessful){
    return next(new Error(`Password is invalid.`))
  }
  let jwtToken = jwt.sign(foundUser, JWT_SECRET, {expiresIn: "30m"});
  res.cookie('token', jwtToken, {httpOnly:true});
  delete foundUser.password;
  res.json(foundUser);
})

app.get('/users', auth, (req, res, next)=>{
  res.json(users)
});

// * ERROR HANDLING
app.use( (err, req, res, next) => {
  res.status(400).json({
    error: err.message
  })

})

// * LISTEN TO PORT
const PORT = 5000
app.listen( PORT, () => {
  console.log(`API started up on http://localhost:${PORT}`) 
})