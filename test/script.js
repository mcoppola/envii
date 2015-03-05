utils.setCanvas(window);
window.onload = function () {

    // ------------------ INITS ---------------------------------------------------------- //

    var canvas = document.getElementById('canvas');
    var top = document.getElementById('top');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse = utils.captureMouse(canvas);

    envi = new Envi(canvas, window);


    // --------------- MAKE ASSETS ------------------------------------------------------- //
    

    var recA = new Asset(envi.shapes.rectang(30,10, '@', '#f0e'), window.innerWidth/2 - 450, window.innerHeight/2 - 150, 100, 30);
    var recB = new Asset(envi.shapes.rectang(30,10, '@', '#0fe'), window.innerWidth/2 - 450, window.innerHeight/2 - 150, 200, 30);
    var recC = new Asset(envi.shapes.rectang(30,10, '@', '#fa0'), window.innerWidth/2 - 450, window.innerHeight/2 - 150, 300, 30);
    
    var cubeA = new Asset(envi.shapes.cube(20, '*', '#adf'), window.innerWidth/2 - 450, window.innerHeight/2 - 150, 400, 15);
    var cubeB = new Asset(envi.shapes.cube(20, '*', '#adf'), window.innerWidth/2 - 150, window.innerHeight/2 - 150, 400, 15);
    var cubeC = new Asset(envi.shapes.cube(20, '*', '#adf'), window.innerWidth/2 + 150, window.innerHeight/2 - 150, 400, 15);


    // --------------- LOAD ASSETS ------------------------------------------------------- //

    var assets = [];

    assets.push(recA);
    assets.push(recB);
    assets.push(recC);
    assets.push(cubeA);
    assets.push(cubeB);
    assets.push(cubeC);


    // --------------- MAKE SCENE ------------------------------------------------------- //

    var scene = new Scene(envi, assets);
  
    // --------------  DRAW FRAME ------------------------------------------------------- /

    utils.getAnimationFrame();
    (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);

        scene.play();
    }());
};