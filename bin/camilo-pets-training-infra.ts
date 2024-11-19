#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DynamoDbStack } from '../lib/db-stack';
import { S3BucketStack } from '../lib/s3-stack';

const app = new cdk.App();
const appName = 'Camilo-training';

new DynamoDbStack(app, 'DynamoDbStack', {
  env: {
    account: "687780365190",
    region: "us-east-1"
  },
  stackName: `${appName}-dynamo`,
});

new S3BucketStack(app, 'S3Stack', {
  env: {
    account: "687780365190",
    region: "us-east-1"
  },
  stackName: `${appName}-s3`,
})


