from ApiMethods import *
from GateWayResponses import *


def subscription_api(client,apiId,rootResourceId,authorizationType,contentType,Model,url):
    
    # ***************************************************************
    #                     /subscription/api GET
    # ***************************************************************

    resourceId=create_resource(client,apiId,rootResourceId,"subscription")
    resourceId=create_resource(client,apiId,resourceId,"api")

    httpMethod='GET'
    integrationHttpMethod='GET'
    subscription_url=url+'subscription/api'
    type='HTTP'

    requestParameters = {
        'method.request.header.authorization': True,
        'method.request.querystring.email': True
    }

    requestModels={}
    passthroughBehavior="WHEN_NO_MATCH"

    putMethod(client,apiId,authorizationType,resourceId,httpMethod,requestParameters,requestModels)

    requestParameters = {
        'integration.request.header.authorization': 'method.request.header.authorization',
        'integration.request.querystring.email':'method.request.querystring.email'
    }

    putIntegration(client,apiId,httpMethod,resourceId,type,integrationHttpMethod,subscription_url,passthroughBehavior,requestParameters)

    # ***************************************************************
    #                     StatusCode=200
    # ***************************************************************

    succ_response(client,apiId,resourceId,httpMethod,contentType,Model)

    # ***************************************************************
    #                     StatusCode=500
    # ***************************************************************

    statusCode='500'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)

    # ***************************************************************
    #                     StatusCode=400
    # ***************************************************************

    statusCode='400'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)


    # ***************************************************************
    #                     StatusCode=401
    # ***************************************************************

    statusCode='401'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)


    print("successfully created /subscription/api GET method...")

    # ***************************************************************
    #                     /subscription/api POST
    # ***************************************************************

    httpMethod='POST'
    integrationHttpMethod='POST'
    subscription_url=url+'subscription/api'
    type='HTTP'

    requestParameters = {
        'method.request.header.authorization': True,
        'method.request.querystring.email': True
    }

    requestModels={}

    passthroughBehavior="WHEN_NO_MATCH"

    putMethod(client,apiId,authorizationType,resourceId,httpMethod,requestParameters,requestModels)

    requestParameters = {
        'integration.request.header.authorization': 'method.request.header.authorization',
        'integration.request.querystring.email':'method.request.querystring.email'
    }
    putIntegration(client,apiId,httpMethod,resourceId,type,integrationHttpMethod,subscription_url,passthroughBehavior,requestParameters)

    # ***************************************************************
    #                     StatusCode=200
    # ***************************************************************

    succ_response(client,apiId,resourceId,httpMethod,contentType,Model)

    # ***************************************************************
    #                     StatusCode=500
    # ***************************************************************

    statusCode='500'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)


    # ***************************************************************
    #                     StatusCode=400
    # ***************************************************************

    statusCode='400'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)


    # ***************************************************************
    #                     StatusCode=401
    # ***************************************************************

    statusCode='401'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)

    print("successfully created /subscription/api POST method...")
