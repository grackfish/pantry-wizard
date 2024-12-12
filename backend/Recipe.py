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

    def getIngredients(self):
        return self.ingredients
    
    def getCreator(self):
        return self.creatorID
    
    def getCuisine(self):
        return self.cuisine
    
    def getDishType(self):
        return self.type
    
    def getInstructions(self):
        return self.instructions
    
    # Formatted string representation of a Recipe for debug purposes
    def __str__(self):
        qualities = {
            "id" : self.id,
            "name" : self.name,
            "creator" : self.creatorID,
            "ingredients" : self.ingredients,
            "instructions" : self.instructions,
            "cuisine" : self.cuisine,
            "dish type" : self.type            
        }
        a = [x + ": " + str(qualities[x]) for x in qualities]
        return "\n".join(a)