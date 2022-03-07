import express from 'express';
import loginUser from '../controller/LoginController.js';
import createUser from '../controller/RegisterController';
import {
  create,
  findAllcreated,
  getItemDetails,
  getUserDetails,
} from '../controller/AdminController.js';
import { findAllminted, mint } from '../controller/UserController.js';
import cors from 'cors';

const app = express();
//this allows request body to be take json to be made into an object
app.use(express.json());
//all cross object referencing from front end

app.use(cors());

//user login
//LOGIN
app.post('/api/login', loginUser);
app.post('/api/register', createUser);

//All users
//get item details
app.get('/getItemDetails/:ID', getItemDetails);
//get userdetails
app.get('/getUserDetails/:userDetailId', getUserDetails);

///ADMIN
//get all items
app.get('/admin/getItems/:userDetailId', findAllcreated);
//create item for minting
app.post('/admin/createItem', create);

///User
//get all items
app.get('/user/getItems/:userDetailId', findAllminted);
//create item for minting
app.post('/mintItems', mint);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

export default app;
