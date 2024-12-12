"""Database API"""
import os
import mysql.connector
from dotenv import load_dotenv
from Ingredient import Ingredient
from Recipe import Recipe
import json

# Connects to the database
def connectDatabase():
    load_dotenv()

    username = os.environ.get("USERNAME")
    password = os.environ.get("PASSWORD")

    sql_connector = mysql.connector.connect(user=username, password=password,
                                host='127.0.0.1', database="pantry")
    if sql_connector.is_connected():
        return sql_connector
    else:
        raise Exception("Error connecting to database")
    
# Returns the row with the user if the user exists else None
def getUser(username:str, password:str):
    db = connectDatabase()
    with db.cursor() as cursor:
        query = ("SELECT * FROM users WHERE username=%s AND password=%s LIMIT 1")
        payload = (username, password)
        cursor.execute(query, payload)
        rows = cursor.fetchall()
    db.close()
    return None if not rows else rows[0]
    
# Returns True if the user is successfully registered else False
def addUser(username:str, password:str):
    db = connectDatabase()
    success = True
    with db.cursor() as cursor:
        add_user = (
            "INSERT INTO users"
            "(username, password)"
            "VALUES (%s, %s)"
        )
        data = (username, password)
        try:
            cursor.execute(add_user, data)
            db.commit()
        except:
            success = False
    db.close()
    return success


def updateUser(username:str, new_password:str):
    db = connectDatabase()
    success = True
    with db.cursor() as cursor:
        update_user = (
            "UPDATE users "
            "SET PASSWORD=%s "
            "WHERE USERNAME=%s;"
        )
        data = (new_password, username)
        try:
            cursor.execute(update_user, data)
            db.commit()
        except:
            success = False
    db.close()
    return success

def getRecipes() ->list[Recipe]:
    db = connectDatabase()
    with db.cursor() as cursor:
        query = (
            "SELECT * FROM RECIPES"
        )
        cursor.execute(query)
        rows = cursor.fetchall()
    db.close()
    return [Recipe(id=id,
                   name=name,
                   ingredients=json.loads(ingredients),
                   instructions=instructions,
                   creatorID=creator_id,
                   cuisine=cuisine,
                   dishType=dishType
                ) 
            for id, name, ingredients, instructions, creator_id, cuisine, dishType in rows]

def addRecipe(name:str, creatorID:int, ingredients:dict[str, int], cuisine:str, dishType:str, instructions:str):
    db = connectDatabase()
    success = True
    with db.cursor() as cursor:
        add_ingredient = (
            "INSERT INTO RECIPES "
            "(name, ingredients, instructions, creator, cuisine, type) "
            "VALUES (%s, %s, %s, %s, %s, %s)"
        )
        ingredients_json = json.dumps(ingredients)
        data = (name, ingredients_json, instructions, creatorID, cuisine, dishType)
        try:
            cursor.execute(add_ingredient, data)
            db.commit()
        except:
            success = False
    db.close()
    return success

def getIngredients(user_id):
    db = connectDatabase()
    with db.cursor() as cursor:
        query = (
            "SELECT * FROM Inventory WHERE owner=%s"
        )
        data = [user_id]
        cursor.execute(query, data)
        rows = cursor.fetchall()
    db.close()
    return None if not rows else rows

def addIngredient(ingredient:Ingredient):
    db = connectDatabase()
    success = True
    with db.cursor() as cursor:
        add_ingredient = (
            "INSERT INTO Inventory"
            "(name,owner,quantity,unit,shelf_life,intake)"
            "VALUES (%s, %s, %s, %s, %s, %s)"
        )
        data = ingredient.toTuple()
        try:
            cursor.execute(add_ingredient, data)
            db.commit()
        except:
            success = False
    db.close()
    return success

def updateIngredient(ingredient:Ingredient):
    db = connectDatabase()
    success = True
    with db.cursor() as cursor:
        update_ingredient = (
            "UPDATE Inventory "
            "SET quantity=%s,unit=%s,shelf_life=%s,intake=%s"
            "WHERE name=%s AND owner=%s;"
        )
        data = ingredient.toTuple()[2:] + ingredient.toTuple()[:2]
        try:
            cursor.execute(update_ingredient, data)
            db.commit()
        except:
            success = False
    db.close()
    return success

def removeIngredient(ingredient:Ingredient):
    db = connectDatabase()
    success = True
    with db.cursor() as cursor:
        delete_ingredient = (
            "DELETE FROM Inventory "
            "WHERE name=%s AND owner=%s;"
        )
        data = ingredient.toTuple()[:2]
        try:
            cursor.execute(delete_ingredient, data)
            db.commit()
        except:
            success = False
    db.close()
    return success
