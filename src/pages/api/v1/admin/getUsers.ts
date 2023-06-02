// this returns an array of all the users in the database

import { getAllUsers } from "lib/check.db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
){
    // TODO: check the auth dir and see if they're anymore validations for you to make
    try {
        const email: string = "";
        const getUsers = await getAllUsers(email);
        if (getUsers.length == 0){
            res.status(200).send({
                message: 'there are no current users available in the database',
                date: new Date()
            })
        } else {
            const mapUsers = getUsers.map((v) => {
                return {
                    name: v.name,
                    email: v.email,
                    createdAt: v.createdAt,
                    phoneNumber: v.phoneNumber,
                    verified: v.verified,
                }
            })
            res.status(200).send({
                message: 'returned all the list of users from the database',
                data: mapUsers,
                date: new Date(),
            })
        }
    } catch (error: any) {
        throw new Error("there's an error fetching from the database", error)
    }

}

// TODO: add database pagination for users as the size increases