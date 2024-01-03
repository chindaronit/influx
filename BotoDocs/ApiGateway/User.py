from ApiMethods import *
from GateWayResponses import *

def user_api(client,apiId,rootResourceId,authorizationType,contentType,Model,url):
        
    # ***************************************************************
    #                     /user/signin POST
    # ***************************************************************

    userResourceId=create_resource(client,apiId,rootResourceId,"user")
    resourceId=create_resource(client,apiId,userResourceId,"signin")

    httpMethod='POST'
    integrationHttpMethod='POST'
    watchlist_url=url+'user/signin'
    type='HTTP'
    passthroughBehavior="WHEN_NO_MATCH"

    requestModels = {
        "application/json": Model,
    }

    requestParameters={}

    putMethod(client,apiId,authorizationType,resourceId,httpMethod,requestParameters,requestModels)
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

    print("successfully created /user/signin post method...")

    # ***************************************************************
    #                     /user/signup POST
    # ***************************************************************

    resourceId=create_resource(client,apiId,userResourceId,"signup")

    httpMethod='POST'
    integrationHttpMethod='POST'
    watchlist_url=url+'user/signup'
    type='HTTP'
    passthroughBehavior="WHEN_NO_MATCH"

    requestModels = {
        "application/json": Model,
    }

    requestParameters={}

    putMethod(client,apiId,authorizationType,resourceId,httpMethod,requestParameters,requestModels)
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

    print("successfully created /user/signup post method...")
