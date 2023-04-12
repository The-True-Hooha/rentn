import { Agents } from "dto/agent.dto.interface";
import { getAllAgents } from "lib/check.db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const email = ''
    try {
        const agents = await getAllAgents(email);
        const mapAgents = agents.map(v => {
            return {
                firstName: v.firstName,
                lastName: v.lastName,
                email: v.email,
                isVerified: v.verified
            }
        })
        res.status(200).send({
            message: 'returned all the agents from the database',
            data: mapAgents,
            date: new Date()
        })
    } catch(error: any) {
        console.log('error from database:::', error)
        res.status(500).send({
            message: 'database not available',
            data: error.message
        })
    }
}
