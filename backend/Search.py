import Database

class SearchQuery:
    def __init__(self, filters:dict, inventory):
        self.filters = filters
        self.inventory = inventory
        self.recipes = []
    
    def loadRecipes(self):
        # query database for more recipes fulfilling filters
        multiplier = self.filters["servings"]
        cuisine = self.filters["cuisine"]
        expanded = self.filters["scope"]
        required_ingredients = self.filters["required"]
        self.recipes += Database.getRecipe()
    
    def displayRecipes(self):
        return self.recipes

