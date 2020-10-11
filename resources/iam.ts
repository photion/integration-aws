import { Output } from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

import { config } from '../config';


export interface IamResources {
  accessKeys: aws.iam.AccessKey[],
  users: aws.iam.User[],
  policies: aws.iam.Policy[],
  policyAttachments: aws.iam.PolicyAttachment[],
}

export const createPolicy = (): aws.iam.Policy => {
  const policy = new aws.iam.Policy(config.iam.policies.publisher.name, {
    name: config.iam.policies.publisher.name,
    policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Action: [
            's3:*',
          ],
          Effect: 'Allow',
          Resource: [
            `arn:aws:s3:::${config.s3.buckets.concepts.name}*/*`,
          ],
        },
        {
          Action: [
            'dynamodb:*',
          ],
          Effect: 'Allow',
          Resource: [
            `arn:aws:dynamodb:${config.region}:*:table/${config.dynamodb.tables.projects.name}`,
            `arn:aws:dynamodb:${config.region}:*:table/${config.dynamodb.tables.concepts.name}`,
            `arn:aws:dynamodb:${config.region}:*:table/${config.dynamodb.tables.fragments.name}`,
          ],
        },
      ],
    }),
  });

  return policy;
};

export const createAccessKey = (username: Output<string>): aws.iam.AccessKey => {
  const accessKey = new aws.iam.AccessKey(config.iam.accessKeys.default.name, {
    user: username,
  });

  return accessKey;
};

export const handleIam = (): IamResources => {
  const user = new aws.iam.User(config.iam.users.publisher.name, {
    name: `${config.iam.users.publisher.name}--${config.stack}`,
  });
  const accessKey = createAccessKey(user.name);
  const policy = createPolicy();
  const policyAttachment = new aws.iam.PolicyAttachment(config.iam.policyAttachments.publisher.name, {
    name: config.iam.policyAttachments.publisher.name,
    users: [user],
    policyArn: policy.arn,
  });

  console.log({ accessKey });

  return {
    users: [user],
    accessKeys: [accessKey],
    policies: [policy],
    policyAttachments: [policyAttachment],
  };
};
