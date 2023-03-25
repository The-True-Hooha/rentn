import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "config/prisma.connect";
import { isAgentAvailable } from "lib/check.db";
import { agentSchemaValidation } from "lib/schema.validator";
import { CreateAgentDto } from "dto/agent.dto.interface";
import { ApiResponseDto } from "dto/apiResponseDto";


export default async function handler(
    req:NextApiRequest, 
    res: NextApiResponse
) {
    // checks and validates the error that is sent in the req body
    const validationError = agentSchemaValidation(req.body)
    if(validationError){
        return res.status(400).send(validationError)
    }

    // proceeds to get the new details sent
    const newAgent: CreateAgentDto = req.body;

    try{
        if(await isAgentAvailable(newAgent.email, newAgent.phoneNumber)){
            const createAgent = await prisma.agent.create({
                data: {
                    firstName: newAgent.firstName,
                    lastName: newAgent.lastName,
                    phoneNumber: newAgent.phoneNumber,
                    email: newAgent.email,
                    password: newAgent.password,
                },
            })
            const response: ApiResponseDto<CreateAgentDto> = {
                statusCode: 201,
                data: createAgent,
                message: 'dear agent, you have successfully created an account',
                url: req.url,
                date: new Date(), // if data does not appears to be in sync with the local timezone, you have to match it to fix
            }
            res.status(201).json(response)
        } else{
            res.status(400).json({
                message: 'agent with this data is already exist'
            })
        }
    } catch(error: any) {
        console.log('agent signup error::', error)
        return res.status(500).json({
            message: 'sever is currently unavailable',
            data: error.message
        })
    }
    
}