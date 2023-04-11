export interface CreateUserDto {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
 
}

export interface UserLogin {
    email: string;
    password: string;
}
