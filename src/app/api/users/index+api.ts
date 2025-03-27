import { decodeJWT } from '@/utils/svAuth'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.NEON_DB_URL!)

export const PATCH = async (req: Request) => {
    try {
        const token = decodeJWT(req)
        if (!token) return Response.json("Unauthorised", { status: 401 })

        const { name, username, avatar, push_token } = await req.json()

        const [updatedUser] = await sql`
        UPDATE users
        SET
            name = COALESCE(${name}, name),
            username = COALESCE(${username}, username),
            avatar = COALESCE(${avatar}, avatar),
            push_token = COALESCE(${push_token}, push_token)
        WHERE id = ${token.id} RETURNING *
        `
        if (!updatedUser) return Response.json("User not found", { status: 404 })

        const { password, ...userWithoutPassword } = updatedUser
        return Response.json(userWithoutPassword)
        
    } catch (error) {
        console.error('Update user error:', error)
        return Response.json("Internal server error", { status: 500 })
        
    }
}