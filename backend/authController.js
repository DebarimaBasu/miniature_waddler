import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const register = async(req,res) => {

    const {email, password, name, role, photo, gender} =req.body
    try {
        let user = null

        if(role === "patient"){
            user = await User.findOne({email});
        }
        else if(role === "doctor"){
            user =await Doctor.findOne({email});
        }

        //check if user exist
        if(user){
            return res.status(400).json({message :"User already exist"});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const  hashPassword = await bcrypt.hash(password,salt);

        if(role === "patient"){
            user = new User({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }

        if(role === 'doctor'){
            user = new Doctor({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }

        await user.save();
        
     res
        .status(200)
        .json({sucess:true,message:'user sucessfully created'})

    } catch (err) {
        res.status(500).json({
            sucess:false,
            message:'Internal server error,Try again',
        });
    }
};

export const login = async(req,res) => {
    try {
   
    } catch (err) {
        
        }
    };

         