import { prisma } from "$lib/server/prisma"
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const { user, session } = await locals.validateUser()

    const getFooterPosts = async () => {
        const footerposts = await prisma.post.findMany({
            orderBy: {
                id: "desc"
            }, select: {
                title: true,
                slug: true
            }, take: 3
        })

        return footerposts
    }

    return { user, footerposts: getFooterPosts() }
};