import { neon } from "@neondatabase/serverless";
import { AxiosError } from "axios";
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

        if (!name || !username || !password) {
            return Response.json(
                { status: "failed", message: "All fields are required" },
                { status: 400 }
            )
        }

        const [user] = await sql`SELECT * FROM users WHERE username = ${username}`
        if (user) {
            return Response.json(
                { status: "failed", message: "User already exists" },
                { status: 409 }
            )
        }

        const hashPass = await bcrypt.hash(password, 4)

        await sql`INSERT INTO users (name, username, password)
        VALUES (${name}, ${username}, ${hashPass})`


        return Response.json({ ok: "ok" })
    } catch (err: unknown) {
        const error = err as AxiosError
        console.log('error', error)
        return Response.json({ ok: "not ok", error: error.message }, { status: 500 })
    }
}