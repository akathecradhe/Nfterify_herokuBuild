import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('this is the request body ' + email + password);

  //find if email exists
  const user = await userModel.findOne({ email: email });

  if (!user) {
    //error code
    console.log('error with password');
    res
      .status(409)
      .send('Something wrong with  password or username please try again');
  } else {
    console.log('user item:    ' + user);
    const userPassword = user.password;
    const username = user.username;
    const id = user._id;
    const userRole = user.role;
    const userInfoID = user.userDetailId;
    const isVerified = user.isVerified;

    // unhash then check if passwords are the same

    const passwordIsSame = await bcrypt.compare(password, userPassword);

    if (passwordIsSame) {
      jwt.sign(
        {
          id,
          email,
          username,
          userRole,
          userInfoID,
          isVerified,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '3d',
        },
        (err, token) => {
          if (err) {
            return res.status(500).send(err);
          }

          res.json(token);
          console.log('token: ' + token);
        }
      );
    } else {
      //wrong password send error
      res.sendStatus(401);
    }
  }
};

export default loginUser;
