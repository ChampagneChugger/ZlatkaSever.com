import { prisma } from "$lib/server/prisma";
import { redirect, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types"

export const load: PageServerLoad = async ({ locals, params }) => {
    const { user, session } = await locals.validateUser()

    if (!session && !user) {
        throw redirect(302, "/")
    }

    if (params.slug != user?.username) {
        throw error(401, "Ovo nije vaš korisnički račun.")
    }

    const getProfile = async () => {
        const profile = await prisma.user.findUnique({
            where: {
                username: params.slug
            }
        })
        return profile
    }

    return {
        profile: getProfile()
    }
};

export const actions: Actions = {
    default: async ({ request, params }) => {
        const { base64, name, about } = Object.fromEntries(await request.formData()) as {
            base64: string
            name: string,
            about: string
        }

        if (base64.length) {
            try {
                await prisma.user.update({
                    where: {
                        username: params.slug
                    },
                    data: {
                        name,
                        about,
                        profile_picture: "https://hhesboxchergnesswrud.supabase.co/storage/v1/object/public/slike/" + base64
                    }
                })
            } catch (err) {
                throw redirect(302, "/profile/" + params.slug)
            }

            throw redirect(302, "/profile/" + params.slug)
        } else {
            try {
                await prisma.user.update({
                    where: {
                        username: params.slug
                    },
                    data: {
                        name,
                        about
                    }
                })
            } catch (err) {
                throw redirect(302, "/profile/" + params.slug)
            }

            throw redirect(302, "/profile/" + params.slug)
        }
    }
};