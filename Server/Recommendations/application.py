import pickle
import flask
from flask_cors import CORS

application = flask.Flask(__name__)
CORS(application)

def recommend(movie):
    index = movies[movies['title'] == movie].index
    if len(index) == 0:
        return []  # Return empty list if movie title not found
    index = index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    movie_id_list = []
    for i in distances[1:6]:
        movie_id_list.append(int(movies.iloc[i[0]].movie_id))  # Convert to int
    return movie_id_list

movies = pickle.load(open('artifacts/movie_list.pkl','rb'))
similarity = pickle.load(open('artifacts/similarity.pkl','rb'))

@application.route('/', methods=['GET'])
def get_movie():
    movieId = flask.request.args.get('movieId')
    if movieId is None:
        return flask.jsonify({'error': 'Missing movieId parameter'}), 400
    try:
        movie_title = movies[movies['movie_id'] == int(movieId)]['title'].values
        if len(movie_title) == 0:
            return flask.jsonify({'success':False,'movies':[]}), 200
        movie_title = movie_title[0]
        movieIdList = recommend(movie_title)
        
        movie_data = {
            'success': True,
            'movies': movieIdList
        }
        return flask.jsonify(movie_data), 200
    
    except Exception as e:
        return flask.jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    application.run(port=3000)
