from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/reverse', methods=['POST'])
def reverse_string():
    data = request.get_json()
    text = data.get('text', '')
    # Split the string by spaces, reverse the list, and join it back
    reversed_text = ' '.join(text.split()[::-1])
    return jsonify({'result': reversed_text})

if __name__ == '__main__':
    app.run(debug=True)
