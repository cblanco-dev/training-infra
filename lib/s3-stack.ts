import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class S3BucketStack extends cdk.Stack {
  public readonly bucket: s3.IBucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'PetJsonBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
    
    new cdk.CfnOutput(this, 'PetJsonBucketArn', {
      value: this.bucket.bucketArn,
      description: 'The ARN of the S3 bucket that stores pet JSON data',
      exportName: 'S3TrainingBucket'
    });
  }
}
