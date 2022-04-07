export class ResponseData{
    data= {}
    message = undefined
    resultCode = "00"

    constructor(data, resultCode, message) {
        this.data = data
        this.message = message
        this.resultCode = resultCode        
    }
    
    toJSON() {         
        return {
            data: this.data,
            message: this.message,
            resultCode: this.resultCode
        }
    }
}