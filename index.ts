import { handleDynamoDB } from './resources/dynamodb';
import { handleIam } from './resources/iam';
import { handleS3 } from './resources/s3';


export const dynamodb = handleDynamoDB();
export const s3 = handleS3();
export const iam = handleIam();
