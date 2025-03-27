import { neon } from "@neondatabase/serverless";
import * as bcrypt from 'bcryptjs'

const sql = neon(process.env.NEON_DB_URL!);

export const POST = async (req: Request) => {
    try {
        const { username, password } = await req.json()

        const [user] = await sql`SELECT * FROM users WHERE username = ${username}`
        console.log(user.password)

        const isMatch = await bcrypt.compare(password,user.password)
        console.log('isMatch::: ', isMatch);
        

        // const dcryptedPassword = await bcrypt.compare(password)

        return Response.json({ ok: "ok" })
    } catch (error) {
        console.log('error', error)
        return Response.json({ ok: "not ok" })
    }
}