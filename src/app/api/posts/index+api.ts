import dummyPosts from "@/dummyData"
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEON_DB_URL!);

export const GET = async () => {
    const posts = dummyPosts

    const res = await sql`SELECT version()`
    console.log('res at db', res)
    return Response.json({posts})
}

export const POST = async (req: Request) => {
    const { userId, content } = await req.json()
    const newPost = {
        id: 23,
        user_id: 'userId',
        content
    }

    return Response.json({newPost, status: 201})

}