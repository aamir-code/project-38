var dog,happyDog,database,dog1;
var FeedDrago;
var ADD;
var Food;
var foods;
var foodObj,foodStock;
var fedTime,lastFed;
var input,inpButton,greeting,DogName;
var bathroom,bedroom,garden;
var currentTime;
var ReadState;
var game;
var milkBottle2;
var m;
var livingroom;
var food;

function preload() {
    dog = loadImage("dogImg.png")
    happyDog = loadImage("dogImg1.png")
    bathroom = loadImage("washroom.png")
    bedroom = loadImage("Bed Room.png")
    garden = loadImage("Garden.png")
    m = loadImage("milk.png")
    livingroom = loadImage("Living Room.png")
}
function setup() {
    createCanvas(750,350)
    database = firebase.database()

    foodStock = database.ref("Food");
    foodStock.on("value",readStock);

    ReadState = database.ref("gameState");
    ReadState.on("value",function(data){
        game = data.val()
    });

    foodObj = new Foodd()
    
    milkBottle2 = createSprite();
    milkBottle2.addImage(m)


    dog1 = createSprite(600,150,30,30);
    dog1.scale = 0.15;
    dog1.addImage(dog)
  
    input = createInput("name");
    input.position(930,350);
    
    
    inpButton = createButton("Give");
    inpButton.position(930,370);
    inpButton.mousePressed(addName);

    

}

function draw() {
    background("yellow");

   foodObj.display();

   if(foods == 0){
    dog1.addImage(happyDog);
    milkBottle2.visible = false; 
}else{
    dog1.addImage(dog);
    milkBottle2.visible = false;
}
   if(game == 1){
       dog1.addImage(happyDog);
       dog1.scale = 0.15;
       dog1.y = 250;
   } 
   if(game == 2){
       dog1.addImage(dog);
       milkBottle2.visible = false; 
       dog1.y = 250;
       dog1.x = width/2;
       dog1.scale = 0.15; 
   }

   var bath = createButton("I want to take bath");
   bath.position(580,125);
   if(bath.mousePressed(function(){
       game = 3;
       database.ref("/").update({
           'gameState':game
       })
       
   }));
   if(game == 3){
       dog1.addImage(bathroom);
       dog1.scale = 2;
       dog1.x = width/2;
       milkBottle2.visible = false;

   }

   var sleep = createButton("I am very sleepy");
   sleep.position(710,125);
   if(sleep.mousePressed(function(){
    game = 4;
    database.ref("/").update({
        'gameState':game
    })
    
}));
    if(game == 4){
        dog1.addImage(bedroom);
        dog1.x = width/2;
        dog1.y = 150;
        dog1.scale = 2;
        milkBottle2.visible = false; 

    }
    var play = createButton("Let's play");
    play.position(500,100);
    if(play.mousePressed(function(){
        game = 5;
        database.ref("/").update({
            'gameState':game
        })
        
    }));
    if(game == 5){
        dog1.addImage(livingroom);
        dog1.scale = 2;
        dog1.x = width/2;
        milkBottle2.visible = false;
    }
    var PlayInPark = createButton("Let's play in park");
    PlayInPark.position(585,100);
    if(PlayInPark.mousePressed(function(){
        game = 6;
        database.ref("/").update({
            'gameState':game
        })
        
    }));
    if(game == 6){
        dog1.y = 175;
        dog1.addImage(garden);
        dog1.scale = 2;
        dog1.x = width/2;
        milkBottle2.visible = false;
    }
    var button = createButton("feed the dog");
    button.position(400,125);

    if(button.mousePressed(function(){

        feedDog();
        game = 1;

        database.ref("/").update({
            'gameState':game
        })
    }))
    var addFood = createButton("add food");
    addFood.position(500,125);
    if(addFood.mousePressed(function(){
        addFoods();
        game = 2;

        database.ref("/").update({
            'gameState':game
        })
    }))

drawSprites();
    
}
function update(state){
    database.ref("/").update({
        game:state
    })
}
function readStock(data) {
    foods = data.val();
}


function feedDog() {
    dog1.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)

    database.ref("/").update({
        Food:foodObj.getFoodStock(),
        FeedTime:hour()
    })
}
function addFoods() {
    foods++
    database.ref("/").update({
        Food:foods
    })
    foodObj.updateFoodStock(foodObj.getFoodStock()+1)

}
function addName() {
    input.hide();
    inpButton.hide();
    DogName = input.value()
    greeting = createElement("h3");
    greeting.html("My name is "+DogName);
    greeting.position(700,350);
}