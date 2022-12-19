import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3({
  region: process.env.aws_region,
  // secretAccessKey

  secretAccessKey: process.env.aws_secret_access_key,
  accessKeyId: process.env.aws_access_key_id,
});

export default s3;
