import { prisma } from "config/prisma.connect";
import { ApartmentDto } from "dto/agent.dto.interface";
import { ApiResponseDto } from "dto/apiResponseDto";
import { addNewApartment } from "lib/check.db";
import { errorHelper } from "lib/errorHelper";
import { apartmentSchemaValidation } from "lib/schema.validator";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler (
    req: NextApiRequest, 
    res: NextApiResponse
) {

    const validateApartmentSchema = apartmentSchemaValidation(req.body)
    if(validateApartmentSchema){
        return res.status(400).send({
            message: 'the req body sent is not correct || acceptable',
            data: validateApartmentSchema
        })
    }

    try {

        const newApartment: ApartmentDto = req.body;
        //TODO:find agent
        // TODO: validate if an agent has completed his/her profile and has logged in

        // const findAgent = await prisma.agent.findUnique({
        //     where: {
        //         agentId
        //     }
        // })
        if( await addNewApartment(newApartment.address, newApartment.community)){
            const createNewApartment = await prisma.apartment.create({
                data: {
                    address: newApartment.address,
                    community: newApartment.community,
                    apartmentType: newApartment.apartmentType,
                    price: {
                        connect: {
                            //apartmentId
                            //priceId
                            //apartmentId_apartmentType

                        }
                    },
                    description: newApartment.description,
                    images: newApartment.images,
                    contact: {
                        connect: {
                            //agentId: 
                            //email
                            //phoneNumber
                        }
                    }
                }
            })

            const apartmentResponse: ApiResponseDto<ApartmentDto> = {
                statusCode: 201,
                data: createNewApartment,
                message: 'successful',
                url: req.url,
                date: new Date(),
            }
            res.send(apartmentResponse)
        } else {
            // use custom error helper
            res.send()
        }

    } catch (error: any) {
        console.log('error', error)
        // custom error helper
        return res.send()
    }
}