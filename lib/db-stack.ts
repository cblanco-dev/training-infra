import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class DynamoDbStack extends cdk.Stack {
  public readonly petsFoundationsTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.petsFoundationsTable = new dynamodb.Table(this, 'petsFoundationsTable', {
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.petsFoundationsTable.addGlobalSecondaryIndex({
      indexName: 'AnimalTypeIndex',
      partitionKey: { name: 'animalType', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'breed', type: dynamodb.AttributeType.STRING },
    });

    this.petsFoundationsTable.addGlobalSecondaryIndex({
      indexName: 'PetNameIndex',
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'name', type: dynamodb.AttributeType.STRING },
    });

    new cdk.CfnOutput(this, 'petsFoundationsTableName', {
      value: this.petsFoundationsTable.tableName,
      exportName: 'petsFoundationsTableName',
    });
  }
}

