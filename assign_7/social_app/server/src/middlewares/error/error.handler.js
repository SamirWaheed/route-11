
function errorHandler (error,req,res,next){

    error.status = error.status ?? "error";
    error.statusCode = error.statusCode ?? 500;
    res.status(error.statusCode).json({
        status : error.statusCode,
        message  : error.message
    })

}
export default errorHandler;