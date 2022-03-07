
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import userDetailsModel from "../models/userDetailsModel.js";
import bcryppt from 'bcrypt';
import crypto from 'crypto';
import mongoose from "mongoose";



const createUser =async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    // fata form client is requested into the body
    const {email,username,password,storePass}= req.body;
    console.log(req.body);
    let userRole= 'user';
    console.log('this is the request body ' + email + username + password);

    //find if email exists
    const user = await userModel.findOne({"email":email});
    //find if username exists
    const user2 = await userDetailsModel.findOne({"username":username});

    console.log("find a user "+user);

    if(user){
        //error code
        console.log("This Email is already in Use")
        res.status(409).send("This Email is already in Use");
    }else if(user2){
        console.log("This username is already in Use")
        res.status(409).send("This username is already in Use");

    } else{
        //encrypt password (security)
        const hashedPassword = await bcryppt.hash(password,13);
        const randomString =  crypto.randomBytes(20).toString('hex');
        const address = '0x'+ randomString;
        const userInfoID = mongoose.Types.ObjectId();

        //TODO:  generate wallet address using web3js
        const userInfo ={
            etherAddress:address,
            username: username,
            itemsMinted:[],
            itemsCreated:[],
            _id: userInfoID,
        }
        console.log("user info id before print"+userInfoID);

        //set user role

        if(storePass === 'jehucal20' ){
            console.log(storePass);
            userRole= 'admin';
        }

        const userDetail = new userDetailsModel({etherAddress:userInfo.etherAddress,username:userInfo.username,itemsCreated: userInfo.itemsCreated
                            ,itemsMinted: userInfo.itemsMinted,_id:userInfoID});
        await userDetail.save();
        console.log('this is the user details printed'+ userDetail) ;

        //userDetail.findOne({})
        // console.log(email,password,userInfo,false)
        const newUser = new userModel({email:email,username:userInfo.username,password:hashedPassword,role:userRole,userDetailId:userInfoID,isVerified:false});
        await newUser.save();
        // newItem.save();
        console.log('this is the the new user Created'+ newUser) ;
        const idInserted = newUser._id;
        jwt.sign({
                id:idInserted,
                email,
                username,
                userRole,
                userInfoID,
                isVerified:false,
            },
            process.env.JWT_SECRET,{
                expiresIn:'3d',
            },
            //sending the new data to the front end to confirm that the right data is passed to backend
            (err,token) => {
                if(err){
                    return res.status(500).send(err);
                }

                //  res.status(200).json({token});
                res.json(token)
                console.log("token: "+token)

            });

    }



};




export default createUser;