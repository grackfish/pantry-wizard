""" An attempt at connecting frontend with backend """

from flask import Flask, jsonify, request
from flask_cors import CORS
import Database
from Inventory import Inventory

USERID = 1
inventory = Inventory(USERID)

app = Flask(__name__)
CORS(app)  # Handle CORS issues during development

@app.route('/ingredients/', methods=['GET'])
def get_data():
    return jsonify({'payload': inventory.getIngredients()})

# @app.route('/api/data', methods=['POST'])
# def set_data():
#     return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)