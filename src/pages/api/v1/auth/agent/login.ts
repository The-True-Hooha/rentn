import bcrypt from "bcrypt"
import { prisma } from "config/prisma.connect";
import { AgentLoginDto } from "dto/agent.dto.interface";
import { createAccessToken } from "lib/auth.token";
import { agentLoginSchema } from "lib/schema.validator";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie"

export default async function handler (
    req: NextApiRequest, 
    res: NextApiResponse
) {
    // run validator check for req body
    const agentLoginError = agentLoginSchema(req.body)
    if(agentLoginError){
        return res.status(400).send({
            message: 'there is an error with your login details',
            error: agentLoginError,
            data: new Date(),
        })
    }

    const agentLogin: AgentLoginDto = req.body;

    try {
        const agent = await prisma.agent.findUnique({
            where: {
                email: agentLogin.email
            }
        });
        if(!agent){
            return res.status(400).send({
                message: 'oops!, this agent does not exist',
                date: new Date(),
            })
        }
        const checkPassword = await bcrypt.compare(agentLogin.password, agent.password)
        if(!checkPassword){
            return res.status(400).send({
                message: 'password or email is incorrect',
                date: new Date(),
            });
        } else {
            const setCookie = serialize(
                'rentn',
                createAccessToken(agent.agentId, agent.role),{
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
        
    } catch(error: any) {
        console.log("Agent login error::", error);
        return res.status(500).send({
            message: "Server is currently unavailable",
            data: error.message,
        });
    }
}