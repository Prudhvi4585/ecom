import userModel from '../models/userModel.js';
import { hashPassword,comparePassword } from '../helpers/authHelper.js';
import jwt from 'jsonwebtoken';
// import { comparePassword } from '../helpers/authHelper.js';'

import dotenv from 'dotenv';
dotenv.config();

export const registerController = async(req, res) => {
    try{
        const {name, email, password,phone,address} = req.body

        if(!name){
            return res.status(400).send({
               error: 'Name is required',
            })
        }
        if(!email){
            return res.status(400).send({
                error: 'Email is required',
            })
        }
        if(!password){
            return res.status(400).send({
                error : 'Password is required',
            })
        }
        if(!phone){
            return res.status(400).send({
               error: 'Phone is required',
            })
        }
        if(!address){
            return res.status(400).send({
                error : 'Address is required',
            })
        }

        // existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: 'User already exists',
            })
        }

        const hashedpassword = await hashPassword(password);
        // save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedpassword
        }).save();

        res.status(200).send({  
            success: true,
            message: 'User registered successfully',
            user
        });


    }catch(error){
        console.log(error);
        res.send(500).send({
            success: false,
            message: 'Error in registeration',
            error
        })
    }
};

// export default {registerController};

export const loginController = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: 'Email or password is required',
            })
        }

        // check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User not found',
            })
        }
        const match = await comparePassword(password,user.password);
        // match =1 
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Password is incorrect',
            })
        }
        // token
        const token =  jwt.sign({_id: user._id}, process.env.JWT_SECRET,{expiresIn: '7d'});
        res.status(200).send({
            success: true,
            message: 'User login successfully',
            user : {
                name : user.name,
                email : user.email,
                phone : user.phone,
                address : user.address,
            }, 
            token
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}


export const testController = async(req, res) => {
res.send(" inside protected route ")

}