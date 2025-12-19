export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  data: {
    token: string;
    refreshToken?: string;
    link?: string;
    email?: string;
    accessToken?: string;
  };
}

export interface LoginRequest {
  email: string;
  password?: string; // Optional if using other methods, but usually required
}

export interface SignupRequest {
  email: string;
  password?: string;
  name?: string;
  country: string;
}
