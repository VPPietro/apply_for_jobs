import boto3
from boto3.dynamodb.conditions import Key
from datetime import datetime


def lambda_handler(event, context):
    # Seleciona a table de passwords do Dynamo
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('passwordsDynamo')

    # Certifica que foi passado um id na requisição
    try:
        id = event['id']
    except:
        return {"invalid_request": "Nenhum id foi informado"}

    # Filtra o banco com o id passado
    item = table.query(KeyConditionExpression=Key('id').eq(id))['Items']

    # Verifica se o item existe
    if item:
        item = item[0]
        view_times = int(item['viewTimes'])
        expiration_time = item['expirationTime']
        expiration_time = datetime.strptime(expiration_time, '%Y-%m-%d %H:%M:%S.%f')
        current_date = datetime.now()

        # Verifica se o item pode ser visualizado
        if view_times > 1 and expiration_time > current_date:
            # Atualiza a quantidade de visualização do item
            newItem = table.update_item(
                Key={
                    'id': id
                },
                UpdateExpression='set viewTimes=:viewTimes',
                ExpressionAttributeValues={
                    ':viewTimes': str(view_times - 1)
                },
                ReturnValues="ALL_NEW"
            )
            return newItem["Attributes"]

        # Verifica se é a última visualização
        elif view_times == 1 and expiration_time > current_date:
            table.delete_item(
                Key={
                    'id': id
                }
            )
            item['viewTimes'] = '0'
            return item

        # Caso não possa ser visualizado (expirado) deleta o item e retorna aviso
        else:
            table.delete_item(
                Key={
                    'id': id
                }
            )
            return {"invalid_password": "A senha esta expirada"}

    # Caso não tenha encontrado o item retorna aviso
    else:
        return {"invalid_password": "A senha não foi encontrada"}
