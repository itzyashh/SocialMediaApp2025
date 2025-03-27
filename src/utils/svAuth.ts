import jwt from 'jsonwebtoken'

export const decodeJWT = (req: Request) => {
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split(' ')[1]
    return jwt.verify(token!, process.env.JWT_TOKEN!) as { id: string }
} 