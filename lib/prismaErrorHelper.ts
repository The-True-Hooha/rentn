import { NextApiResponse } from "next"
export default async function prismaErrorHelper(
    res: NextApiResponse,
    prismaQuery: () => any
) {
    try {
        const queryResult = await prismaQuery()
        if (!queryResult)
            return res.status(404).json("No response returned for query")
        return res.status(200).json(queryResult)
    } catch (err: any) {
        console.log(err)
        return res.status(400).json({
            message: err.message,
        })
    }
}