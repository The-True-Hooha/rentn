import { prisma } from "config/prisma.connect";

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

// look for way to get rid of multiple apartment in the same community and address and number

