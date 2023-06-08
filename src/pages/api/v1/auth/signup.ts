import { rentnSchemaValidator } from "lib/schema.validator";
import { NextApiRequest, NextApiResponse } from "next";
import { RentnDto } from "dto/rentn.dto";
import { findRentn } from "lib/check.db";
import { prisma } from "config/prisma.connect";
import hashPassword from "lib/hash.password.helper";
import { ApiResponseDto } from "dto/apiResponseDto";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {

    const ifError = rentnSchemaValidator(req.body)
    if (ifError) {
        return res.status(400).send({
            message: 'there is an error with your signup details',
            error: ifError,
            date: new Date(),
        })
    }

    const newUser: RentnDto = req.body;
    try {
        if (await findRentn(newUser.email)){
            const createNewUser = await prisma.rentn.create({
                data: {
                    email: newUser.email,
                    password: await hashPassword(newUser.password),
                }
            })

            const response:ApiResponseDto<RentnDto> = {
                statusCode: 201,
                data: createNewUser,
                date: new Date(),
                url: req.url,
                message: 'you have successfully created an account, please check your email to complete profile',
            };
            // send email here
            res.status(201).send(response)
        } else {
            res.status(400).send({
                message: 'this email already exist'
            })
        }

    } catch (error: any) {
        console.log('agent signup error::', error)
        return res.status(500).send({
            message: 'sever is currently unavailable',
            data: error.message
        })
    }
}