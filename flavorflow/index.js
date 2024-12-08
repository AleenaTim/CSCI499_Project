import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import FormDataModel from './models/FormData.js';
import { PORT, mongoDBURL } from './config.js';

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

  import jwt from 'jsonwebtoken';

  const SECRET = 'your_secret_key'; // Replace with a secure secret key
  
  // Middleware to authenticate JWT token
  const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (!token) return res.status(401).json('Access Denied');
  
      jwt.verify(token, SECRET, (err, user) => {
          if (err) return res.status(403).json('Invalid Token');
          req.user = user;
          next();
      });
  };
  
  // Login Route (Update to return token)
  app.post('/login', (req, res) => {
      const { email, password } = req.body;
      FormDataModel.findOne({ email }).then((user) => {
          if (!user || user.password !== password) {
              return res.status(400).json('Invalid Credentials');
          }
  
          const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
              expiresIn: '1h',
          });
          res.json({ token });
      });
  });
  
  // Get User Data
  app.get('/user', authenticateToken, (req, res) => {
      FormDataModel.findById(req.user.id).then((user) => {
          if (!user) return res.status(404).json('User Not Found');
          res.json({ name: user.name, email: user.email });
      });
  });
  


app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(users => res.json(users))
            .catch(err => res.json(err))
        }
    });
});
