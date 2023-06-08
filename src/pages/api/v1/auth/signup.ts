import { rentnSchemaValidator } from "lib/schema.validator";
import { NextApiRequest, NextApiResponse } from "next";
import { RentnDto } from "dto/rentn.dto";
import { findRentn } from "lib/check.db";
import { prisma } from "config/prisma.connect";
import hashString from "lib/hash.password.helper";
import { ApiResponseDto } from "dto/apiResponseDto";
import { Resend } from "resend";
import RentnSignUpEmail from '../../../../../emails/templates/signUp';
import OtpGenerator from "lib/genOtp";

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

    const {otp, secret} = await OtpGenerator();
    
    const newUser: RentnDto = req.body;
    const resend = new Resend(process.env.RESEND_RENTN_API_KEY)
    try {
        if (await findRentn(newUser.email)){
            const createNewUser = await prisma.rentn.create({
                data: {
                    email: newUser.email,
                    password: await hashString(newUser.password),
                    secret: secret,
                    otp: otp,
                }
            })

            // send email here
            const emailContent = RentnSignUpEmail({
                rentnOtp: otp,
                email: newUser.email
            });

            // await resend.sendEmail({
            //     from: 'onboarding@resend.dev',
            //     to: newUser.email,
            //     subject: 'Rentn Email Confirmation',
            //     react: emailContent,
            // });

            const response:ApiResponseDto<RentnDto> = {
                statusCode: 201,
                data: createNewUser,
                date: new Date(),
                url: req.url,
                message: 'you have successfully created an account, please check your email to complete profile',
            };
            
            res.status(201).send(response)
            // res.redirect('/verify') redirect users to the otp verification route
        } else {
            res.status(400).send({
                message: 'user with this email already exist'
            })
        }

    } catch (error: any) {
        if (error.code == 'P2002' && error.meta?.target?.includes('email')) {
            return res.status(404).json({
                message: 'oops, this email already exist',
            })
        }
        console.log('agent signup error::', error)
        return res.status(500).send({
            message: 'sever is currently unavailable',
            data: error.message
        })
    }
}