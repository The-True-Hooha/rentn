import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "config/prisma.connect";
import { isUserAvailable } from "lib/check.db";
import { userSchemaValidation } from '../../../../../../lib/schema.validator';
import { CreateUserDto } from "dto/user.dto.interface";
import hashPassword from "lib/hash.password.helper";
import { ApiResponseDto } from 'dto/apiResponseDto';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const validateUserSchema = userSchemaValidation(req.body)
    if(validateUserSchema){
        return res.status(400).send(validateUserSchema)
    }

    const newUser: CreateUserDto = req.body;

    try{
        if(await isUserAvailable(newUser.email)){
            const createUser = await prisma.user.create({
                data: {
                    name: newUser.name,
                    phoneNumber: newUser.phoneNumber,
                    email: newUser.email,
                    password: await hashPassword(newUser.password),
                },
            })

            const apiResponse: ApiResponseDto<CreateUserDto> = {
                statusCode: 201,
                data: createUser,
                message: 'you have successfully created an account',
                url: req.url,
                date: new Date(),
            }
            res.status(201).json(apiResponse)
        }else{
            res.status(400).json({
                message: 'user with this email already exist'
            })
        }

    } catch(err: any) {
        console.log('user signup error:::',err)
        return res.status(500).json({
            message: 'sever is currently unavailable',
            data: err.message
        })
    }

}