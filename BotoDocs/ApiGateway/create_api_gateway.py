import boto3
from ApiMethods import *
from GateWayResponses import *
from Watchlist import watchlist_api
from User import user_api
from Subscription import subscription_api
from History import history_api
from Liked import liked_api
from Favourite import favourite_api
from Comments import  comment_api

client = boto3.client('apigateway')

name='_influx_api_'
description='API Gateway for microservies in influx'
version='v-1'
endpointConfigurationType='EDGE'
authorizationType='NONE'
contentType = 'application/json'
Model='Empty'
stageName='dev'

url='http://ec2-13-201-76-76.ap-south-1.compute.amazonaws.com/'
print("started creating Api Gateway...")

apiId=create_api(client,name,description,version,endpointConfigurationType)
resourceId=get_parent_id(client,apiId,'/')

# ***************************************************************
#                     /watchlist
# ***************************************************************
 
watchlist_api(client,apiId,resourceId,authorizationType,contentType,Model,url)


# ***************************************************************
#                     /history
# ***************************************************************
 
history_api(client,apiId,resourceId,authorizationType,contentType,Model,url)

# ***************************************************************
#                     /liked
# ***************************************************************
 
liked_api(client,apiId,resourceId,authorizationType,contentType,Model,url)

# ***************************************************************
#                     /favourite
# ***************************************************************
 
favourite_api(client,apiId,resourceId,authorizationType,contentType,Model,url)

# ***************************************************************
#                     /user
# ***************************************************************

user_api(client,apiId,resourceId,authorizationType,contentType,Model,url)

# ***************************************************************
#                     /subscription
# ***************************************************************

subscription_api(client,apiId,resourceId,authorizationType,contentType,Model,url)

# ***************************************************************
#                     /comments
# ***************************************************************

comment_api(client,apiId,resourceId,authorizationType,contentType,Model,url)

create_deployement(client,apiId,stageName)
print("successfully Deployed API...")
url="https://"+apiId+".execute-api.ap-south-1.amazonaws.com/"+stageName+'/'
print(f"Deployment endpoint for {stageName} : {url}")