import AxiosIntance from "@/utils/AxiosIntance"
import axios from "axios"

  export const getPosts = async () => {
    try {
      const res = await AxiosIntance.get('/posts')      
      return res.data.posts
    } catch (error) {
      throw error
    }
  }


  export const getPost = async (id: string) => {
    try {
      const res = await AxiosIntance.get(`/posts/${id}`)      
      return res.data
    } catch (error) {
      throw error
    }
  }

  export const createPost = async (content: string) => {
    try {
      const res = await AxiosIntance.post(`/posts`,{
        content
      })
    } catch (error) {
      throw error
    }
  }

  export const likePost = async (id: number) => {
    try {
      await AxiosIntance.post(`/posts/${id}/like`)
    } catch (error) {
      throw error
    }
  }

  export const dislikePost = async (id: number) => {
    try {
      await AxiosIntance.delete(`/posts/${id}/like`)
    } catch (error) {
      throw error
    }
  }