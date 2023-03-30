import type { PageServerLoad } from "./$types"
import { redirect, error } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"

export const load: PageServerLoad = async ({ locals, params }) => {
    const { user, session } = await locals.validateUser()

    if (!session && !user) {
        throw redirect(302, "/")
    }

    const checkExist = async () => {
        const exist = await prisma.videoSessions.count({
            where: {
                url: params.slug
            }
        })

        return exist
    }

    const exists = await checkExist()

    if (exists <= 0) {
        throw error(401, "Ova stranica ne postoji.")
    }

    const checkAdmin = async () => {
        const isAdmin = await prisma.user.count({
            where: {
                AND: [
                    { id: user.userID },
                    { role: 1 }
                ]
            }
        })

        return isAdmin
    }

    const isAdmins = await checkAdmin()

    const checkUser = async () => {
        const isUser = await prisma.videoSessions.count({
            where: {
                userId: user.userID
            }
        })

        return isUser
    }

    const isUsers = await checkUser()

    if (isUsers <= 0) {
        if (isAdmins <= 0) {
            throw error(401, "Nemaš pristup ovom video pozivu.")
        }
    }

    return {
        role: isAdmins
    }
}