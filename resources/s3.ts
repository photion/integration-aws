import * as aws from '@pulumi/aws';

import { config } from '../config';


export interface S3Resources {
  buckets: {
    concepts: aws.s3.Bucket;
  }
}

export const conceptsBucket = (): aws.s3.Bucket => {
  const bucket = new aws.s3.Bucket(config.s3.buckets.concepts.name, {
    bucket: config.s3.buckets.concepts.name,
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
    concepts: conceptsBucket(),
  };

  return { buckets };
};
