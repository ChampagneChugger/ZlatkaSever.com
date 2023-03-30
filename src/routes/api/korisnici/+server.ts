import type { RequestHandler } from "./$types"
import { json } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json()

    const results = await prisma.user.findMany({
        where: {
            OR: [
                { name: { contains: data } },
                { username: { contains: data } }
            ]
        }, select: {
            name: true,
            username: true,
            profile_picture: true
        }
    })

    return json({
        data: results,
    })
}