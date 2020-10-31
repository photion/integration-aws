import * as aws from '@pulumi/aws';

import { config } from '../config';


export interface S3Resources {
  buckets: {
    folders: aws.s3.Bucket;
  }
}

export const foldersBucket = (): aws.s3.Bucket => {
  const bucket = new aws.s3.Bucket(config.s3.buckets.folders.name, {
    bucket: config.s3.buckets.folders.name,
    corsRules: [
      {
        allowedHeaders: ['*'],
        allowedMethods: [
          'PUT',
          'POST',
          'DELETE',
        ],
        allowedOrigins: ['*'],
      },
    ],
  });

  return bucket;
};


export const handleS3 = (): S3Resources => {
  const buckets = {
    folders: foldersBucket(),
  };

  return { buckets };
};
