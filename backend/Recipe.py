import Database
from Ingredient import Ingredient

class Recipe:
    def __init__(self, id:int, name:str, ingredients:dict[str, Ingredient], cookTime:int, labels:set[str], saves:int, instructions:str):
        self.id = id
        self.name = name
        self.ingredients = ingredients
        self.instructions = instructions
        self.cookTime = cookTime
        self.labels = labels
        self.saves = saves
    
    def getId(self):
        return self.id

    def getName(self):
        return self.name

    def getIngredientList(self):
        return self.ingredients

    def getCookTime(self):
        return self.cookTime

    def getLabels(self):
        return self.labels

    def getSaves(self):
        return self.saves

    def addLabel(self, new_label:str):
        if new_label in self.labels:
            return True
        Database.updateRecipe() # TODO: Define updateRecipe and pass in required params
        self.labels.add(new_label)
        return True

    def removeLabel(self, new_label:str):
        if new_label not in self.labels:
            return False
        Database.updateRecipe() # TODO: Define updateRecipe and pass in required params
        self.labels.remove(new_label)
        return True

    def setCookTime(self, new_cookTime:int):
        Database.updateRecipe() # TODO: Define updateRecipe and pass in required params
        self.cookTime = new_cookTime
        return True

    def addIngredient(self, new_ingredient:Ingredient):
        new_ingredient_name = new_ingredient.getName()
        if new_ingredient_name in self.ingredients:
            raise Exception("Ingredient already exists")
        else:
            self.ingredients[new_ingredient_name] = new_ingredient
            Database.updateRecipe() # TODO: Define updateRecipe and pass in required params

    def removeIngredient(self, ingredient:Ingredient):
        ingredient_name = ingredient.getName()
        if ingredient_name not in self.ingredients:
            raise Exception("Ingredient to remove not in recipe")
        else:
            del self.ingredients[ingredient_name]
            Database.updateRecipe() # TODO: Define updateRecipe and pass in required params

    def setIngredient(self, ingredient:Ingredient):
        self.ingredients[ingredient.name] = ingredient
        Database.updateRecipe() # TODO: Define updateRecipe and pass in required params


    def setSaves(self, new_val):
        self.saves = new_val
        Database.updateRecipe() # TODO: Define updateRecipe and pass in required params


