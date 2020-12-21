import * as express from "express";
import { Router } from "express";
import bcrypt from 'bcryptjs'
import User from "../../models/User";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();

const router = Router();

const jwtSecret = process.env.JWT_SECRET



// @route POST /api/users
// register user
// access Public

router.post('/', async (req, res) => {
   try {
        const {name, email, password} = req.body
 
        //simple validation
        if(!name || !email || !password)
         return res.status(400).json({msg:'Please enter all fields'})
       
         // look for duplicate emails 
         let foundUser = await User.findOne({email})
         if (foundUser) return res.status(400).json({msg: 'Email already registered'})
         
         //gen salt and hash 
         const salt = await bcrypt.genSalt(10);
        if(!salt) throw Error('problem with bcrypt salt')

        const hash = await bcrypt.hash(password, salt);
        if(!hash) throw Error('problem with bcrypt hash')
         
        //save new user
         const newUser = new User({
            name, 
            email, 
            password: hash})
        
        const registeredUser = await newUser.save()
        if (!registeredUser) throw Error('Something went wrong saving the user') 
         
        const token =  jwt.sign({id: registeredUser._id}, jwtSecret, {expiresIn: 7200})
        if (!token) throw Error('Something with getting JWT')

          res.json({
              actionCompleted: "User Registered",
              token,
              user: {
              id: registeredUser.id,
              name: registeredUser.name,
              email: registeredUser.email
            }
        })
    } catch(e){
        res.status(400).json({ error: e.message });
    }


});


export default router