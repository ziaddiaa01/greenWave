import { StatusCodes } from "http-status-codes";
import userModel from "../../../../DB/model/user.model.js";
import { ErrorClass } from "../../../utils/errorClass.js";
import { compare, hash } from "../../../utils/HashAndCompare.js";
import { nanoid } from "nanoid";
import sendEmail, { createHtml } from "../../../utils/email.js";
import CryptoJS from "crypto-js"
import { generateToken } from "../../../utils/GenerateAndVerifyToken.js";

//1]==================== Sign Up =====================
//=============( hash password , encrypt phone )=================
export const signup = async(req,res,next)=>{
    const isEmailExist = await userModel.findOne({email:req.body.email})
    if(isEmailExist)
    {
        return next (new ErrorClass(`This email ${req.body.email} already exist`,StatusCodes.CONFLICT))
    }
    req.body.phone = CryptoJS.AES.encrypt(req.body.phone,process.env.ENCRYPTION_KEY).toString()
    req.body.password = hash(req.body.password)
    const code=nanoid(6)
    const html = createHtml(code)
    sendEmail({to:req.body.email,subject:"Email Confirmation",html})
    req.body.code = code
    const user = await userModel.create(req.body)
    res.status(StatusCodes.CREATED).json({message:"Done",user})
}
//2]==================== Confirm Email =======================
export const confirmEmail = async(req,res,next)=>{
    const {email,code}=req.body
    const isEmailExist = await userModel.findOne({email})
    if(!isEmailExist){
        return next (ErrorClass(`Email is Not Found`,StatusCodes.NOT_FOUND))
    }
    if(code!=isEmailExist.code){
        return next (new ErrorClass(`In-valid Code`,StatusCodes.BAD_REQUEST))
    }
    // to prevent user from using the same code again
    const newCode = nanoid(6)
    const confirmedUser=await userModel.updateOne({email},{isConfirmed:true,code:newCode})
    res.status(StatusCodes.OK).json({message:"Successfully Confirmed",confirmedUser})
}
//3]==================== Sign in ======================
// =====================(must be confirmed and not deleted)==============
export const signin = async(req,res,next)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email,isConfirmed:true,isDeleted:false})
    //Email Checking
    if(!user){
        return next(new ErrorClass(`Invalid-Credentials`,StatusCodes.NOT_FOUND))
    }
    //Password Checking
    const passcheck=compare(password,user.password)
    if(!passcheck)
    {
        return next(new ErrorClass(`Invalid-Credentials`,StatusCodes.NOT_FOUND))
    }
    const payload={
        id:user._id,
        email:user.email
    }
    const userToken= generateToken({payload})
    res.status(StatusCodes.ACCEPTED).json({message:"Valid Credentials",userToken})
}
//4]==================== Forgrt Password =================
// ===================== There is no expiration Date for the sent code ======
export const sendCode = async(req,res,next)=>{
    const {email}=req.body
    const isEmailExist = await userModel.findOne({email})
    if(!isEmailExist){
        return next (new ErrorClass(`User is not found`,StatusCodes.NOT_FOUND))
    }
    // creating new code to send via email to the user
    const code = nanoid(6)
    const html=createHtml(code)

   // const html = createHtml(code)
    sendEmail({to : req.body.email,subject:"ForgottenPassword"},html)
    //sendEmail({to : req.body.email,subject:"ForgottenPassword"},html)
    await userModel.updateOne({email},{code},{new:true})
    res.status(StatusCodes.ACCEPTED).json({message : "Done"})
}
export const resetPassword = async(req,res,next)=> {
    let{email,code,password}=req.body
    const user = await userModel.findOne({email})
    if(!user){
        return next (new ErrorClass(`User is not found`,StatusCodes.NOT_FOUND))
    }
    if(code != user.code){
        return next (new ErrorClass(`In-Valid Code`,StatusCodes.BAD_REQUEST))
    }
        password = hash(password)
        const newCode = nanoid(6)
        await userModel.updateOne({email},
            {
                password,
                code:newCode
            }
        )
        res.status(StatusCodes.ACCEPTED).json({message:"Done"})   
}
//5]==================== Update Password =================
export const changePass = async(req,res,next)=> {

}
//6]==================== Delete User ===================
export const softDelete = async(req,res,next)=> {

}
//7]==================== Update User ===================
export const UpdateUser = async(req,res,next)=>{
    
}
//8]==================== Log out ========================

//9]==================== Refresh Token ==================






