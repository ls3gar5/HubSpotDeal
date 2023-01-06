import BaseError from "./BaseError";

class ErrorHandler {

    constructor(){

    }

    public async handleError(err: Error): Promise<void>{
        console.log('Error habdler', err.message);
    }

    public async isTrustedError(err: Error) {
        return err instanceof Error
    }
}

export default new ErrorHandler();