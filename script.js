
let yPosition = 0;
let position;
let moveBomb;

function makeMonsters() {
    
    //loop through 30 times and make 31 monsters to consist of a row
    let monsterDiv = document.createElement("div");
    monsterDiv.className = "monsterRow"
    for(i = 0; i < 20; i++) {
        let monster = document.createElement("img"); 
        monster.className = "monster";
        monster.src = "monster.png";
        monster.style = "width:40px;"
        monsterDiv.appendChild(monster);
        // document.body.appendChild(monster);      
    }
    // debugger;

    document.body.appendChild(monsterDiv);
    let rect = monsterDiv.getBoundingClientRect();
    position = rect.bottom;
    console.log("POSITION" + position);
    console.log("INNER HEIGHT" + window.innerHeight);
    if(position > window.innerHeight) {//stop the game when the monsters reach the bottom of the screen
      gameOver();
    }


}

//make the monsters march down by changing the bottom position every 1000ms
let marchDown =  setInterval(makeMonsters,1000);


let launchBomb = () => {
    let bombPosition = document.getElementsByClassName("bomb")[0].getBoundingClientRect();
       let top = bombPosition.bottom; 
        console.log("top" + top);
        console.log("position" + position);
   yPosition += 1;
   document.getElementsByClassName("bomb")[0].style.bottom = yPosition + "px"; //keep incrementing the bomb's position
   console.log(yPosition)
   checkCollision();
   if(position >= top) {
    
        console.log("boom");
    clearInterval(moveBomb);   
     explodeBomb()
     clearInterval(flashOut)
   }
   
}

let explodeBomb = () => {
    boom()

}

let checkCollision = () => {
    let monsterRows = document.querySelectorAll(".monsterDiv");
    monsterRows.forEach(monsterRow => {
        let rowPosition = monsterRow.getBoundingClientRect().bottom;
        let bombPosition = yPosition; 
        if (bombPosition > rowPosition) {
            // debugger;
        }
    })
    
}

function boom() {
    let audioElement = document.createElement("audio");
    audioElement.src = "explosion-arcade.wav";
    audioElement.className = "clip";
    audioElement.play();
    document.body.style = "background-color:orange;"
    setInterval(flashOut, 100)
    //remove the bomb element from the DOM
    document.getElementsByClassName("bomb")[0].remove()
  
}

let opacityStepDown = 100;

function flashOut() {
    document.body.style = `opacity:${opacityStepDown -=0.1}; transition:20ms;`
}

function createBomb() {
    let bomb = document.createElement("img");
    bomb.src = "bomb_icon.png";
    bomb.className = "bomb";
    bomb.style = "position:absolute;bottom:0;width:40px;"
    document.body.appendChild(bomb);
}
 
createBomb()



document.querySelector(".bomb").addEventListener("click", () => {
    //clone the bomb from the left side and place it in the middle of the screen
    
    let bomb = document.createElement("img");
    bomb.src = "bomb_icon.png";
    bomb.className = "bomb";
    bomb.style = "position:absolute;bottom:0;left:40vw;width:40px;"
    document.body.appendChild(bomb);
    console.log("clicked")
    //moveBomb()
    moveBomb = setInterval(launchBomb,10);  

});

function gameOver() {
    document.body.style = "background-color: grey;" //grey out the screen to signal a game over
       
    //stop the interval when the monsters reach the bottom end of the screen
    clearInterval(marchDown);
    let message = document.createElement("p");
    message.textContent = "Game Over!";
    message.style = "position:absolute;top:50vh;right:50vw;color:yellow;font-size:18px";
    document.body.appendChild(message);
}



//clear up the last child of monster row div from the dom


//clone the bomb and launch it from the middle




