import * as aws from '@pulumi/aws';

import { config } from '../config';


export interface DynamoDBResources {
  tables: {
    projects: aws.dynamodb.Table;
    concepts: aws.dynamodb.Table;
    fragments: aws.dynamodb.Table;
  };
}

export const projectsTable = (): aws.dynamodb.Table => {
  const table = new aws.dynamodb.Table(config.dynamodb.tables.projects.name, {
    name: config.dynamodb.tables.projects.name,
    attributes: [
      { name: 'uuid', type: 'S' },
    ],
    hashKey: 'uuid',
    billingMode: 'PAY_PER_REQUEST',
  });

  return table;
};

export const conceptsTable = (): aws.dynamodb.Table => {
  const table = new aws.dynamodb.Table(config.dynamodb.tables.concepts.name, {
    name: config.dynamodb.tables.concepts.name,
    attributes: [
      { name: 'uuid', type: 'S' },
    ],
    hashKey: 'uuid',
    billingMode: 'PAY_PER_REQUEST',
  });

  return table;
};

export const fragmentsTable = (): aws.dynamodb.Table => {
  const table = new aws.dynamodb.Table(config.dynamodb.tables.fragments.name, {
    name: config.dynamodb.tables.fragments.name,
    attributes: [
      { name: 'uuid', type: 'S' },
    ],
    hashKey: 'uuid',
    billingMode: 'PAY_PER_REQUEST',
  });

  return table;
};

export const handleDynamoDB = (): DynamoDBResources => {
  const tables = {
    projects: projectsTable(),
    concepts: conceptsTable(),
    fragments: fragmentsTable(),
  };

  return { tables };
};
