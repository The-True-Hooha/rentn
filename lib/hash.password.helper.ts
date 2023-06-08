import { genSalt, hash } from 'bcrypt';

export default async function hashString(password: string): Promise<string> {
  const saltRounds = Number(process.env.SALT_ROUNDS);
  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}
