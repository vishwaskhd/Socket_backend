const jsonwebtoken = require("jsonwebtoken");
const common=require("../helpers/common")
const constant=require("../helpers/constant")
const db = require("../models/index");
const {users} =db
const statusCode = require("../config/statusCode");
const {responseMessage } = require("../helpers/response");
const common_api=require("../helpers/common_api")
const { Op } = require("sequelize");


exports.login = async (body) =>{
    if (!body.name || !body.password) return { statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("empty_login_body") };
    let query={where:{name:body.name}}
    const user = await common_api.getDataById(query,users)
    if(user.error)  return { statusCode: statusCode.NOTFOUND, success: 0, message: responseMessage("wrong")};
    else if(!user.data) return { statusCode: statusCode.NOTFOUND, success: 0, message: responseMessage("email_not_matched")};
    const checkPassword=await this.checkPassword(user.data.dataValues,body.password)
	if (!checkPassword) return { statusCode: statusCode.NOTFOUND, success: 0, message: responseMessage("password_invalid")};
    const token=await this.generateToken(user.data.dataValues)
    delete user.data.dataValues.password;
	user.data.dataValues.token = token;
    return   {statusCode: statusCode.SUCCESS, success: 1, message: responseMessage("user_logged"), data: user.data.dataValues };
};

exports.checkPassword = async (user, password) => {
    const hash =await common.encryptPassword(password)
    if (user.password !== hash) return false; 
    return  true 
};

exports.generateToken =async (user) => {
    const secret = process.env.SECRET;
    const token = jsonwebtoken.sign(
        {
            id: user.id,
            email: user.email,
            name:user.name,
        }, 
        secret,
        {
            expiresIn:constant.expires_in,
        },
    );
    return token;
};

exports.getAllUser =async(user)=>{
    let query={
        attributes:["id","name"],
        where:{
            id:{[Op.ne]:user.id}
        }
    }
    const all_users=await common_api.getAllData(query,users)
    return {statusCode: statusCode.SUCCESS, success: 1, message: responseMessage("success","get"),data:all_users.data };
}

