interface User {
  id: number;
  name: string;
  image_resource: number;
  email: string;
  password: string;
  created_at?: string;
  updated_at?: string;
}

interface ImageResources {
  id: number;
  user_id: number;
  pg_image: number | null;
  s3_image: number | null;
  google_cloud_image: number | null;
  created_at?: string;
  updated_at?: string;
}

interface PgImage {
  id: number;
  file: string;
  image_resource_id: number;
  created_at?: string;
  updated_at?: string;
}

export { User, ImageResources, PgImage };
