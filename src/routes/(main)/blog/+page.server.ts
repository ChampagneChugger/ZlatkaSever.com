import { prisma } from "$lib/server/prisma"
import type { PageServerLoad, Actions } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.validateUser()
    const getBlogPosts = async () => {
        const blog = await prisma.post.findMany({
            orderBy: {
                id: "desc"
            }, include: {
                User: {
                    select: {
                        name: true,
                        username: true
                    }
                },
                PostLikes: {
                    where: {
                        userId: user?.userID
                    },
                    select: {
                        userId: false,
                        postId: false,
                        id: true
                    }
                }
            }, take: 4
        })

        return blog
    }

    const getPostCount = async () => {
        const postcount = await prisma.post.count()

        return postcount
    }

    if (user) {
        const checkAdmin = async () => {
            const isAdmin = await prisma.user.findUnique({
                where: {
                    id: user?.userID
                }, select: {
                    role: true
                }
            })

            return isAdmin
        }

        return {
            admin: checkAdmin(),
            blog: getBlogPosts(),
            postcount: getPostCount()
        }
    } else {
        return {
            blog: getBlogPosts(),
            postcount: getPostCount(),
        }
    }
};

export const actions: Actions = {
    like: async ({ request, locals }) => {
        const { user } = await locals.validateUser()
        const { blogpostid } = Object.fromEntries(await request.formData()) as Record<string, string>

        const isLiked = await prisma.postLikes.count({
            where: {
                AND: [
                    { postId: Number(blogpostid) },
                    { userId: user?.userID }
                ]
            }
        })

        if (!isLiked) {
            await prisma.postLikes.create({
                data: {
                    userId: user?.userID,
                    postId: Number(blogpostid)
                }
            })

            await prisma.post.update({
                where: {
                    id: Number(blogpostid)
                },
                data: {
                    likes: {
                        increment: 1
                    }
                }
            })
        } else {
            await prisma.postLikes.deleteMany({
                where: {
                    AND: [
                        { postId: Number(blogpostid) },
                        { userId: user?.userID }
                    ]
                }
            })

            await prisma.post.update({
                where: {
                    id: Number(blogpostid)
                },
                data: {
                    likes: {
                        decrement: 1
                    }
                }
            })
        }
    }
};