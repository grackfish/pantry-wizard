from Recipe import Recipe

class SearchResult:
    def __init__(self, results:list[Recipe], filters):
        self.recipes = results
        self.filters = filters
        
    def getRecipes(self):
        return self.recipes
    
    def getFilters(self):
        return self.filters
    