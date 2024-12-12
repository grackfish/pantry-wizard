from datetime import date, timedelta

class Ingredient:
    def __init__(self, name:str, owner_id:int, quantity:int, unit:str, shelfLife:int, intakeTime:date):
        self.owner = owner_id
        self.name = name
        self.quantity = quantity
        self.units = unit
        self.shelfLife = shelfLife
        self.intakeTime = intakeTime
    
    def getOwner(self):
        return self.owner
    
    def getName(self):
        return self.name

    def getQuantity(self):
        return self.quantity

    def getShelfLife(self):
        return self.shelfLife

    def getIntakeTime(self):
        return self.intakeTime

    def setQuantity(self, new_quantity):
        self.quantity = new_quantity

    def setShelfLife(self, new_shelfLife):
        self.shelfLife = new_shelfLife

    def toTuple(self):
        return (
            self.name,
            self.owner,
            self.quantity,
            self.units,
            self.shelfLife,
            self.intakeTime
        )
        
    def toDict(self):
        return {
            "id" : self.name,
            "name" : self.name,
            "amount" : str(self.quantity) + " " + self.units,
            "expiration" : (self.intakeTime + timedelta(self.shelfLife)).isoformat()
        }