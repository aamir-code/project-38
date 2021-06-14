class Foodd{
    constructor() {
    
        this.foodStock = 20;
        this.lastFed = 21;
        this.image = loadImage("milk.png")
    }
    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    getFoodStock() {
        
    return this.foodStock;

    }
    bedroom() {
        background(bedroom,550,500);
    }
    garden() {
        background(garden,550,500);
    }
    bathroom() {
        background(bathroom,550,500);
    }
    
    display() {
        var x = 80;
        var y = 100;

        if(this.foodStock != 0){
            for(var o = 0;o < this.foodStock;o++){
                if(o % 10 == 0){
                    x = 80;
                    y = y+50;
                }
                imageMode(CENTER);
                image(this.image,x,y,50,50);
                x = x+40;
            }
        }

    }
}