import ApiError from "./api-error.js";

export default function ErrorProtectedRoute(fn) {
    return (req, res, next) => {
        (async () => {                                                       //WHY ASYNC?
            await fn(req, res,next)
        })().catch((err) => {
            if(err.name === "ApiError"){
                next(err)
            }
            else{
                let error = new ApiError("unknown-error", err.message, 500 )
                next(error)
            }
        })
    }
}