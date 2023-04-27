import crypto from 'crypto';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import sharp = require('sharp');

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

export async function uploadImageOriginal(s3: S3Client, data: Buffer, userId: number) {
  const jpgBuffer = await sharp(data)
    .jpeg({
      quality: 80,
    })
    .toBuffer();

  const randomUuid = crypto.randomUUID();

  const response = await s3.send(
    new PutObjectCommand({
      Bucket: 'imgflow',
      Body: jpgBuffer,
      CacheControl: 'max-age=31536000',
      ContentType: 'image/jpeg',
      Key: `${userId}/uploads/${randomUuid}.jpg`,
    })
  );

  return {
    uuid: randomUuid,
    key: `${userId}/uploads/${randomUuid}.jpg`,
  };
}

export function uploadImage(s3: S3Client, data: Buffer, key: string, mime: string) {
  return s3.send(
    new PutObjectCommand({
      Bucket: 'imgflow',
      Body: data,
      CacheControl: 'max-age=31536000',
      ContentType: mime,
      Key: key,
    })
  );
}

/* 
PipelineID: 24124-fras3-1241s
Runner will save outputs to:
imgflow/:userId/pipelines/24124-fras3-1241s/:uuid.jpg

We can only store jpg version and convert them on the fly to requested format.

Storage structure for user 1234 is:
imgflow
|- 1234
  |-uploads
    |- :uuid-1.jpg
    |- :uuid-2.jpg
    |- :uuid-3.jpg
    |- :uuid-4.jpg
  |-pipelines
    |- :pipelineUuid-1
      |- :uuid-1.jpg
      |- :uuid-2.jpg
      |- :uuid-3.jpg
      |- :uuid-4.jpg
    |- :pipelineUuid-2 - User only wanted:uuid-3 and :uuid-4 images in :pipelineUuid-2
      |- :uuid-3.jpg
      |- :uuid-4.jpg
    .
    .
    .

User's view of all the process:
1. User logins
2. Creates a pipeline
3. Goes to pipeline page (there will be a upload box that you can D&D images)
  3.1. User is requested to upload images
  3.2. User uploads images
  3.3. User clicks "Run"
4. User is redirected to pipeline page
5. Once the pipeline finished, user can:
  5.1. download the results in a zip file
  5.2. requests images with our CDN to use them in their website

Our view of all the process:
1. User logins
2. Creates a pipeline (POST /api/v1/pipeline with dataJson)
3. Goes to pipeline page and clicks "Run"
  3.1. User uploads images
  3.2. User clicks "Run" (POST /api/v1/pipeline/:pipelineUuid/run with images as body)
    3.2.1. We upload original images to S3 (converted to JPG)
    3.2.2. FUTURE: We create a job in the queue
    3.2.2. We run `src/lib/runner.ts:runPipeline` function for each image (these all will be run in /api/v1/pipeline/:pipelineUuid/run route)
    3.2.3. For each image that finished processing, we upload the result to S3 (key is in the above)
    3.2.4. Once every image is processed, we return the response to the user (just a completed JSON with keys in s3).
           (For example if user uploaded 4 images, we will return 4 keys in the response)
           (
            We can also stream the finished images (only the keys) to user (this could be a better option)
            in order to show progress to the user.
           )


*/
