import { prisma } from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
    const getPage = async () => {
        const page = await prisma.page.findUnique({
            where: {
                slug: params.slug
            },
            include: {
                User: {
                    select: {
                        username: true,
                        name: true
                    }
                }
            }
        })

        if (!page) {
            throw error(404, "Stranica ne postoji.")
        }

        return page
    }

    return {
        post: getPage()
    }
};