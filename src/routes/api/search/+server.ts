import type { RequestHandler } from "./$types"
import { json } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json()

    const results = await prisma.post.findMany({
        where: {
            OR: [
                { title: { contains: data } },
                { slug: { contains: data } }
            ]
        }, select: {
            title: true,
            slug: true
        }
    })

    return json({
        data: JSON.stringify(results, (_, v) => typeof v === 'bigint' ? v.toString() : v),
    })
}