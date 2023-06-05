import { Agent, User } from "@prisma/client";
import { prisma } from "config/prisma.connect";


// TODO: setup CI/CD for the project after done with apartment upload

export async function isAgentAvailable(
  email: string, 
  phoneNumber: string
): Promise<boolean> {
  const agent = await prisma.agent.findFirst({
    where: { 
      OR: [
        { email: email },
        { phoneNumber: phoneNumber },
      ],
    },
    select: {
      email: true,
      phoneNumber: true,
    },
  });

  return !agent;
}


export async function isAdminAvailable(email: string): Promise<boolean> {
    const admin = await prisma.admin.findUnique({
        where: {
            email: email
        },
    });
    if(!admin){
        return true
    }
    if(!admin.verified){
        await prisma.agent.delete({
            where: {
                email: email
            }
        })
        return true;
    }
    return false;
}

export async function isUserAvailable(email: string): Promise<boolean>{
    const user = await prisma.user.findUnique({
        where: { email: email }
    })
    
    if(!user){
      return true;
    }

    if(!user.verified){
      await prisma.user.delete({
        where: {
          email: email
        },
      });
      return true
    }
    return false;
}

//TODO: look for way to get rid of multiple apartment in the same community and address and number


export async function getAllAgents(email: string): Promise<Agent[]> {
  const agent = await prisma.agent.findMany({
    where: {
      email: email
    }, 
    orderBy: {
      createdAt: "asc"
    }
  })

  return agent
}

export async function getAllUsers(email: string):Promise<User[]> {
  const getUsers = await prisma.user.findMany({
    where: {
      email: email
    },
    orderBy: {
      createdAt: "asc",
    }
  });

  return getUsers
  
}

export async function addNewApartment(
  address: string,
  community: string
): Promise<boolean>{
  const apartment = await prisma.apartment.findFirst({
    where: {
      OR: [
        {address: address},
        {community: community}
      ],
    },
    select: {
      address: true,
      community: true,
    }
  });
  if (apartment){
    throw new Error('an apartment with that address or community already exits')
  }

  return !apartment
}

// TODO: create schema for profile of user and agent
