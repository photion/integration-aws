import * as aws from '@pulumi/aws';

import { config } from '../config';


export interface DynamoDBResources {
  tables: {
    projects: aws.dynamodb.Table;
    folders: aws.dynamodb.Table;
    media: aws.dynamodb.Table;
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

export const foldersTable = (): aws.dynamodb.Table => {
  const table = new aws.dynamodb.Table(config.dynamodb.tables.folders.name, {
    name: config.dynamodb.tables.folders.name,
    attributes: [
      { name: 'uuid', type: 'S' },
    ],
    hashKey: 'uuid',
    billingMode: 'PAY_PER_REQUEST',
  });

  return table;
};

export const mediaTable = (): aws.dynamodb.Table => {
  const table = new aws.dynamodb.Table(config.dynamodb.tables.media.name, {
    name: config.dynamodb.tables.media.name,
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
    folders: foldersTable(),
    media: mediaTable(),
  };

  return { tables };
};
