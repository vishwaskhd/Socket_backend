exports.getAllData=async(query,model)=>{
    const get_data=await model.findAll(query)
    try{
        return {data:get_data}
    }catch(error){
        return {error:error}
    }
}

exports.getDataById=async(query,model)=>{
    const get_single_data=await model.findOne(query)
    try{
        return {data:get_single_data}
    }catch(error){
        return {error:error}
    }

}

exports.createData=async(body,model)=>{
    const create_data= await model.create(body)
    try{
        return {data:create_data}
    }catch(error){
        // if (error.name === "ValidationError") {
        //     let errors = {};
        //     Object.keys(error.errors).map((key) => {
        //       errors[key] = error.errors[key].message;
        //     });
        //    return {error:errors}
        //   }
        return {error:error}
    }
}

exports.editData=async(query,body,model)=>{
    const updated_data= await model.update(body,query)
    try{
        return {data:updated_data}
    }catch(error){
        return{error:error}
    }
}

exports.deleteData=async(query,model)=>{
    const deleted_data=await model.destroy(query,model)
    try{
        return {data:deleted_data}
    }catch(error){
        return{error:error}
    }
}