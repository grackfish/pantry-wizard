class Ingredient:
    def __init__(self, id, name, quantity, unit, shelfLife, intakeTime):
        self.id = id
        self.name = name
        self.quantity = quantity
        self.units = unit
        self.shelfLife = shelfLife
        self.intakeTime = intakeTime
    
    def getID(self):
        return self.id
    
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

    