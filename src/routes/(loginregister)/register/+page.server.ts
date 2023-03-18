import { auth } from "$lib/server/lucia"
import { redirect, fail } from "@sveltejs/kit"
import { LuciaError } from "lucia-auth";
import { v4 as uuid } from "uuid"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate()

    if (session) {
        throw redirect(302, "/")
    }
};

export const actions: Actions = {
    default: async ({ request }) => {
        const { ime, korisnickoime, lozinka, email } = Object.fromEntries(await request.formData()) as Record<string, string>

        try {
            await auth.createUser({
                key: {
                    providerId: "email",
                    providerUserId: email,
                    password: lozinka
                },
                attributes: {
                    name: ime,
                    username: korisnickoime,
                    email: email,
                    videoid: uuid()
                }
            })
        } catch (err) {
            if (err instanceof LuciaError) {
                if (err.message == "AUTH_DUPLICATE_KEY_ID") {
                    return fail(400, { message: "Korisničko ime ili email su već zauzeti." })
                } else {
                    return fail(400, { message: err.message })
                }
            }
        }

        throw redirect(302, "/login?success=true&email=" + email)
    }
};