""" An attempt at connecting frontend with backend """

from flask import Flask, jsonify, request
from flask_cors import CORS
import Database
from datetime import date, datetime as dt
from Inventory import Inventory
from Ingredient import Ingredient

USERID = 1
inventory = Inventory(USERID)

app = Flask(__name__)
CORS(app=app, resources={r"*": {"origins": "*"}})  # Handle CORS issues during development

@app.route('/pantry/', methods=['GET'])
def get_data():
    return jsonify({'payload': inventory.getIngredients()})

@app.route('/pantry/add/', methods=['POST'])
def add_ingredient():
    data = request.json  # Get the JSON data sent in the request body
    ing = Ingredient(name=data["name"],
                        owner_id=USERID,
                        quantity=int(data["amount"]),
                        unit="cups",
                        intakeTime=date.today(),
                        shelfLife=(dt.strptime(data["expiration"],'%Y-%m-%d').date() - date.today()).days
                    )
    response = inventory.addIngredient(ing)
    return jsonify({'status': 'success' if response else 'failure', 'received': data}), (200 if response else 500)

@app.route('/pantry/delete/', methods=['POST'])
def delete_ingredients():
    response = 0
    for data in request.json:  # Get the JSON data sent in the request body
        response += inventory.removeIngredient(ingredient_name=data["name"],
                                               quantity=int(data["amount"].split()[0])
                                            )
    return jsonify({'status': 'success' if response == len(request.json) else 'failure' if response == 0 else 'partial success',
                    'received': data}), (200 if response else 500)


if __name__ == '__main__':
    app.run(debug=True)