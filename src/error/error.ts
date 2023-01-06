export type MyError = {
    message: string | ErrorMessages; 
    resolution: string | undefined;
}

export const enum ErrorMessages {
    HTTPError = 'Axios error to do the request'
}

export const isError = (toBeDeterminated: any | MyError): toBeDeterminated is MyError => {
    return !!(toBeDeterminated as MyError)?.message;
    // !! is null return false is not rerurn true
}