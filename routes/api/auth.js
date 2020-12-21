import * as express from "express";
import { Router } from "express";
import bcrypt from 'bcryptjs'
import User from "../../models/User";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import {auth} from '../../middleware/auth'

dotenv.config();

const router = Router();

const jwtSecret = process.env.JWT_SECRET



// @route POST /api/auth
// authenticate user / login
// access Public

router.post('/user/login', async (req, res) => {
   try {
        const {email, password} = req.body
 
        //simple validation
        if(!email || !password)
         return res.status(400).json({msg:'Please enter all fields'})
       
         // look for duplicate emails 
         const foundUser = await User.findOne({email})
         if (!foundUser) return res.status(400).json({msg: 'User does not exist'})
         
         //validate password
        const match = await bcrypt.compare(password, foundUser.password)
        if(!match) return res.status(400).json({msg: 'Invalid credentials'})

        const token = jwt.sign({id: foundUser._id}, jwtSecret, {expiresIn: 7200})
        if (!token) throw Error('Error with getting JWT')

          res.json({
              actionCompeleted: "User authenticated",
              token,
              user: {
              id: foundUser._id,
              name: foundUser.name,
              email: foundUser.email
            }
        })


    } catch(e){
        res.status(400).json({ error: e.message });
    }


});

// @route POST /api/auth/user
// get user data
// access private

router.get("/user", auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)

    } catch (e){
        res.status(400).json({ error: e.message });
    }


})



export default router