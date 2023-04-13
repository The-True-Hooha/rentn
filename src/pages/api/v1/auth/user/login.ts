import { prisma } from "config/prisma.connect";
import { UserLogin } from "dto/user.dto.interface";
import { userValidationSchema } from "lib/schema.validator";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { serialize } from "cookie";
import { createAccessToken } from "lib/auth.token";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
){
    const userLoginError = userValidationSchema(req.body);
    if(userLoginError){
        return res.status(400).send({
            message: 'there is an error with your login details',
            error: userLoginError,
            data: new Date(),
        })
    }

    const userLogin: UserLogin = req.body

    try{
        const user = await prisma.user.findUnique({
            where: {
                email: userLogin.email
            }
        });
        if(!user){
            return res.status(400).send({
                message: 'oops!, this user does not exits',
                date: new Date(),
            })
        }
        const checkPassword = await bcrypt.compare(userLogin.password, user.password)
        if(!checkPassword){
            return res.status(400).send({
                message: 'password or email is incorrect',
                date: new Date(),
            })
        } else{
            const setCookie = serialize(
                'rentn',
                createAccessToken(user.userId, user.role),{
                    httpOnly: false,
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 3, //expires in 3 days
                    path: '/',
                }
            )
            res.setHeader('rentn-cookie', setCookie)
            return res.status(200).send({
                message: 'login successful',
                date: new Date(),
            })
        }
    } catch (error: any) {
        console.log("Agent login error::", error);
        return res.status(500).send({
            message: "Server is currently unavailable",
            data: error.message,
        });
    }

}