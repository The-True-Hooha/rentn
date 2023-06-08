import { prisma } from "config/prisma.connect";
import cache from "./cacheData";

// TODO: setup CI/CD for the project after done with apartment upload


//TODO: look for way to get rid of multiple apartment in the same community and address and number


export async function findRentn(email: string): Promise<any> {
  try {
    const key = `findRentn:${email}`;

    // check if results exits in the cache
    const cachedResult = cache.get(key);
    if (cachedResult !== undefined) {
      return cachedResult
    }

    const findRentn = await prisma.rentn.findUnique({
      where: {
        email: email
      },
      select: {
        email: true
      },
    })
    
    const result = !findRentn
    cache.set(key, result)
    return result;
  } catch (error: any) {
    throw new Error(`${error}, occurred from fetching db query in findRentn`)
  }
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
