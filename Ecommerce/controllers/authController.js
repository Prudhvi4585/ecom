import userModel from '../models/userModel.js';
import { hashPassword } from '../helpers/authHelper.js';

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
        const user = new userModel({
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