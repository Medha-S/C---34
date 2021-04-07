var dogImg, happyDogImg, foodS, foodStock;
var dog;
var database;

function preload()
{
  dogImg = loadImage("dog.png");
  happyDogImg = loadImage("happydog.png");
}

function setup()
{
  createCanvas(500, 500);
  
  dog = createSprite(250, 250, 50, 50);
	dog.addImage(dogImg);
  dog.scale = 0.2;
  
  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

}


function draw() 
{  
   
  background(46,139,87);

  if (keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  
  fill("red");
  stroke("orange"); 
  textSize(20);
  text("Food:" + foodS, 250, 100);
  }

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
   if(x<=0)
   {
     x=0;
   }

   else
   {
     x=x-1;
   }

   database.ref('/').update({food:x});
}
