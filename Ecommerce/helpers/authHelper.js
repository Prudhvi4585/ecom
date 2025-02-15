import bcrypt from 'bcryptjs';
// import { hashPassword } from './authHelper';v

export const hashPassword = async(password) => {
    try{
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        return hashPassword;
    }
    catch(error){
        console.log(error);
    }
    // return bcrypt.hashSync(password, 10);
};

export const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};