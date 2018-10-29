/* ****** Slot Game JS by Zino Adidi ****** */
/*  Derivco recruitment test solution 2018  */



// load all libraries and scripts


//import app files and run configs
//import {RendaSettings} from '../models/RendaSettings.js';
import {SlotGameEngine} from './SlotGameEngine.js';

//let renda = new Renda();

let game = new SlotGameEngine();
game.spinningReels = [];
game.numOfRequestCompleted = 0;
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
const spin_btn = document.querySelector("#spin_btn");
spin_btn.addEventListener(
    "click",
    function(){
        // call spin reel function on each reel
        game.disableInteraction();
        new spinRequest(0);
        new spinRequest(1);
        new spinRequest(2);
    }
)


function spinRequest(counter){
    var reelObjects = game.storage.get('reelObjects');
    
    var newBalance = parseInt(game.storage.get('balance')) - 2;
    document.querySelector("#balanceInput").value = newBalance;
    game.storage.set('balance',newBalance);
    const spinSpeed = 200;  
    var spinningTime = 2000;
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
        }, spinSpeed);
        
        setTimeout(
            function(){ 
                clearInterval(game.spinningReels[counter]) 
                game.numOfRequestCompleted ++;

                if(game.spinningReels.length <=  game.numOfRequestCompleted){
                    game.numOfRequestCompleted = 0;
                    game.enableInteraction();
                    game.calculateScore();
                }
            },
            spinningTime
        );

        spinningTime += 500;
  //  }
    
}

