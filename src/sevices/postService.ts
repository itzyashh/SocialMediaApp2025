import AxiosIntance from "@/utils/AxiosIntance"
import axios from "axios"

  export const getPosts = async () => {
    try {
      const res = await AxiosIntance.get('http://localhost:8081/api/posts')      
      return res.data.posts
    } catch (error) {
      throw error
    }
  }


  export const getPost = async (id: string) => {
    try {
      const res = await AxiosIntance.get(`http://localhost:8081/api/posts/${id}`)      
      return res.data
    } catch (error) {
      throw error
    }
  }