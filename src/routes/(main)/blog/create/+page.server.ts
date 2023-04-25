import { prisma } from "$lib/server/prisma";
import type { PageServerLoad, Actions } from "./$types"
import { redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ locals }) => {
    const { user, session } = await locals.validateUser()

    if (!user || !session) {
        throw redirect(302, "/")
    }

    const isAdmin = await prisma.user.findMany({
        where: {
            AND: [
                { id: user.userID },
                { role: 1 }
            ]
        }
    })

    if (isAdmin.length == 0) {
        throw redirect(302, "/blog/")
    }
};

export const actions: Actions = {
    kreiraj: async ({ request, locals }) => {
        const { user } = await locals.validateUser()
        const { pagecontent, pageid, base64, title } = Object.fromEntries(await request.formData()) as {
            pagecontent: string,
            pageid: string,
            base64: string,
            title: string
        }

        let titleNew = title.toLowerCase()
        titleNew = titleNew.replace(/\s/g, "")

        if (base64.length) {
            await prisma.post.create({
                data: {
                    title: title,
                    coverImage: "https://hhesboxchergnesswrud.supabase.co/storage/v1/object/public/slike/" + base64,
                    content: pagecontent,
                    slug: titleNew,
                    userId: user?.userID
                }
            })
        } else {
            await prisma.post.create({
                data: {
                    title: title,
                    content: pagecontent,
                    slug: titleNew,
                    userId: user?.userID
                }
            })
        }

        throw redirect(302, "/blog/" + titleNew)
    },

    odustani: async () => {
        throw redirect(302, "/blog")
    }
};