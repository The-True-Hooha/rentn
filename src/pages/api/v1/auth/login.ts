import { prisma } from "config/prisma.connect";
import { serialize } from "cookie";
import { RentnLogin } from "dto/rentn.dto";
import { createAccessToken } from "lib/auth.token";
import { findRentn } from "lib/check.db";
import { comparePasswordHash } from "lib/hash.password.helper";
import { RentnLoginValidationBody } from "lib/schema.validator";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const ifErrorBody = RentnLoginValidationBody(req.body)
    if(ifErrorBody) {
        return res.status(400).send({
            message: 'there is an error with your login details',
            error: ifErrorBody,
            data: new Date(),
        });
    }
    const login: RentnLogin = req.body;

    try {
        const rentnUser = await prisma.rentn.findUnique({
            where: {
                email: login.email,
            },
            select: {
                email: true,
                password: true,
                rentnId: true,
            }
        })

        if (rentnUser){
          const checkPassword =  await comparePasswordHash(login.password, rentnUser.password)
          if(!checkPassword) {
            return res.status(400).send({
                message: 'invalid password or password does not match'
            })
          } else {
            // const atCookie = serialize(
            //     "evaluate",
            //     createAccessToken(),
            //     {
            //         httpOnly: false,
            //         sameSite: "strict",
            //         maxAge: 60 * 60 * 24 * 7, // expires in 1 week
            //         path: "/",
            //     }
            // )
          }

        }

    } catch (error: any) {

    }
}

// TODO: create complete profile route