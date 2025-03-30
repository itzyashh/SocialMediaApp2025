import AxiosIntance from "@/utils/AxiosIntance"

export const signInRequest = async (username: string, password: string) => {
    if (!username || !password) return
    const res = await AxiosIntance.post('/auth/signin',{
              username,
              password
            }).catch(err=>console.log(err))
            if (!res || !res.data) return
            const user = res.data.user
            return res.data.user
}