const { responseData,responseMessage } = require("../helpers/response");
const statusCode = require("../config/statusCode");
const service=require("../services")

exports.login = async (req, res) =>{
        try {
            const result = await service.userService.login(req.body);
            if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("wrong") });
            responseData({ res, ...result });
        } catch (error) {
            responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
        }
    }


exports.getAllUser = async (req, res) =>{
    try {
        const result = await service.userService.getAllUser(req.user.dataValues);
        if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("wrong") });
        responseData({ res, ...result });
    } catch (error) {
        responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
    }
}