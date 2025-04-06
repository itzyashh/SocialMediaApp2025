import AxiosIntance from "@/utils/AxiosIntance";

type GetPageParam = {
  limit: number;  cursor: undefined;
}

export const getPosts = async (pageParam:  GetPageParam) => {
  try {
    const res = await AxiosIntance.get('/posts', {
      params: {
        limit: pageParam.limit,
        cursor: pageParam.cursor
      }
    })
    return res.data.posts
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}


export const getPost = async (id: string) => {
  try {
    const res = await AxiosIntance.get(`/posts/${id}`)
    return res.data
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export const createPost = async (content: string) => {
  try {
    await AxiosIntance.post(`/posts`, {
      content
    })
  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
}

export const likePost = async (id: number) => {
  try {
    await AxiosIntance.post(`/posts/${id}/like`)
  } catch (error) {
    console.error("Error liking post:", error);
    throw error
  }
}

export const dislikePost = async (id: number) => {
  try {
    await AxiosIntance.delete(`/posts/${id}/like`)
  } catch (error) {
    console.error("Error disliking post:", error);
    throw error
  }
}