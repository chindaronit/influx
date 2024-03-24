from ApiMethods import * 
from GateWayResponses import * 

def history_api(client,apiId,rootResourceId,authorizationType,contentType,Model,url):

    # ***************************************************************
    #                     /history/api GET
    # ***************************************************************

    resourceId=create_resource(client,apiId,rootResourceId,"history")
    resourceId=create_resource(client,apiId,resourceId,"api")


    httpMethod='GET'
    integrationHttpMethod='GET'
    history_url=url+'history/api'
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

    putIntegration(client,apiId,httpMethod,resourceId,type,integrationHttpMethod,history_url,passthroughBehavior,requestParameters)

    # ***************************************************************
    #                     StatusCode=200
    # ***************************************************************

    succ_response(client,apiId,resourceId,httpMethod,contentType,Model)

    # ***************************************************************
    #                     StatusCode=500
    # ***************************************************************

    statusCode='500'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)

    print("successfully created /history/api GET method...")

    # ***************************************************************
    #                     /history/api POST
    # ***************************************************************

    httpMethod='POST'
    integrationHttpMethod='POST'
    history_url=url+'history/api'
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

    putIntegration(client,apiId,httpMethod,resourceId,type,integrationHttpMethod,history_url,passthroughBehavior,requestParameters)

    # ***************************************************************
    #                     StatusCode=200
    # ***************************************************************

    succ_response(client,apiId,resourceId,httpMethod,contentType,Model)


    # ***************************************************************
    #                     StatusCode=500
    # ***************************************************************

    statusCode='500'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)

    print("successfully created /history/api POST method...")