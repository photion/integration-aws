import * as pulumi from '@pulumi/pulumi';

const prefix = 'photion';

export const getResourceName = (resource: string): string => {
  return `${prefix}--${pulumi.getStack()}--${resource}`;
};

export const config = {
  region: 'eu-west-1',
  stack: pulumi.getStack(),
  dynamodb: {
    tables: {
      projects: {
        name: getResourceName('projects'),
      },
      folders: {
        name: getResourceName('folders'),
      },
      media: {
        name: getResourceName('media'),
      },
    },
  },
  iam: {
    accessKeys: {
      default: {
        name: getResourceName('access-key--default'),
      },
    },
    policies: {
      publisher: {
        name: getResourceName('policy--publisher'),
      },
    },
    policyAttachments: {
      publisher: {
        name: getResourceName('policy-attachment--publisher'),
      },
    },
    users: {
      publisher: {
        name: getResourceName('user--publisher'),
      },
    },
  },
  s3: {
    buckets: {
      folders: {
        name: getResourceName('folders'),
      },
    },
  },
};
