export interface User {
  id: number;
  email: string;
  image_resource: null | number;
  name: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignUpForm {
  email: string;
  password: string;
  name: string;
}

export interface ImageInfo {
  created_at: string;
  updated_at: string;
  user_id: number;
  id: number;
  firebase_public_url: string;
}
