import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
    const getProfile = async () => {
        const profile = await prisma.user.findUnique({
            where: {
                username: params.slug
            }
        })

        if (!profile) {
            throw error(404, "Korisnik ne postoji.")
        }

        return profile
    }

    return {
        profile: getProfile()
    }
};