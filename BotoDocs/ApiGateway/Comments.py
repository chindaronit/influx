from ApiMethods import * 
from GateWayResponses import * 

def comment_api(client,apiId,rootResourceId,authorizationType,contentType,Model,url):

    # ***************************************************************
    #                     /comment/api GET
    # ***************************************************************

    resourceId=create_resource(client,apiId,rootResourceId,"comment")
    resourceId=create_resource(client,apiId,resourceId,"api")


    httpMethod='GET'
    integrationHttpMethod='GET'
    comment_url=url+'comment/api'
    type='HTTP'

    requestParameters = {
        'method.request.header.authorization': True,
        'method.request.querystring.media_type': True,
        'method.request.querystring.id': True,
        'method.request.querystring.episode': True,
        'method.request.querystring.season': True,
    }

    requestModels={}

    passthroughBehavior="WHEN_NO_MATCH"

    putMethod(client,apiId,authorizationType,resourceId,httpMethod,requestParameters,requestModels)

    requestParameters = {
        'integration.request.header.authorization': 'method.request.header.authorization',
        'integration.request.querystring.media_type':'method.request.querystring.media_type',
        'integration.request.querystring.id':'method.request.querystring.id',
        'integration.request.querystring.episode':'method.request.querystring.episode',
        'integration.request.querystring.season':'method.request.querystring.season'
    }

    putIntegration(client,apiId,httpMethod,resourceId,type,integrationHttpMethod,comment_url,passthroughBehavior,requestParameters)

    # ***************************************************************
    #                     StatusCode=200
    # ***************************************************************

    succ_response(client,apiId,resourceId,httpMethod,contentType,Model)

    # ***************************************************************
    #                     StatusCode=500
    # ***************************************************************

    statusCode='500'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)

    print("successfully created /comment/api GET method...")

    # ***************************************************************
    #                     /comment/api POST
    # ***************************************************************

    httpMethod='POST'
    integrationHttpMethod='POST'
    comment_url=url+'comment/api'
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

    putIntegration(client,apiId,httpMethod,resourceId,type,integrationHttpMethod,comment_url,passthroughBehavior,requestParameters)

    # ***************************************************************
    #                     StatusCode=200
    # ***************************************************************

    succ_response(client,apiId,resourceId,httpMethod,contentType,Model)


    # ***************************************************************
    #                     StatusCode=500
    # ***************************************************************

    statusCode='500'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)

    print("successfully created /comment/api POST method...")

 