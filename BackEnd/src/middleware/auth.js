import Jwt from "jsonwebtoken"
import userModel from "../../DB/model/user.model.js"
import { StatusCodes } from "http-status-codes"
export const roles={
    admin:'Admin',
    user:'User'
}

Object.freeze(roles)
const auth = (roles=[])=>{
    return async (req,res,next)=>{
        try{
            const{authorization}=req.headers;
            if(!authorization?.startwith(process.env.BEARER_KEY)){
                return res.json({message:"In-valid bearer key"})
            }
            const token = authorization.split(process.env.BEARER_KEY)[1]
            if(!token){
                return res,json({message:"In-valid Token"})
            }
            const decoded = Jwt.verify(token,process.env.TOKEN_SIGNATURE)
            if(!decoded?.id){
                return res.json({message:"In-valid Token Payload"})
            }
            const authUser = await userModel.findById(decoded.id).select('-password')
            if(!authUser){
                return res.json({message:"Not Registered Account"})
            }
            if(!roles.includes(authUser.role)){
                res.status(StatusCodes.UNAUTHORIZED).json({message:"Not Authorized User"})
            }
            req.user=authUser;
            return next()
        }
        catch(error){
            return res.json({message:"Catch Error",err:error?.message})
        }
    }
}

export default auth