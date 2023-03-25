// works for every success request
export interface ApiResponseDto<T> {
    statusCode: number;
    message: string;
    data: T;
    url: any;
    date: Date;
}
