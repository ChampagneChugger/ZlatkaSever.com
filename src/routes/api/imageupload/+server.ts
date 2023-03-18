import type { RequestHandler } from "./$types"
import { json } from "@sveltejs/kit"
import { cloud } from "$lib/server/cloudinary"

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json()

    const upload = await cloud.uploader.upload(data)
    const uploadedData = upload.secure_url

    return json({
        uploadedData
    })
}