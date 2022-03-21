import boto3


def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('passwordsDynamo')

    items = table.scan()

    return {
        'statusCode': 200,
        'body': items,
    }
