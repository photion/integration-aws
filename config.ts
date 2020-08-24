import * as pulumi from '@pulumi/pulumi';

export const config = {
  region: 'eu-west-1',
  stack: pulumi.getStack(),
  dynamodb: {
    tables: {
      projects: {
        name: 'photion--projects',
      },
      concepts: {
        name: 'photion--concepts',
      },
      fragments: {
        name: 'photion--fragments',
      },
    },
  },
  iam: {
    policies: {
      publisher: {
        name: 'photion--policy--publisher',
      },
    },
    policyAttachments: {
      publisher: {
        name: 'photion--policy-attachment--publisher',
      },
    },
    users: {
      publisher: {
        name: 'photion--user--publisher',
      },
    },
  },
  s3: {
    buckets: {
      concepts: {
        name: 'photion--concepts',
      },
    },
  },
};
