import * as pulumi from '@pulumi/pulumi';

const prefix = 'photion';

export const config = {
  region: 'eu-west-1',
  stack: pulumi.getStack(),
  dynamodb: {
    tables: {
      projects: {
        name: `${prefix}--projects`,
      },
      concepts: {
        name: `${prefix}--concepts`,
      },
      fragments: {
        name: `${prefix}--fragments`,
      },
    },
  },
  iam: {
    policies: {
      publisher: {
        name: `${prefix}--policy--publisher`,
      },
    },
    policyAttachments: {
      publisher: {
        name: `${prefix}--policy-attachment--publisher`,
      },
    },
    users: {
      publisher: {
        name: `${prefix}--user--publisher`,
      },
    },
  },
  s3: {
    buckets: {
      concepts: {
        name: `${prefix}--concepts`,
      },
    },
  },
};
