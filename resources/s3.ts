import * as aws from '@pulumi/aws';

import { config } from '../config';


export interface S3Resources {
  buckets: {
    media: aws.s3.Bucket;
  }
}

export const mediaBucket = (): aws.s3.Bucket => {
  const bucket = new aws.s3.Bucket(config.s3.buckets.media.name, {
    bucket: `${config.s3.buckets.media.name}--${config.stack}`,
  });

  return bucket;
};


export const handleS3 = (): S3Resources => {
  const buckets = {
    media: mediaBucket(),
  };

  return { buckets };
};
