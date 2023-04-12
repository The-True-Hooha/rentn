import { serialize, CookieSerializeOptions } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { cookies } = req;

  const jwt = cookies;

  if (!jwt) {
    return res.send({ message: "oops! you're not logged in" });
  } else {
    const setCookie: CookieSerializeOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    };
    const serialized = serialize("rentn", "", setCookie);

    res.setHeader("rentn", serialized);

    res.status(200).send({ message: "successfully logged out!" });
  }
}
