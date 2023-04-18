import type { RequestHandler } from "./$types"
import { json } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"
import { v4 as uuid } from "uuid"

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json()

    let userIDS: string[] = []

    for (let i = 0; i < data.length; i++) {
        const getUserId = async () => {
            const userid = await prisma.user.findUnique({
                where: {
                    username: data[i]
                }, select: {
                    id: true
                }
            })

            return userid
        }

        const userID = await getUserId()

        if (userID) {
            userIDS.push(userID.id)
        }
    }

    let randomURL = uuid()

    for (let i = 0; i < userIDS.length; i++) {
        await prisma.videoSessions.create({
            data: {
                userId: userIDS[i],
                url: randomURL
            }
        })
    }

    return json({
        data: randomURL
    })
}