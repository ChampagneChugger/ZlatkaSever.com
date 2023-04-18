import type { PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"

export const load: PageServerLoad = async ({ locals }) => {
    const { user, session } = await locals.validateUser()

    if (!user && !session) {
        throw redirect(302, "/")
    }

    const role = await prisma.user.findUnique({
        where: {
            id: user.userID
        }, select: {
            role: true,
            username: true
        }
    })

    if (role?.role == 0) {
        throw redirect(302, "/video-chat")
    } else {
        const allUsers = await prisma.user.findMany({
            select: {
                name: true,
                username: true,
                profile_picture: true
            }
        })

        return {
            allUsers
        }
    }
}