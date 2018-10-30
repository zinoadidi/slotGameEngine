

class SlotGameEngine{
    constructor(){
        this.storage = {
            'set': function(name,value){
                this['db'][name] = value;
                sessionStorage.db = JSON.stringify(this['db']);
            },
            'get': function(name){
                this['db'] = JSON.parse(sessionStorage.db);
                return this['db'][name];
            },
            'db': {
                'reelObjects':{},
                'totalReels':0,
                'balance':0
            }
        }
        
        this.config = function(reelObjects,balance){
            this.storage.set('balance',balance);
            reelObjects = this.gameUI.attachReels(reelObjects);  
            this.storage.set('reelObjects',reelObjects);  
            
            //this.stopLoad();   
        }
        this.gameUI = { 
            attachReels: function(reelObjects){
                // attempt to create reels and symbols
                // attach this bjects to game UI with styles
                try{        
                    for(var count = 0; count < reelObjects.length; count ++){
                        
                        var reelContainer = document.querySelector("#reel-container");
                        var reelSizeOnPage = Math.round(12/reelObjects.length);
                        if(reelObjects.length > 6) reelSizeOnPage = 1;
                        var reel = document.createElement("DIV");
                        reel.id = 'reel'+count;
                        reel.className = `reel w3-col s${reelSizeOnPage} m${reelSizeOnPage} l${reelSizeOnPage} w3-border-left w3-border-right`;
                        var counter = 0;
                        /// assign symbols to reel
                        while( counter < reelObjects[count].images.length){
                            var reelImage = document.createElement("IMG");
                            reelImage.src = reelObjects[0].images[counter].src;
                            reelImage.className = 'reel-symbol';   
                            reel.appendChild(reelImage); 
                            counter ++;
                        }
                        // draw reel on UI
                        reelContainer.appendChild(reel); 

                        /// attach dom id's to reel object
                        reelObjects[count]['id'] = reel.id;
                    }
                    return reelObjects;
                }catch(ex){
                    console.log(ex);
                }
            }
        }
        this.createReelObj = function(numOfReels,imagesArray){
            // return reel object in promise
            this.storage.set('totalReels',numOfReels); 
            return new Promise(function(resolve ,reject){
                let reelObject = [];
                let images = [];
                if(imagesArray && numOfReels>0){
                    try{
                        // load images
                        for(let counter =0; counter < imagesArray.length; counter ++){
                            images[counter] = {
                                "symbolId": counter,
                                "src": imagesArray[counter]
                            }
                        }
                        // create reels object
                        for(let counter =0; counter < numOfReels; counter ++){
                            reelObject[counter] = {"images":""}
                            reelObject[counter].images = images;
                        }
                        
                        resolve(reelObject);
                    }catch(ex){
                        reject(Error(ex));
                    }
                }else{
                    reject(new Error("Kindly provide value for images and number of reels"));
                }
            });
        }
        this.spinReel = function(reel,index){
           
            reel = this.storage.get('reelObjects');
            reel = reel[index]; 
        
            console.dir(reel);
            console.log(index)
             
            let firstElement = reel['images'].shift();
            reel['images'].push(firstElement);
            
            //removed dom manipulation temorary
                for (let count = 0;count < reel['images'].length; count++){
                    let DOMReel = document.querySelector(`#${reel.id}`);
                    DOMReel.childNodes[count]['src'] = reel['images'][count].src;
                }
            let reelObjects = this.storage.get('reelObjects');
            reelObjects[index] = reel;
            this.storage.set('reelObjects',reelObjects);
            
           // return Promise.resolve(reel);
            
        } 

        this.deductBalance = function(amountToDeduct){
            var newBalance = parseInt(this.storage.get('balance')) - parseInt(amountToDeduct);
            this.storage.set('balance',newBalance);
            return newBalance;
        }
        this.enableInteraction = function(){
            var itemsToDisable = document.querySelectorAll(".interactable");
            itemsToDisable.forEach(function(item) {
                item.classList.remove('visible');
            });    
        }
        
        this.disableInteraction = function(){
            var itemsToEnable = document.querySelectorAll(".interactable");
            
            itemsToEnable.forEach(function(item) {
                item.classList.add('visible');
            }); 
        }
              
        this.startLoad = function() {
            var loadingScr = document.querySelector(".loadingbar");
            loadingScr.classList.remove('hidden');
        }

        this.stopLoad = function(){
            var loadingScr = document.querySelector(".loadingbar");
            loadingScr.classList.add('hidden');
            //show display area for first time
            loadingScr = document.querySelector("#display");
            loadingScr.classList.remove('hidden');
        }
       
        this.calculateScore = async function(){
            //removed dom manipulation temorary
           
            var reels = this.storage.get('reelObjects');
            console.log("End")
            console.dir(reels);
            /*  
            var currentSymbols = []; */
            //for(var count =0; count < reels.length;count ++){
              /*   reels[count].images.pop();
                reels[count].images.shift();
                console.dir(reels); */
                
                /* currentSymbols[count]['top']= reels[count].images[0];
                currentSymbols[count]['middle']= reels[index].images[1];
                currentSymbols[count]['bottom']= reels[index].images[2];  */
           // }
            //console.dir(currentSymbols);
            var result = 0;
            return Promise.resolve(result);
        }
    }
}


export {SlotGameEngine};