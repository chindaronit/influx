from ApiMethods import * 
from GateWayResponses import * 

def watchlist_api(client,apiId,rootResourceId,authorizationType,contentType,Model,url):

    # ***************************************************************
    #                     /watchlist/api GET
    # ***************************************************************

    resourceId=create_resource(client,apiId,rootResourceId,"watchlist")
    resourceId=create_resource(client,apiId,resourceId,"api")


    httpMethod='GET'
    integrationHttpMethod='GET'
    watchlist_url=url+'watchlist/api'
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

    putIntegration(client,apiId,httpMethod,resourceId,type,integrationHttpMethod,watchlist_url,passthroughBehavior,requestParameters)

    # ***************************************************************
    #                     StatusCode=200
    # ***************************************************************

    succ_response(client,apiId,resourceId,httpMethod,contentType,Model)

    # ***************************************************************
    #                     StatusCode=500
    # ***************************************************************

    statusCode='500'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)

    print("successfully created /watchlist/api GET method...")

    # ***************************************************************
    #                     /watchlist/api POST
    # ***************************************************************

    httpMethod='POST'
    integrationHttpMethod='POST'
    watchlist_url=url+'watchlist/api'
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

    putIntegration(client,apiId,httpMethod,resourceId,type,integrationHttpMethod,watchlist_url,passthroughBehavior,requestParameters)

    # ***************************************************************
    #                     StatusCode=200
    # ***************************************************************

    succ_response(client,apiId,resourceId,httpMethod,contentType,Model)


    # ***************************************************************
    #                     StatusCode=500
    # ***************************************************************

    statusCode='500'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)

    print("successfully created /watchlist/api POST method...")

    # ***************************************************************
    #                     /watchlist/api DELETE
    # ***************************************************************

    httpMethod='DELETE'
    integrationHttpMethod='DELETE'
    watchlist_url=url+'watchlist/api'
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
    putIntegration(client,apiId,httpMethod,resourceId,type,integrationHttpMethod,watchlist_url,passthroughBehavior,requestParameters)

    # ***************************************************************
    #                     StatusCode=200
    # ***************************************************************

    succ_response(client,apiId,resourceId,httpMethod,contentType,Model)

    # ***************************************************************
    #                     StatusCode=500
    # ***************************************************************

    statusCode='500'
    other_response(client,apiId,resourceId,httpMethod,statusCode,contentType,Model)

    print("successfully created /watchlist/api DELETE method...")
