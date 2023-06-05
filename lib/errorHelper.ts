export interface ErrorResponse {
    statusCode: number;
    message: string;
    data?: any;
    date: Date;
}

export function errorHelper (
    statusCode: number,
    message: string,
    data?: any,
    
): ErrorResponse{
    return {
        statusCode,
        message,
        data,
        date: new Date(),
    }
}