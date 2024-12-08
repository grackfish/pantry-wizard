from Ingredient import Ingredient

class Reminder:
    def __init__(self, id, ingredients:Ingredient):
        self.id = id
        self.ingredients = ingredients
        
    def display(self):
        return [(ingredient.getName(), ingredient.getShelfLife() + ingredient.getIntakeTime()) for ingredient in self.ingredients]
            
