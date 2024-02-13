exports.responseData = ({ res, statusCode, success, message, data, error }) => {
	const resultObj = {
		success: success,
		message: message,
		result: data,
		error: error
	};
	return res.status(statusCode).send(resultObj);
};


exports.responseMessage=(response,type='',module='Data')=>{
let return_message
	switch(response) {
		case "error":
			return_message = `Error in ${type} data`
			break;
		case "success":
			return_message=`${module} ${type} successfully`
			break;
		case "wrong":
			return_message=`Something went wrong.`
			break;
		case "not_found":
			return_message=`No such ${type} exist`
			break;
		case "empty_body":
			return_message=`Please enter some data`
			break;
		case "name_used":
			return_message=`This ${type} is already in use.`
			break;
		case "name_not_matched":
			return_message="The name provided does not match our records. Please try again."
			break;
		case "empty_login_body":
			return_message="Please enter Username or Password!"
			break;
		case "password_invalid":
			return_message="The password provided is invalid. Please try again."
			break;
		case "user_logged":
			return_message="User logged successfully!"
			break;
		default:
			return_message="No message"
			break;
		  
	  }
	return return_message
}