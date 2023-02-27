import { prisma } from "$lib/server/prisma";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types"

export const load: PageServerLoad = async ({ locals, params, parent }) => {
    const session = await locals.validate()
    const { user } = await parent()

    if (!session) {
        throw redirect(302, "/")
    }

    if (params.slug != user?.username) {
        throw redirect(302, "/")
    }
};

export const actions: Actions = {
    default: async ({ request }) => {
        const { base64 } = Object.fromEntries(await request.formData()) as Record<string, Blob>

        if (base64.length) {
            console.log(base64.length)
            console.log(base64)
        } else {
            console.log("nije mijenjao sliku")
        }
    }
};