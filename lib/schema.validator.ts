import {  z as zod } from 'zod';
import { fromZodError } from 'zod-validation-error';

export function agentSchemaValidation(data: {}){
    const agentSignupValidation = zod.object({
        firstName: zod
            .string()
            .nonempty('first name must not be empty')
            .max(8, "first name is too long")
            .trim(),
        lastName: zod
            .string()
            .nonempty('last name must not be empty')
            .max(8, "first name is too long")
            .trim(),
        phoneNumber: zod
            .string()
            .nonempty('phone number field must not be empty')
            .max(11, 'phone number is too long')
            .trim(),
        email: zod
            .string()
            .nonempty('email field must not be empty')
            .email('please input a valid email address')
            .trim(),
        password: zod
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .max(16, 'password is too long')
            .nonempty('password must be set by the user')
            .trim(),
    })
    try{
        agentSignupValidation.parse(data)
    } catch(err: any) {
        console.log('agent validation error::',err)
        return fromZodError(err).message
    }
}

export function userValidationSchema(data: any) {
    const userLoginSchema = zod.object({
        email: zod
            .string()
            .nonempty({message: 'email is required to login'})
            .email()
            .trim(),
        password: zod
            .string()
            .min(1, "Password must be 8 or more characters")
            .max(16, "Password is too long")
            .nonempty({message: 'password is required to login'})
            .trim(),
    })
    try {
        userLoginSchema.parse(data)
    } catch (err: any) {
        return fromZodError(err).message
    }
}

export function agentLoginSchema(data: any) {
    const agentLoginValidator = zod.object({
        email: zod
            .string()
            .nonempty({message: 'email is required to login'})
            .email()
            .trim(),
        password: zod
            .string()
            .min(1, "Password must be 8 or more characters")
            .max(16, "Password is too long")
            .nonempty({message: 'password is required to login'})
            .trim(),
    })
    try {
        agentLoginValidator.parse(data)
    } catch (err: any) {
        return fromZodError(err).message
    }
}

export function userSchemaValidation(data: any){
    const userSignUpValidation = zod.object({
        email: zod
            .string()
            .nonempty('email must not be left empty')
            .email()
            .trim(),
        name: zod
            .string()
            .nonempty('this field must not be left empty')
            .min(8, 'name must not be less than 8 characters')
            .max(16, 'character value exceeded')
            .trim(),
        password: zod
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              {
                message:
                  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
              },
            )
            .max(16, 'password is too long')
            .nonempty('password must be set by the user')
            .trim(),
    })
    try{
        userSignUpValidation.parse(data)
    } catch (err: any){
        console.log('user validation error:::',err)
        return fromZodError(err).message
    }
}

export function adminSchemaValidation(data: {}){
    const adminSchema = zod.object({
        firstName: zod
            .string()
            .min(5, 'first name must not be less than 5 characters')
            .nonempty('this field must not be left empty')
            .trim(),
        lastName: zod
            .string()
            .nonempty('last name must not be empty')
            .max(8, {message: 'first name is too long'})
            .trim(),
        password: zod
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              {
                message:
                  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
              },
            )
            .max(16, 'password is too long')
            .nonempty('password must be set by the user')
            .trim(),
        phoneNumber: zod
            .string()
            .nonempty('phone number field must not be empty')
            .max(11, 'phone number is too long')
            .trim(),
        email: zod
            .string()
            .nonempty('email field must not be empty')
            .email('please input a valid email address')
            .trim(),
        homeAddress: zod
            .string()
            .nonempty('please input address where you stay')
            .min(7, 'address too short, kindly make it more descriptive')
            .trim(),
    })
    try{
        adminSchema.parse(data)
    } catch(err: any){
        console.log('admin validation error:::', err)
        return fromZodError(err).message
    }
}

// TODO: custom check for photo duplicates with hashes and check if it's already stored in the database
export function apartmentSchemaValidation(data: {}){
    const apartmentValidation = zod.object({
        description: zod
            .string()
            .min(10, 'please provide more description about the apartment you want to rent')
            .nonempty('description cannot be left empty')
            .trim(),
        address: zod
            .string()
            .min(10, 'please provide more description to the address you want to rent')
            .nonempty('address cannot be left empty')
            .trim(),
        community: zod
            .string()
            .min(5, 'please provide clarity about the community where the apartment is located')
            .nonempty('community cannot be left empty')
            .trim(),
        apartmentType: zod
            .string()
            .nonempty('the type of apartment must be available')
            .min(5, 'add more details about the apartment type you want to rent')
            .trim(),
        images: zod
            .string()
            .optional()
            .array(),
        price: zod
            .number()
            .nonnegative('please add a valid number'),
            //added array to the schema validation, if it does not work I'll remove it
    })
    try{
        apartmentValidation.parse(data)
    }catch(err: any){
        console.log('apartment validation error::::', err)
        return fromZodError(err).message
    }

}

export function priceSchemaValidation(data: {}){
    const priceSchema = zod.object({
        price: zod
            .number()
            .nonnegative('please add a valid number'),
        tenure: zod
            .number()
            .min(1, 'not less than 1')
            .nonnegative(),        
    })
    try{
        priceSchema.parse(data)
    } catch(err: any){
        console.log(err)
        return fromZodError(err).message
    }
}


// https://stackoverflow.com/questions/75285218/is-there-a-way-to-use-zod-to-validate-that-a-number-has-up-to-2-decimal-digits

// TODO: fix eslint for lints

export function rentnSchemaValidator(data: {}) {
    
    const signUpValidation = zod.object({
        email: zod
            .string()
            .nonempty('email field must not be empty')
            .email('please input a valid email address')
            // .refine((value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), 'please use a valid email address')
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'please use a valid email address'),
        
        password: zod
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .max(16, 'password is too long')
            .nonempty('password must be set by the user')
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!.@#$%^&*]).{8,}$/, 'password must contain uppercase, lowercase, digit, and special character')
            .trim(),
    })

    try {
        signUpValidation.parse(data)
    } catch (error: any) {
        console.log('sign up validation error:: ', error)
        return fromZodError(error).message
    }
}

export function OtpZodError(data: {}) {
    const otpError = zod.object({
        email: zod
            .string()
            .nonempty('email field must not be empty')
            .email('please input a valid email address')
            // .refine((value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), 'please use a valid email address')
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'please use a valid email address'),
        
        otp: zod
            .string()
            .nonempty('otp must not be empty')
            .min(6, 'otp must not be less than six')
            .max(6, 'otp must not be greater six')
    })

    try {
        otpError.parse(data)
    } catch (error: any) {
        console.log('otp verification error', error)
        return fromZodError(error)?.message

    }

}

export function RentnLoginValidationBody(data: any) {
    const loginValidator = zod.object({
        email: zod
            .string()
            .nonempty({message: 'email is required to login'})
            .email()
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'please use a valid email address'),
        password: zod
            .string()
            .min(1, "Password must be 8 or more characters")
            .max(16, "Password is too long")
            .nonempty({message: 'password is required to login'})
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/, 'password must contain uppercase, lowercase, digit, and special character')
            .trim(),
    })
    try {
        loginValidator.parse(data)
    } catch (err: any) {
        return fromZodError(err).message
    }
}