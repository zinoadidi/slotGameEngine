##################
## slot game was wriiten in JS ES6
compiled with webpack using node
app is written in module format with sections of code abstracted in classes.

slotGameEngine.js holds all code required to run the game
app.js serves as entry point



solution/src folder contains the source code for app.js and slotGameEngine.js
solution/release contains the compiled js, css files and images used.

the index.html, css and images are not dulicated in the src folder because the app is configured to run with the compiled app.js file in the release folder


to set up this code base for development
* install node and webpack 
* navigate to solution folder and run npm install command
* run npm run-script build or webpack --watch --info-verbosity verbose to compile the code


::: i have continued work on this task regardless and can provide the finshed copy if required


## Note:
* reel image naming must follow the convention of 'imageName'.'File Format' e.g 'Cherry.png'
* reel is highly configurable and a new type of reel can be created just by calling the SlotGameEngine with number of reels and images to be used.
* while this flexiblity exists, i was forced to work based on 3 reels in some parts of the code so as to improve delivery time