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
CORS(app=app, resources={r"/*": {"origins": "/*"}})  # Handle CORS issues during development

@app.route('/pantry/get/', methods=['GET'])
def get_ingredient():
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

@app.route('/recipes/get/', methods=['GET'])
def get_recipe():
    cookable, uncookable = inventory.searchRecipes()
    payload = []
    for recipe in cookable.getRecipes():
        d = recipe.toDict()
        d["type"] = d["dish type"]
        d["preparable"] = "Y"
        d["ingredients"] = ", ".join(list(d["ingredients"]))
        payload.append(d)
    for recipe in uncookable.getRecipes():
        d = recipe.toDict()
        d["type"] = d["dish type"]
        d["preparable"] = "N"
        d["ingredients"] = ", ".join(list(d["ingredients"]))
        payload.append(d)
    return jsonify({'payload': payload})

@app.route('/recipes/add/', methods=['POST'])
def add_recipe():
    data = request.json  # Get the JSON data sent in the request body
    response, new_id = Database.addRecipe(name=data["name"],
                                  dishType=data["type"],
                                  creatorID=USERID,
                                  ingredients={x.strip() : 1 for x in data["ingredients"].split(",")},
                                  instructions=data["instructions"],
                                  cuisine=data["cuisine"],
                                )
    return jsonify({'status': 'success' if response else 'failure', 'received': data, "id":new_id}), (200 if response else 500)

@app.route('/recipes/delete/', methods=['POST'])
def remove_recipe():
    response = 0
    for data in request.json:  # Get the JSON data sent in the request body
        response += Database.updateRecipe(data["id"], -1)
    return jsonify({'status': 'success' if response == len(request.json) else 'failure' if response == 0 else 'partial success',
                    'received': data}), (200 if response else 500)

@app.route('/explore/get/', methods=['GET'])
def explore():
    cookable, uncookable = inventory.searchRecipes(inverse=True)
    payload = []
    for recipe in cookable.getRecipes():
        d = recipe.toDict()
        d["type"] = d["dish type"]
        d["preparable"] = "Y"
        d["ingredients"] = ", ".join(list(d["ingredients"]))
        payload.append(d)
    for recipe in uncookable.getRecipes():
        d = recipe.toDict()
        d["type"] = d["dish type"]
        d["preparable"] = "N"
        d["ingredients"] = ", ".join(list(d["ingredients"]))
        payload.append(d)
    return jsonify({'payload': payload})

@app.route('/explore/save/', methods=['POST'])
def save_recipe():
    response = 0
    for data in request.json:  # Get the JSON data sent in the request body
        response += Database.updateRecipe(data["id"], USERID)
    return jsonify({'status': 'success' if response == len(request.json) else 'failure' if response == 0 else 'partial success',
                    'received': data}), (200 if response else 500)


if __name__ == '__main__':
    app.run(debug=True)