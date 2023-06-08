import { genSalt, hash, compare } from 'bcrypt';


export default async function hashString(password: string): Promise<string> {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}


export async function UnhashString(plainData: string, hashValue: string): Promise<boolean> {  
  try {
    const checkIfMatch = await compare(plainData, hashValue);
    return checkIfMatch;
  } catch(error: any) {
    console.error('Error verifying password:', error);
    throw new Error('An error occurred while verifying the password');
  }

}