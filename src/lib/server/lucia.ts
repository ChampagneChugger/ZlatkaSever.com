import lucia from "lucia-auth"
import prismaAdapter from "@lucia-auth/adapter-prisma"
import { dev } from "$app/environment"
import { prisma } from "$lib/server/prisma"

export const auth = lucia({
    adapter: prismaAdapter(prisma),
    env: dev ? "DEV" : "PROD",
    transformUserData: (userData: any) => {
        return {
            userID: userData.id,
            username: userData.username,
            profile_picture: userData.profile_picture
        }
    }
})

export type Auth = typeof auth