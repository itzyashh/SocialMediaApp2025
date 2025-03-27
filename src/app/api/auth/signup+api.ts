import { neon } from "@neondatabase/serverless";
import * as bcrypt from 'bcryptjs'
import * as Crypto from 'crypto'


const sql = neon(process.env.NEON_DB_URL!);

export const POST = async (req: Request) => {
    try {
        const {
            name,
            username,
            password
        } = await req.json()

        const hashPass = await bcrypt.hash(password,4)

        await sql`INSERT INTO users (name, username, password)
        VALUES (${name}, ${username}, ${hashPass})`


        return Response.json({ ok: "ok" })
    } catch (error) {
        console.log('error', error)
        return Response.json({ ok: "not ok" })
    }
}