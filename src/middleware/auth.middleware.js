import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import User from "../models/user.js"
dotenv.config()

const verifyToken=async(req , res , next)=>{
   try {
        const token=req.headers.authorization
        console.log("token",token)
        const decode=jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("decode.id",decode, decode.id)
        req.user=await User.findById(decode.id).select("-password")
    next();
    }
    catch (error) {
    res.status(400).json({message:"invalid token"})
    }}

    export default verifyToken