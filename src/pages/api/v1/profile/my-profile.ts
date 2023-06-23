import { verifyAccessToken } from "lib/auth.token";
import { NextApiRequest, NextApiResponse } from "next";
import { Secret } from 'jsonwebtoken';
import { ApiResponseDto } from "dto/apiResponseDto";
import { ProfileDto } from "dto/rentn.dto";
import { prisma } from "config/prisma.connect";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { cookies} = req;
        const rentn_cookies = cookies.rentn_cookies
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as Secret;
        if (!rentn_cookies) {
            return res.status(403).send({
                message: 'hey, what are you trying to do?... Not authorized!!',
                date: new Date(),
                url: req.url
            })
        }
        
        // Verify the access token
        const verifyJwtPayload = verifyAccessToken(rentn_cookies, accessTokenSecret)
    
        if (!verifyJwtPayload) {
          return res.status(401).json({
            message: "Invalid or expired access token, please login to continue",
          });
        }

        const {id, email, role } = verifyJwtPayload as {id: string, email: string, role?: string }
    
        // Retrieve the user's profile data from the request body
        const profileData: ProfileDto = req.body;
    
        // create a new profile for the rentn user
        const createProfile = await prisma.profile.create({
            data: {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                gender: profileData.gender,
                role: profileData.role,
                phoneNumber: profileData.phoneNumber,
            }
        })

        switch (profileData.role) {
            case 'Agent':
              await prisma.agent.create({
                data: {
                  profile: {
                    connect: {
                      profileId: createProfile.profileId,
                    },
                  },
                },
              });
              break;
          
            case 'User':
              await prisma.users.create({
                data: {
                  profile: {
                    connect: {
                      profileId: createProfile.profileId,
                    },
                  },
                },
              });
              break;
          
            case 'Admin':
              await prisma.admin.create({
                data: {
                  profile: {
                    connect: {
                      profileId: createProfile.profileId,
                    },
                  },
                },
              });
              break;
          
            default:
              res.status(401).send({
                message: 'your user role is not defined...'
              })
              break;
        }
    
        const response: ApiResponseDto<any> = {
          statusCode: 201,
          data: createProfile,
          date: new Date(),
          url: req.url,
          message: "Profile completed successfully",
        };
    
        res.status(201).json(response);
      } catch (error: any) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error",
        });
    }
}