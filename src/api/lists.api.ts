import { AxiosInstance } from "axios";

export interface Post {
  id: string;
  userId: string;
  date: string;
  category: string;
  description: string;
  nickname: string;
  amount: number;
}

class ListsAPI {
  #client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.#client = client;
  }

  async addList(post: Post) {
    try {
      const response = await this.#client.post("/", post);
      return response.data;
    } catch (error) {
      console.error("Failed to add list:", error);
      throw error;
    }
  }

  async getList() {
    const response = await this.#client.get("/");
    return response.data;
  }

  async updateList(postsId: string, post: Post) {
    const response = await this.#client.put(`/${postsId}`, post);
    return response.data;
  }

  async deleteList(postsId: string) {
    const response = await this.#client.delete(`/${postsId}`);
    return response.data;
  }
}

export default ListsAPI;
