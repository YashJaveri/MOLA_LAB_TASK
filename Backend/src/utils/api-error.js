export default class ApiError{
    message = ""
    resultCode = ""
    responseCode = 400
    name = ""

    constructor(resultCode, message, responseCode = 400) {
        this.message = message
        this.resultCode = resultCode
        this.responseCode = responseCode
        this.name = 'ApiError'
    }
    toResponseData() { 
        return {
            message: this.message,
            resultCode: this.resultCode
        }
    }
}