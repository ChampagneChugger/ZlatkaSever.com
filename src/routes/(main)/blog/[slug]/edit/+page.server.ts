import { prisma } from "$lib/server/prisma";
import { redirect, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
    const { user, session } = await locals.validateUser()

    if (!session && !user) {
        throw redirect(302, "/")
    }

    const getPage = async () => {
        const page = await prisma.post.findUnique({
            where: {
                slug: params.slug
            }
        })

        if (!page) {
            throw error(404, "Stranica ne postoji")
        }

        if (page.userId != user.userID) {
            throw error(403, "Ovo nije vaša objava.")
        }

        return page
    }

    return {
        page: getPage()
    }
};

export const actions: Actions = {
    uredi: async ({ request, params }) => {
        const { pagecontent, pageid, base64 } = Object.fromEntries(await request.formData()) as {
            pagecontent: string,
            pageid: string,
            base64: string,
        }

        try {
            await prisma.post.update({
                where: {
                    id: Number(pageid)
                },
                data: {
                    content: pagecontent
                }
            })

            if (base64.length) {
                await prisma.post.update({
                    where: {
                        id: Number(pageid)
                    },
                    data: {
                        coverImage: "https://hhesboxchergnesswrud.supabase.co/storage/v1/object/public/slike/" + base64
                    }
                })
            }
        } catch (err) {
            throw redirect(302, "/blog/" + params.slug)
        }

        throw redirect(302, "/blog/" + params.slug)
    },

    odustani: async ({ params }) => {
        throw redirect(302, "/blog/" + params.slug)
    }
};