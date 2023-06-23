export interface RentnDto {
    email: string;
    password: string;
}

export interface VerifyOtpDto {
    email: string;
    otp: string;
}

export interface RentnLogin {
    email: string;
    password: string;
}

export enum Role {
    Agent = 'Agent',
    User = 'User',
    Admin = 'Admin'
}

export interface AgentProfileDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address?: string;
    gender: string;
}

export interface ProfileDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: Gender;
    role: Role;
}

enum Gender {
    Male = 'Male',
    Female = 'Female',
}