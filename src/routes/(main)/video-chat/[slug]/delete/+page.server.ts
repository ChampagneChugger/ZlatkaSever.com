import { prisma } from "$lib/server/prisma";
import { redirect, error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, params }) => {
    const { user, session } = await locals.validateUser()

    if (!session && !user) {
        throw redirect(302, "/")
    }

    const checkAdmin = async () => {
        const isAdmin = await prisma.user.count({
            where: {
                id: user.userID
            }
        })

        return isAdmin
    }

    const isAdmins = await checkAdmin()

    if (isAdmins == 0) {
        throw error(401, "Nemate pristup ovoj stranici.")
    } else {
        await prisma.videoSessions.delete({
            where: {
                url: params.slug
            }
        })

        throw redirect(302, "/video-chat/")
    }
}