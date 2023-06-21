import { prisma } from "config/prisma.connect";
import { time } from "console";
import { VerifyOtpDto } from "dto/rentn.dto";
import { OtpZodError } from "lib/schema.validator";
import { NextApiRequest, NextApiResponse } from "next";
import speakeasy from 'speakeasy';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const otpError = OtpZodError(req.body)
        if (otpError) {
            return res.status(400).send({
                message: 'otp or email not valid for this request',
                error: otpError
            })
        }

        const rentnUser: VerifyOtpDto = req.body
        const user = await prisma.rentn.findUnique({
            where: {
                email: rentnUser.email
            },
            select: {
                otp: true,
                secret: true
            }
        })
        if (!user) {
            return res.status(400).send({
                message: 'sorry this email does not exist',
            })
        }
        console.log(user.otp, user.secret);

        console.log(rentnUser.otp);
        const verifyOtp = speakeasy.time.verify({
            secret: user.secret,
            encoding: 'base32',
            algorithm: 'sha256',
            token: rentnUser.otp,
            step: 600,
            digits: 6,
            window: 1,
        })
        console.log(verifyOtp, "otp verification")
        if (verifyOtp) {
            await prisma.rentn.update({
                where: {
                    email: rentnUser.email,
                },
                data: {
                    status: 'VERIFIED',
                },
            });
            // res.redirect('/login') redirect the user to the login page
            return res.status(200).send({
                message: 'OTP verified successfully.',
              });
        } else {
            return res.status(400).send({
                message: 'sorry, otp invalid or has expired',
            })
        }

    } catch (error: any) {
        return res.status(500).send({
            message: 'sever is currently unavailable',
            data: error.message
        })

    }

}