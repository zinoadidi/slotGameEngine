/* ****** Slot Game JS by Zino Adidi ****** */
/*  Derivco recruitment test solution 2018  */



// load all libraries and scripts


//import app files and run configs
import {WinningCombinations} from './models/WinningCombinations.js';
import {SlotGameEngine} from './SlotGameEngine.js';

let game = new SlotGameEngine();
game.spinningReels = [];
game.numOfRequestCompleted = 0;
game.spinningTime = 0;
game.spinSpeed = 0;  
game.winningCombinations = WinningCombinations;
game.mode = 'random';
const spin_btn = document.querySelector("#spin_btn");
const game_mode_btn = document.querySelector("#game_mode_btn");
const close_debug_area= document.querySelector("#close_debug_area");
const switchGameModeRandom= document.querySelector("#switchGameModeRandom");
const switchGameModeFixed= document.querySelector("#switchGameModeFixed");

game.createReelObj(
    3,
    [
        'img/3xBAR.png',
        'img/BAR.png',
        'img/2xBAR.png',
        'img/7.png',
        'img/CHERRY.png'
    ]
).then(
    function(reelObj) {
        let userBalance = 500;
        game.config(reelObj,userBalance);
        let balanceInput = document.querySelector("#balanceInput");
        balanceInput.value = 500;
        game.stopLoad();   
     },
    function(error) { 
        console.log(error);
     }
);

 


////////////// Handle events on page \\\\\\\\\\\\\\\\\

spin_btn.addEventListener(
    "click",
    function(){
        // call spin reel function on each reel
        game.disableInteraction();
        document.querySelector("#balanceInput").value =  game.deductBalance(2);
        var reels = game.storage.get('reelObjects');
        console.log("start")
        game.spinningTime = 2000;
        game.spinSpeed = Math.floor(Math.random() * 97) + 23;
        console.log("spin speed:"+game.spinSpeed);
        new spinRequest(0); 
        new spinRequest(1);
        new spinRequest(2);

        
    }
)


function spinRequest(counter){
    var reelObjects = game.storage.get('reelObjects');
    
    //var counter = 0;
     //for(counter = 0; counter < reelObjects.length; counter ++){ 
       
        game.spinningReels[counter] = setInterval(function(){   

           
            
            var newReelObjects = game.storage.get('reelObjects');
            var reel = newReelObjects[counter];
            
            
             /// miliseconds
            game.spinReel(reel,counter)
            /* .then(
                function(newReel){
                   // console.dir(newReel);
                      
                }
            ) */
        }, game.spinSpeed);

        setTimeout(
            function(){ 
                clearInterval(game.spinningReels[counter]) 
                game.numOfRequestCompleted ++;
                
                if(game.spinningReels.length ==  game.numOfRequestCompleted){
                    console.log("game ending now")
                   
                    game.enableInteraction();
                    
                    game.calculateScore(game.winningCombinations).then(
                        function(response){
                            //rest some basic variables 
                            game.spinningReels = [];
                            game.numOfRequestCompleted = 0;
                            game.spinningTime = 0;
                            game.spinSpeed = 0;  
                        }
                    )
                }
            },
            game.spinningTime
        );
        game.spinningTime += 500;
  //  }
     
}

game_mode_btn.addEventListener(
    "click",
    function(){
        document.querySelector("#debug_area").classList.add('visible');
        
        if(game.mode == 'random'){
            switchGameModeRandom.click();
        }else{
            switchGameModeFixed.click();
        }
    }
)

close_debug_area.addEventListener(
    "click",
    function(){
        // call spin reel function on each reel
        document.querySelector("#debug_area").classList.remove('visible');
    }
)

switchGameModeFixed.addEventListener(
    "click",
    function(){
        document.querySelector("#gameSetToFixedMode").classList.add('visible');
        document.querySelector("#gameSetToRandomMode").classList.remove('visible');
    }
)
switchGameModeRandom.addEventListener(
    "click",
    function(){
        document.querySelector("#gameSetToRandomMode").classList.add('visible');
        document.querySelector("#gameSetToFixedMode").classList.remove('visible');
    }
)