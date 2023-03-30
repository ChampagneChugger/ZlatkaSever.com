import type { RequestHandler } from "./$types"
import { json } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"
import { v4 as uuid } from "uuid"

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json()

    const getUserId = async () => {
        const userid = await prisma.user.findUnique({
            where: {
                username: data
            }, select: {
                id: true
            }
        })

        return userid
    }

    const korisnikID = await getUserId()
    let randomURL = uuid()

    await prisma.videoSessions.create({
        data: {
            userId: String(korisnikID?.id),
            url: randomURL
        }
    })

    return json({
        data: randomURL,
    })
}