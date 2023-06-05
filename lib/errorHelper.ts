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

// TODO: refactor all api responses to include custom error helpers

    // if (/* some condition */) {
    //     const errorResponse = createErrorResponse(400, 'Bad Request');
    //     return res.status(errorResponse.statusCode).json(errorResponse);
    //   }
  
    //   If no error occurs, send a success response
    //   return res.status(200).json({ message: 'Success' });
    // } catch (error: any) {
    //   Handle unexpected errors
    //   console.error('An unexpected error occurred:', error);
  
    //   Create an error response with a generic message
    //   const errorResponse = createErrorResponse(500, 'Internal Server Error');
    //   return res.status(errorResponse.statusCode).json(errorResponse);
    // }
