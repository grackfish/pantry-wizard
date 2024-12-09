from Ingredient import Ingredient

class Recipe:
    def __init__(self, id:int, name:str, creatorID:int, ingredients:dict[str, int], cuisine:str, dishType:str, instructions:str):
        self.id = id
        self.name = name
        self.creatorID = creatorID
        self.ingredients = ingredients
        self.instructions = instructions
        self.cuisine = cuisine
        self.type = dishType
    
    def getId(self):
        return self.id

    def getName(self):
        return self.name

    def getIngredientList(self):
        return self.ingredients
    
    def getCreator(self):
        return self.creatorID
    
    def getCuisine(self):
        return self.cuisine
    
    def getDishType(self):
        return self.type
    
    def getInstructions(self):
        return self.instructions
    