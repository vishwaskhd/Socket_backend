const constant=require("../helpers/constant")
const db = require("../models/index");
const {messages} =db
const statusCode = require("../config/statusCode");
const {responseMessage } = require("../helpers/response");
const common_api=require("../helpers/common_api")

exports.getMessagesByRoomId =async(room_id)=>{
    let query={
       where:{ room:room_id}
    }
    const all_messages=await common_api.getAllData(query,messages)
    return {statusCode: statusCode.SUCCESS, success: 1, message: responseMessage("success","get"),data:all_messages.data };
}