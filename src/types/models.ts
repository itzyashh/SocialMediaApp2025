type User = {
    id: string;
    name: string
    username: string
    avatar: string
}

type Post = {
    id: number
    author: User
    content: string
    created_at: string
    likes_count: number
    retweets_count: number
    replies_count: number
    is_liked?: boolean
}