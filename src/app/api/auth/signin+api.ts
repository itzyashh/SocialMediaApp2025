import { neon } from "@neondatabase/serverless";
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const sql = neon(process.env.NEON_DB_URL!);

export const POST = async (req: Request) => {
    try {
        const { username, password } = await req.json()
        
        if (!username || !password) {
            return Response.json({ status: "error", message: "Username and password are required" }, { status: 400 })
        }

        const users = await sql`SELECT * FROM users WHERE username = ${username}`
        
        if (users.length === 0) {
            return Response.json({ status: "error", message: "Invalid credentials" }, { status: 401 })
        }

        const user = users[0]
        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
            return Response.json({ status: "error", message: "Invalid credentials" }, { status: 401 })
        }

        const accessToken = await jwt.sign({ id: user.id }, process.env.JWT_TOKEN!, { expiresIn: '7d' })
        const { password: _, ...userWithoutPassword } = user;
        return Response.json({ status: "success", user: {...userWithoutPassword, accessToken} }, { status: 200 })
    } catch (error) {
        console.error('Authentication error:', error)
        return Response.json({ status: "error", message: "Internal server error" }, { status: 500 })
    }
}