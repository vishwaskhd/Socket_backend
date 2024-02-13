const { responseData,responseMessage } = require("../helpers/response");
const statusCode = require("../config/statusCode");
const service=require("../services")

exports.getMessageByRoomId = async (req, res) =>{
        try {
            const result = await service.messageService.getMessagesByRoomId(req.query.room_id);
            if (!result) return responseData({ res, statusCode: statusCode.BADREQUEST, success: 0, message: responseMessage("wrong") });
            responseData({ res, ...result });
        } catch (error) {
            responseData({ res, statusCode: statusCode.SERVER_ERROR, success: 0, message: error.message });
        }
    }
