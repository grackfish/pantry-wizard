import Database
from Ingredient import Ingredient
from datetime import date
from SearchResult import SearchResult

class Inventory:
    def __init__(self, user_id):
        self.userid = user_id
        self.ingredients:dict[str,Ingredient] = dict()
        self.loadInventory()
    
    def addIngredient(self, ingredient:Ingredient):
        ingredient_name = ingredient.getName()
        if ingredient_name in self.ingredients:
            new_quantity = ingredient.getQuantity() + self.ingredients[ingredient_name].getQuantity()
            self.ingredients[ingredient_name].setQuantity(new_quantity)
            Database.updateIngredient(self.ingredients[ingredient_name])
        else:
            self.ingredients[ingredient_name] = ingredient
            Database.addIngredient(ingredient)
        
    def removeIngredient(self, ingredient_name:str, quantity:int):
        try:
            new_quantity = max(self.ingredients[ingredient_name].getQuantity() - quantity, 0)
            if new_quantity == 0:
                Database.removeIngredient(self.ingredients[ingredient_name])
                del self.ingredients[ingredient_name]
            else:
                self.ingredients[ingredient_name].setQuantity(new_quantity)
                Database.updateIngredient(self.ingredients[ingredient_name])
        except Exception(KeyError):
            print("Ingredient not found")
            
    def getIngredients(self):
        return [(i, self.ingredients[i].getQuantity()) for i in self.ingredients]
    
    # initial load of the inventory -- populates self.ingredients
    def loadInventory(self):
        ingredients = Database.getIngredients(self.userid)
        if not ingredients:
            return
        for name, owner, amt, unit, shelfLife, intakeDate in ingredients:
            self.ingredients[name] = Ingredient(name=name, owner_id=owner, quantity=int(amt), unit=unit, shelfLife=shelfLife, intakeTime=intakeDate)
        
    def checkExpiration(self)->tuple[list[Ingredient], list[Ingredient]]:
        today = date.today()
        warning = []
        removed = []
        for ingredient_name in self.ingredients:
            ingredient = self.ingredients[ingredient_name]
            if (today - ingredient.getIntakeTime()).days > ingredient.getShelfLife():
                # Remove from inventory
                removed.append(ingredient)
            elif (today - ingredient.getIntakeTime()).days >= ingredient.getShelfLife() - 7:
                warning.append(ingredient)
        for ingredient in removed:
            self.removeIngredient(ingredient_name=ingredient.name, quantity=ingredient.quantity)
        return removed, warning

    def searchRecipes(self, filters:dict) -> SearchResult:
        recipes = Database.getRecipes()
        out = []
        for recipe in recipes:
            # Check if recipe should be filtered
            
            out.append(recipe)
            for ingredient, amount in recipe.getIngredients().items():
                # Check if we have sufficient ingredients
                if ingredient not in self.ingredients or self.ingredients[ingredient].getQuantity() < amount:
                    out.pop()
                break
        return SearchResult(out, filters)
        