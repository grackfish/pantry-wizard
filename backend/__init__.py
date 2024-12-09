# For App initialization stuff

from Inventory import Inventory
from Ingredient import Ingredient
import datetime

i = Inventory(1)
print(i.getIngredients())
ing = Ingredient(name="tomato",owner_id=1,quantity=5,unit="cups",shelfLife=20,intakeTime=datetime.date(2024,12,3))
i.addIngredient(ing)
print(i.getIngredients())
# i.removeIngredient("pepperoni", 2)
# a, b = i.checkExpiration()
# print("removed", [x.toTuple() for x in a])
# print("warning", [x.toTuple() for x in b])
# print(i.getIngredients())

print(i.searchRecipes())