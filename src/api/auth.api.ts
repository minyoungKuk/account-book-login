import { AxiosInstance } from "axios";

interface RegistrationUser {
  id: string;
  password: string;
  nickname: string;
}

interface LoginUser {
  id: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  userId: string;
  nickname: string;
  success: boolean;
  avatar: string | null;
  // user: {
  //   id: string;
  //   nickname: string;
  // };
}

interface User {
  id: string;
  nickname: string;
  avatar: string | null;
}

class AuthAPI {
  #client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.#client = client;
  }

  // 회원가입
  async register(data: RegistrationUser): Promise<User> {
    const response = await this.#client.post("/register", data);
    return response.data;
  }

  // 로그인
  async login(data: LoginUser): Promise<LoginResponse> {
    const response = await this.#client.post("/login", data);
    return response.data;
  }

  // 회원정보
  async getUser(token: string): Promise<User> {
    const response = await this.#client.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  // 프로필 변경
  async updateProfile(token: string, nickname: string, avatar: File | null) {
    const formData = new FormData();

    if (nickname) {
      formData.append("nickname", nickname);
    }
    if (avatar) {
      formData.append("avatar", avatar);
    }
    const response = await this.#client.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}

export default AuthAPI;
