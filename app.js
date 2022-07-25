
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
const numberFadeElem = document.getElementById("number-fade")
const drawSwordsElem = document.getElementById("draw-swords")
const doubleSwordPriceElem = document.getElementById("double-sword-price")
const flameSwordPriceElem = document.getElementById("flame-sword-price")
const flyingWolfElemPriceElem = document.getElementById("flying-wolf-price")
const goldKnightPriceElem = document.getElementById("gold-knight-price")




let wolfClockId = 0
let knightClockId = 0
let gameClock = 100


const character = {
  scales: 0,
  health: 100,
  multiplier: 1
}

let clickUpgrades = {
  doubleSword: {
    price: 100,
    quantity: 0,
    multiplier: 2
  },

  flameSword: {
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
  },

  goldKnight: {
    price: 500,
    quantity: 0,
    multiplier: 10,
    PurchaseTime: 10000,
    remainingTime: 0
  }
};

// function changeNumDirection(){
//   let numChange = Math.floor(Math.random() * 100);
//   let numChangeElem = document.getElementById("change-num").style.transform = `translateX(${numChange}px)`;

//   console.log(numChangeElem);
// }


function startGame(){
  document.getElementById("start-game").classList.add("d-none");
  document.getElementById("game").classList.remove("d-none");
}

// function chooseLevel(){
//   document.getElementById("game").classList.remove("d-none")
//   document.getElementById("level").classList.add("d-done")
//   // document.getElementsByClassName("main-bg").classList.remove(".main-bg")
//   // document.getElementsByClassName("main-bg").classList.add(".level-bg-1")
// }

// function levelOne(){

// }

function getScales() {
  character.scales += 1;
  numberFadeElem.innerHTML = `<h1 id="change-num" class="number-fade">+${character.multiplier}</h1>`;
  document.getElementById("number-fade").style.color = "red";
  for (let key in clickUpgrades) {
    let clickUpgrade = clickUpgrades[key]
    if (clickUpgrade.quantity > 0) {
      character.scales += clickUpgrade.multiplier * clickUpgrade.quantity
      numberFadeElem == clickUpgrades.multiplier + character.multiplier
      numberFadeElem.innerHTML = `<h1 class="number-fade">+${(clickUpgrades.doubleSword.multiplier * clickUpgrades.doubleSword.quantity) + (clickUpgrades.flameSword.multiplier * clickUpgrades.flameSword.quantity)}</h1><h1 class="number-fade num-color">+${character.multiplier}</h1>`
    }
  }
  update();
}










function collectAutoUpgrades() {
  for (let key in automaticUpgrades) {
    let autoUpgrade = automaticUpgrades[key]
    if (autoUpgrade.quantity > 0) {
      character.scales += autoUpgrade.multiplier * autoUpgrade.quantity
      numberFadeElem == automaticUpgrades.multiplier
      document.getElementById("number-fade").style.color = "green";
      numberFadeElem.innerHTML = `<h1 class="number-fade">+${autoUpgrade.multiplier}</h1>`
    }
    else {
      numberFadeElem.innerHTML = ` `
    }
  }

}





function update() {
  scalesElem.innerText = character.scales
  doubleSwordElem.innerText = clickUpgrades.doubleSword.quantity
  flameSwordElem.innerText = clickUpgrades.flameSword.quantity
  flyingWolfElem.innerText = automaticUpgrades.flyingWolf.quantity
  goldKnightElem.innerText = automaticUpgrades.goldKnight.quantity


}


function buyDoubleSword() {
  if (character.scales >= clickUpgrades.doubleSword.price) {
    character.scales -= clickUpgrades.doubleSword.price
    clickUpgrades.doubleSword.quantity += 1;
    clickUpgrades.doubleSword.price *= 2;
    doubleSwordPriceElem.innerHTML = `
    <span>
    BUY DOUBLE SWORD
    </span><br>
    <span>${clickUpgrades.doubleSword.price}</span>
    `
  }
  drawSwordsElem.innerHTML = `<img height="60" width="60" src="https://monophy.com/media/ibjySuQECyDNeyw7kb/monophy.gif" alt=""> ${clickUpgrades.doubleSword.quantity}` //tweak this - want multiple swords
  

  update()
}

function buyFlameSword() {
  if (character.scales >= clickUpgrades.flameSword.price) {
    character.scales -= clickUpgrades.flameSword.price
    clickUpgrades.flameSword.quantity += 1;
    clickUpgrades.flameSword.price *= 2;
    flameSwordPriceElem.innerHTML = `
    <span>
      BUY FLAME SWORD
    </span><br>
    <span>${clickUpgrades.flameSword.price}</span>
    `
  }
  drawSwordsElem.innerHTML = `<img height="15" width="15" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7c95ec7b-5a4f-4aef-93df-78fad9ba2505/ddh4slr-82c38d93-e1a3-4414-9128-d8613670dc97.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjOTVlYzdiLTVhNGYtNGFlZi05M2RmLTc4ZmFkOWJhMjUwNVwvZGRoNHNsci04MmMzOGQ5My1lMWEzLTQ0MTQtOTEyOC1kODYxMzY3MGRjOTcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ElJVJDFOgnKjHAN3UP_yjOqxk1s3lWSyPtIo7tseO30" alt="">`
  update()
}

function buyFlyingWolf() {
  if (character.scales >= automaticUpgrades.flyingWolf.price) {
    character.scales -= automaticUpgrades.flyingWolf.price
    automaticUpgrades.flyingWolf.quantity += 1;
    automaticUpgrades.flyingWolf.price *= 2;
    flyingWolfElemPriceElem.innerHTML = `
    <span>
      BUY FLYING WOLF
    </span><br>
    <span>${automaticUpgrades.flyingWolf.price}</span>
    `
    startWolf()
    update()
    
  }
}

function startWolf() {
  automaticUpgrades.flyingWolf.remainingTime = automaticUpgrades.flyingWolf.PurchaseTime
  wolfClockId = setInterval(updateWolfTime, 1000)
  if (automaticUpgrades.flyingWolf.quantity > 1) {
    clearInterval(wolfClockId)
    automaticUpgrades.flyingWolf.remainingTime *= automaticUpgrades.flyingWolf.quantity
  }
  updateWolfTime()
  drawWolf()
}

function drawWolf() {
  if (automaticUpgrades.flyingWolf.quantity > 0) {
    flyingWolfImgElem.innerHTML = `
      <div class="wolf-img"></div>
      `
  }

}

function updateWolfTime() {
  wolfTimeElem.innerText = (automaticUpgrades.flyingWolf.remainingTime / 1000).toString()
  automaticUpgrades.flyingWolf.remainingTime -= 1000
  if (automaticUpgrades.flyingWolf.remainingTime < 0) {
    automaticUpgrades.flyingWolf.quantity = 0
    flyingWolfImgElem.innerHTML = ` `
    automaticUpgrades.flyingWolf.remainingTime = 0
    clearInterval(wolfClockId)
  }

  update()
}


function buyGoldKnight() {
  if (character.scales >= automaticUpgrades.goldKnight.price) {
    character.scales -= automaticUpgrades.goldKnight.price
    automaticUpgrades.goldKnight.quantity += 1;
    automaticUpgrades.goldKnight.price *= 2;
    goldKnightPriceElem.innerHTML = `
      <span>
        BUY DOUBLE SWORD
      </span><br>
      <span>${automaticUpgrades.goldKnight.price}</span>
      `
    startKnight()
    drawKnight()
  }
}


function startKnight() {
  automaticUpgrades.goldKnight.remainingTime = automaticUpgrades.goldKnight.PurchaseTime
  knightClockId = setInterval(updateKnightTime, 1000)
  if (automaticUpgrades.goldKnight.quantity > 1) {
    clearInterval(knightClockId)
    automaticUpgrades.goldKnight.remainingTime *= automaticUpgrades.goldKnight.quantity
  }
  updateKnightTime()
  drawKnight()
}

function drawKnight() {
  if (automaticUpgrades.goldKnight.quantity > 0) {
    goldKnightImgElem.innerHTML = `
    <div class="knight-img"></div>
    `
  }
}

function updateKnightTime() {
  knightTimeElem.innerText = (automaticUpgrades.goldKnight.remainingTime / 1000).toString()
  automaticUpgrades.goldKnight.remainingTime -= 1000
  if (automaticUpgrades.goldKnight.remainingTime < 0) {
    automaticUpgrades.goldKnight.quantity = 0
    goldKnightImgElem.innerHTML = ` `
    automaticUpgrades.goldKnight.remainingTime = 0
    clearInterval(knightClockId)
  }

  update()
}


let dayNum = 1

function draw() {
  gameClockElem.innerHTML = `
  <h3>DAY: ${dayNum}</h3>
  <div class="progress">
  <div  class="progress-bar progress-bar-striped bg-danger progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${gameClock}%"></div>
  </div>
`
}

function updateProgressBar() {
  // gameClockElem.innerText = (gameClock / 1000).toString()
  gameClock -= .25
  if (gameClock == 0) {
    gameClock = 100
    dayNum += 1
  }
  draw()
}

setInterval(updateProgressBar, 100)
draw()

setInterval(collectAutoUpgrades, 1000)













