import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class DynamoDbStack extends cdk.Stack {
  public readonly petsTable: dynamodb.Table;
  public readonly foundationsTable: dynamodb.Table;


  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.foundationsTable = new dynamodb.Table(this, 'FoundationsTable', {
      partitionKey: { name: 'foundationId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.petsTable = new dynamodb.Table(this, 'PetsTable', {
      partitionKey: { name: 'foundationId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'petId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.petsTable.addGlobalSecondaryIndex({
      indexName: 'AnimalTypeIndex',
      partitionKey: { name: 'animalType', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'breed', type: dynamodb.AttributeType.STRING },
    });

    this.petsTable.addGlobalSecondaryIndex({
      indexName: 'PetNameIndex',
      partitionKey: { name: 'foundationId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'name', type: dynamodb.AttributeType.STRING },
    });

    new cdk.CfnOutput(this, 'PetsTableName', {
      value: this.petsTable.tableName,
      exportName: 'PetsTableName',
    });

    new cdk.CfnOutput(this, 'FoundationsTableName', {
      value: this.foundationsTable.tableName,
      exportName: 'FoundationsTableName',
    });
  }
}

