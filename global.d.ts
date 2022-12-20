namespace NodeJS {
  interface ProcessEnv {
    host: string;
    user: string;
    database: string;
    port: number;
    password: string;
    jwtSecret: string;

    aws_access_key_id: string;
    aws_secret_access_key: string;
    aws_region: string;
    aws_bucket_name: string;

    jwtSecret: any;
  }
}
declare namespace Express {
  export interface Request {
    userId?: number;
    userEmail?: string;
  }
}
