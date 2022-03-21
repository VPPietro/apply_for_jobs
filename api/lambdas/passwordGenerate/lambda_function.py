import uuid
import boto3
import string
import random
import datetime


def lambda_handler(event, context):
    # Seleciona tabela de usuários
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('passwordsDynamo')

    # Testa se a requisição possui o usuário no body
    try:
        viewTimes = str(event['viewTimes'])
        expirationTime = event['expirationTime']
    except:
        response = {
            'statusCode': 400,
            'body': {
                'invalid_request':
                    'Requisição inválida'
            }
        }
        return response

    # Cria um password randômico
    population = string.ascii_letters + string.digits + '@#$%&!'
    password = random.sample(population, 20)
    password = ''.join(password)

    # Coleta informações para dynamo
    id = str(uuid.uuid1())
    addedDate = datetime.datetime.now()
    expirationTime = datetime.timedelta(seconds=expirationTime)
    expirationTime = addedDate + expirationTime

    # Cria item
    item = {
        'id': id,
        'password': password,
        'addedDate': str(addedDate),
        'expirationTime': str(expirationTime),
        'viewTimes': viewTimes,
    }

    # Aplica o novo password para o usuário
    table.put_item(Item=item)

    # Retorna novos valores
    response = {
        "statusCode": 200,
        "body": {"id": id}
    }
    return response
