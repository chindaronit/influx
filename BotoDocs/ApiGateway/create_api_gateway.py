import boto3
from ApiMethods import *
from GateWayResponses import *
from Watchlist import watchlist_api
from User import user_api
from Subscription import subscription_api

client = boto3.client('apigateway')
client_v2=boto3.client('apigatewayv2')

name='_influx_api_'
description='API Gateway for microservies in influx'
version='v-1'
endpointConfigurationType='EDGE'
authorizationType='NONE'
contentType = 'application/json'
Model='Empty'
stageName='dev'

url='http://ec2-3-108-53-152.ap-south-1.compute.amazonaws.com/'
print("started creating Api Gateway...")

apiId=create_api(client,name,description,version,endpointConfigurationType)
resourceId=get_parent_id(client,apiId,'/')

# ***************************************************************
#                     /watchlist
# ***************************************************************
 
watchlist_api(client,apiId,resourceId,authorizationType,contentType,Model,url)

# ***************************************************************
#                     /user
# ***************************************************************

user_api(client,apiId,resourceId,authorizationType,contentType,Model,url)

# ***************************************************************
#                     /subscription
# ***************************************************************

subscription_api(client,apiId,resourceId,authorizationType,contentType,Model,url)

create_deployement(client,apiId,stageName)
print("successfully Deployed API...")
url="https://"+apiId+".execute-api.ap-south-1.amazonaws.com/"+stageName+'/'
print(f"Deployment endpoint for {stageName} : {url}")