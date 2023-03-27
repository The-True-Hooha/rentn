export interface CreateAgentDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export interface UpdateAgentDto {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
}