import numpy as np
import pandas as pd
import os
import matplotlib.pyplot as plt

movies=pd.read_csv("./archive/tmdb_5000_movies.csv")
credits=pd.read_csv("./archive/tmdb_5000_credits.csv")

print(movies.shape)

print(credits.shape)

movies=movies.merge(credits,on='title')

movies.shape

movies=movies[['movie_id','title','genres','keywords','vote_count','cast','crew']]
movies.shape

movies.dropna(inplace=True)

import ast ## converts the string to list 


def extract(text):
    l=[]
    for i in ast.literal_eval(text):
        l.append(i['name'])
    return l


movies['genres']=movies['genres'].apply(extract)
movies['keywords']=movies['keywords'].apply(extract)


def extract_cast(text):
    l=[]
    counter=0
    for i in ast.literal_eval(text):
        if counter<3:
            l.append(i['name'])
        else: break
        counter +=1
    return l

movies['cast']=movies['cast'].apply(extract_cast)

def extract_director(text):
    l=[]
    for i in ast.literal_eval(text):
        if i['job']=='Director':
            l.append(i['name'])
            break
    return l

movies['crew']=movies['crew'].apply(extract_director)

movies.head(2)

def remove_spaces(word):
    l=[]
    for i in word: 
        l.append(i.replace(" ",""))
    return l

movies['genres']=movies['genres'].apply(remove_spaces)
movies['keywords']=movies['keywords'].apply(remove_spaces)
movies['cast']=movies['cast'].apply(remove_spaces)
movies['crew']=movies['crew'].apply(remove_spaces)

movies.head(2)

movies['tags']=movies['genres']+movies['keywords']+movies['cast']+movies['crew']

movies['tags'][0]

filtered_movies_data=movies[['movie_id','title','vote_count','tags']]

filtered_movies_data['tags']=filtered_movies_data['tags'].apply(lambda x: " ".join(x)).apply(lambda x: x.lower())
filtered_movies_data.head(2)

from sklearn.feature_extraction.text import CountVectorizer
cv=CountVectorizer(max_features=5000, stop_words='english')


vector=cv.fit_transform(filtered_movies_data['tags']).toarray()
print(vector.shape)


