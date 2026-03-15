
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
filename = 'diabetes-prediction-rfc-model.pkl'
classifier = pickle.load(open(filename, 'rb'))

app = Flask(__name__)
CORS(app)

@app.route('/api/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        data = request.json
        preg = int(data['pregnancies'])
        glucose = int(data['glucose'])
        bp = int(data['bloodpressure'])
        st = int(data['skinthickness'])
        insulin = int(data['insulin'])
        bmi = float(data['bmi'])
        dpf = float(data['dpf'])
        age = int(data['age'])
        
        features = np.array([[preg, glucose, bp, st, insulin, bmi, dpf, age]])
        my_prediction = classifier.predict(features)
        
        return jsonify({'prediction': int(my_prediction[0])})

if __name__ == '__main__':
	app.run(debug=True)