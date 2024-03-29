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
            role: true
        }
    })

    if (role?.role == 1) {
        throw redirect(302, "/video-chat/admin")
    }


    const getCurrentVideoSessions = async () => {
        const videoSessions = await prisma.videoSessions.findMany({
            where: {
                userId: user.userID
            }
        })

        return videoSessions
    }

    return {
        videosesije: getCurrentVideoSessions()
    }
}