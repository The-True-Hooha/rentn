import { prisma } from "config/prisma.connect";
import { serialize } from "cookie";
import { VerifyOtpDto } from "dto/rentn.dto";
import { createAccessToken } from "lib/auth.token";
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
                secret: true,
                rentnId: true,
                email: true,
                status: true
            }
        })

        // check if the email exist in the database
        if (!user) {
            return res.status(400).send({
                message: 'sorry this email does not exist',
            })
        }

        // check is the user has already been verified or not
        if (user.status === 'VERIFIED') {
            return res.status(409).send({
                message: "this email has already been verified please proceed to login"
            })
        }

        const verifyOtp = speakeasy.time.verify({
            secret: user.secret,
            encoding: 'base32',
            algorithm: 'sha256',
            token: rentnUser.otp,
            step: 600,
            digits: 6,
            window: 1,
        })

        if (verifyOtp) {
            await prisma.rentn.update({
                where: {
                    email: rentnUser.email,
                },
                data: {
                    status: 'VERIFIED',
                },
            });

            let secure = true
            if(process.env.NODE_ENV !== 'production'){
                secure = false;
            }
            const atCookie = serialize(
                    "rentn",
                    createAccessToken(user.rentnId, user.email),
                    {
                        httpOnly: false,
                        sameSite: "strict",
                        secure: secure,
                        maxAge: 60 * 60 * 24 * 1, // expires in 1 day
                        path: "/",
                    }
                )
            res.setHeader("rentn_cookie", atCookie)
            return res.status(200).send({
                message: 'OTP verified successfully, please continue to update profile',
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