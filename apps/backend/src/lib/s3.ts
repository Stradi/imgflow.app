import { S3Client } from '@aws-sdk/client-s3';

let _s3: S3Client;

export function s3(): S3Client {
  if (!_s3) {
    if (!process.env.CF_R2_ENDPOINT || !process.env.CF_R2_ACCESS_KEY_ID || !process.env.CF_R2_SECRET_ACCESS_KEY) {
      throw new Error('Missing environment variables for S3 client.');
    }

    console.log('Initializing S3 client...');
    _s3 = new S3Client({
      region: 'auto',
      endpoint: process.env.CF_R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.CF_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.CF_R2_SECRET_ACCESS_KEY,
      },
    });
  }

  return _s3;
}
