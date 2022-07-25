
const scalesElem = document.getElementById("scales")
const doubleSwordElem = document.getElementById("double-sword")
const flameSwordElem = document.getElementById("flame-sword")
const flyingWolfElem = document.getElementById("flying-wolf")
const flyingWolfImgElem = document.getElementById("flying-wolf-img")
const wolfTimeElem = document.getElementById("wolf-time")
const goldKnightElem = document.getElementById("gold-knight")
const goldKnightImgElem = document.getElementById("gold-knight-img")
const knightTimeElem = document.getElementById("knight-time")
const gameClockElem = document.getElementById("game-clock")
const fadeWolfElem = document.getElementsByClassName("wolf-fade")


let wolfClockId = 0
let knightClockId = 0
let gameClock = 100


const character = {
  scales: 5000,
  health: 100
}

let clickUpgrades = {
  doubleSword: {
    price: 100,
    quantity: 0,
    multiplier: 2
  },

  flameSword:{
    price: 200,
    quantity: 0,
    multiplier: 4
  }
};

let automaticUpgrades = {
  flyingWolf: {
    price: 300,
    quantity: 0,
    multiplier: 5,
    PurchaseTime: 5000,
    remainingTime: 0,
    Image: 'https://64.media.tumblr.com/e9e263935304659d1ddef95e79c7be1a/tumblr_noxe3o9TCc1tgzy56o1_400.gifv'
  },

  goldKnight: {
    price: 500,
    quantity: 0,
    multiplier: 10,
    PurchaseTime: 10000,
    remainingTime: 0
  }
};


function getScales(){
  character.scales += 1;
  for(let key in clickUpgrades){
    let clickUpgrade = clickUpgrades[key]
    if(clickUpgrade.quantity > 0){
      character.scales += clickUpgrade.multiplier * clickUpgrade.quantity
    }
  }
  update()
}


function collectAutoUpgrades(){
  for(let key in automaticUpgrades){
    let autoUpgrade = automaticUpgrades[key]
    if(autoUpgrade.quantity > 0){
      character.scales += autoUpgrade.multiplier * autoUpgrade.quantity
    }
  }
}





function update(){
  scalesElem.innerText = character.scales
  doubleSwordElem.innerText = clickUpgrades.doubleSword.quantity
  flameSwordElem.innerText = clickUpgrades.flameSword.quantity
  flyingWolfElem.innerText = automaticUpgrades.flyingWolf.quantity
  goldKnightElem.innerText = automaticUpgrades.goldKnight.quantity


}


function buyDoubleSword(){
  if(character.scales >= clickUpgrades.doubleSword.price){
    character.scales -= clickUpgrades.doubleSword.price
    clickUpgrades.doubleSword.quantity +=1;
    clickUpgrades.doubleSword.price *= 2; 
  }
  
  update()
}

function buyFlameSword(){
  if(character.scales >= clickUpgrades.flameSword.price){
    character.scales -= clickUpgrades.flameSword.price
    clickUpgrades.flameSword.quantity +=1;
    clickUpgrades.flameSword.price *= 2;
  }
    
  update()
}

function buyFlyingWolf(){
  if(character.scales >= automaticUpgrades.flyingWolf.price){
    character.scales -= automaticUpgrades.flyingWolf.price
    automaticUpgrades.flyingWolf.quantity += 1;
    automaticUpgrades.flyingWolf.price *= 2;
    startWolf()
    update()
  }
}

function startWolf(){
  automaticUpgrades.flyingWolf.remainingTime = automaticUpgrades.flyingWolf.PurchaseTime
  wolfClockId = setInterval(updateWolfTime, 1000)
  if(automaticUpgrades.flyingWolf.quantity > 1){
    clearInterval(wolfClockId)
    automaticUpgrades.flyingWolf.remainingTime *= automaticUpgrades.flyingWolf.quantity
  }
  updateWolfTime()
  drawWolf()
}

function drawWolf(){
    if(automaticUpgrades.flyingWolf.quantity > 0){
      flyingWolfImgElem.innerHTML = `
      <div class="wolf-img"></div>
      `
    } 

  }

function updateWolfTime(){
  wolfTimeElem.innerText = (automaticUpgrades.flyingWolf.remainingTime / 1000).toString()
  automaticUpgrades.flyingWolf.remainingTime -= 1000
  if(automaticUpgrades.flyingWolf.remainingTime < 0){
    automaticUpgrades.flyingWolf.quantity = 0
    flyingWolfImgElem.innerHTML = ` `
    clearInterval(wolfClockId)
  }

  update()
}


function buyGoldKnight(){
  if(character.scales >= automaticUpgrades.goldKnight.price){
    character.scales -= automaticUpgrades.goldKnight.price
    automaticUpgrades.goldKnight.quantity += 1;
    automaticUpgrades.goldKnight.price *= 2;
    startKnight()
    drawKnight()
  }
}


function startKnight(){
  automaticUpgrades.goldKnight.remainingTime = automaticUpgrades.goldKnight.PurchaseTime
  knightClockId = setInterval(updateKnightTime, 1000)
  if(automaticUpgrades.goldKnight.quantity > 1){
    clearInterval(knightClockId)
    automaticUpgrades.goldKnight.remainingTime *= automaticUpgrades.goldKnight.quantity
  }
  updateKnightTime()
  drawKnight()
}

function drawKnight(){
  if(automaticUpgrades.goldKnight.quantity > 0){
    goldKnightImgElem.innerHTML = `
    <div class="knight-img"></div>
    `
  }
}

function updateKnightTime(){
  knightTimeElem.innerText = (automaticUpgrades.goldKnight.remainingTime / 1000).toString()
  automaticUpgrades.goldKnight.remainingTime -= 1000
  if(automaticUpgrades.goldKnight.remainingTime < 0){
    automaticUpgrades.goldKnight.quantity = 0
    goldKnightImgElem.innerHTML = ` `
    clearInterval(knightClockId)
  }

  update()
}


function draw(){
  gameClockElem.innerHTML = `
  <div class="progress">
  <div  class="progress-bar progress-bar-striped bg-danger progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${gameClock}%"></div>
  </div>
`
}

function updateProgressBar(){
  // gameClockElem.innerText = (gameClock / 1000).toString()
  gameClock -= .25
  if(gameClock == 0){
    gameClock=100
  }
  draw()
}

setInterval(updateProgressBar, 100)
draw()

setInterval(collectAutoUpgrades, 3000)













