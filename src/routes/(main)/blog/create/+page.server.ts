import { prisma } from "$lib/server/prisma";
import type { PageServerLoad, Actions } from "./$types"
import { redirect } from "@sveltejs/kit"
import { cloud } from "$lib/server/cloudinary"

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

        const options = {
            transformation: [
                {
                    quality: "50"
                }
            ]
        }

        if (base64.length) {
            const slikainfo = await cloud.uploader.upload(base64, options)
            await prisma.post.create({
                data: {
                    title: title,
                    coverImage: slikainfo.secure_url,
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