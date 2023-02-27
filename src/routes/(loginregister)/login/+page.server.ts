import { auth } from "$lib/server/lucia";
import { redirect, fail } from "@sveltejs/kit"
import { LuciaError } from "lucia-auth";
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.validate()

    if (session) {
        throw redirect(302, "/")
    }
};

export const actions: Actions = {
    default: async ({ request, locals, url }) => {
        const { email, lozinka } = Object.fromEntries(await request.formData()) as Record<string, string>

        try {
            const key = await auth.validateKeyPassword("email", email, lozinka)
            const session = await auth.createSession(key.userId)
            locals.setSession(session)
        } catch (err) {
            if (url.searchParams.get("from") == "/") {
                throw redirect(302, "/?message=Neispravna lozinka ili korisnik ne postoji.")
            }
            if (err instanceof LuciaError) {
                if (err.message == "AUTH_INVALID_KEY_ID") {
                    return fail(400, { message: "Email adresa je neispravna ili ne postoji taj račun." })
                } else if (err.message == "AUTH_INVALID_PASSWORD") {
                    return fail(400, { message: "Netočna lozinka." })
                } else {
                    return fail(400, { message: err.message })
                }
            }
        }

        throw redirect(302, "/")
    }
}