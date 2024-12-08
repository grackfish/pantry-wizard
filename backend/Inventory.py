import Database
from Ingredient import Ingredient
from datetime import date

class Inventory:
    def __init__(self, user_id):
        self.userid = user_id
        self.ingredients:dict[str,Ingredient] = dict()
    
    def addIngredient(self, ingredient:Ingredient):
        ingredient_name = ingredient.getName()
        if ingredient_name in self.ingredients:
            new_quantity = ingredient.getQuantity() + self.ingredients[ingredient_name].getQuantity()
            self.ingredients[ingredient_name].setQuantity(new_quantity)
            Database.updateIngredient(self.userid, self.ingredients[ingredient_name].getQuantity())
        else:
            self.ingredients[ingredient_name] = ingredient
            Database.addIngredient(self.userid, ingredient)
        
    def removeIngredient(self, ingredient_name:str, quantity:int):
        try:
            new_quantity = max(self.ingredients[ingredient_name].getQuantity() - quantity, 0)
            if new_quantity == 0:
                Database.removeIngredient(self.userid, self.ingredients[ingredient_name])
                del self.ingredients[ingredient_name]
            else:
                self.ingredients[ingredient_name].setQuantity(new_quantity)
                Database.updateIngredient(self.userid, self.ingredients[ingredient_name].getQuantity())
        except Exception:
            print("Ingredient not found")
        
    def getIngredientList(self):
        return list(self.ingredients.keys)
    
    # initial load of the inventory -- populates self.ingredients
    def loadInventory(self):
        for ingredient in Database.getIngredients(self.user_id):
            self.ingredients[ingredient.name] = ingredient
        
        
    def checkExpiration(self):
        today = date.today()
        warning = []
        removed = []
        for ingredient_name in self.ingredients:
            ingredient = self.ingredients[ingredient_name]
            if (today - ingredient.getIntakeTime()).days > ingredient.getShelfLife():
                # Remove from inventory
                removed.append(ingredient)
                self.removeIngredient(ingredient_name=ingredient.name, quantity=ingredient.quantity)
            elif  (today - ingredient.getIntakeTime()).days >= ingredient.getShelfLife() - 7:
                warning.append(ingredient)
        
        return removed, warning
