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

    if (role?.role == 0) {
        throw redirect(302, "/video-chat")
    }

    const getCurrentVideoSessions = async () => {
        const videoSessions = await prisma.videoSessions.findMany({
            include: {
                User: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return videoSessions
    }

    return {
        videosesije: getCurrentVideoSessions()
    }
}