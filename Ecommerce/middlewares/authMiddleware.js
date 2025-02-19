import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import userModel from '../models/userModel.js';
import e from 'express';


export const requireSignIn = async(req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).send({
                success: false,
                message: 'Token is required',
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in authentication',
            error
        })
    }
}

// have a little dought 
export const isAdmin = async(req, res, next) => {
    try{
        const user = await userModel.findById(req.user._id);
        if(user.role!==1)
        {
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Access you are not admin',
            })
        }
        else{
            next();
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in authentication admin middleware',
            error
        })
    }
}