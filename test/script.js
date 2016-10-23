utils.setCanvas(window);
window.onload = function () {

    // ------------------ INITS ---------------------------------------------------------- //

    var canvas = document.getElementById('canvas');
    var top = document.getElementById('top');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse = utils.captureMouse(canvas);

    envi = new Envi(canvas, window);
    envi.mouse = mouse;


    // --------------- MAKE ASSETS ------------------------------------------------------- //
    

    var recA = new Asset(envi.shapes.rectang(30,15, 'H', 'blue'), window.innerWidth/2 - 600, window.innerHeight/2 - 300, 100, 40);
    var recB = new Asset(envi.shapes.rectang(30,15, 'E', 'blue'), window.innerWidth/2 - 600, window.innerHeight/2 - 300, 250, 40);
    var recC = new Asset(envi.shapes.rectang(30,15, 'L', 'blue'), window.innerWidth/2 - 600, window.innerHeight/2 - 300, 400, 40);
    var recD = new Asset(envi.shapes.rectang(30,15, 'L', 'blue'), window.innerWidth/2 - 600, window.innerHeight/2 - 300, 550, 40);
    var recE = new Asset(envi.shapes.rectang(30,15, 'O', 'blue'), window.innerWidth/2 - 600, window.innerHeight/2 - 300, 700, 40);
    
    var scatter = new Asset(envi.shapes.scatterCube(20, 0.5, ['hello', 'matthew coppola', 'web developer', ':)'], ['red', 'yellow', 'blue', 'green']), window.innerWidth/2 - 800, window.innerHeight/2 - 800, 400, 80);


    // --------------- LOAD ASSETS ------------------------------------------------------- //

    var assets = [];

    assets.push(recA);
    assets.push(recB);
    assets.push(recC);
    assets.push(recD);
    assets.push(recE);
    
    assets.push(scatter);
    

    // --------------- MAKE SCENE ------------------------------------------------------- //

    var scene = new Scene(envi, assets);
  
    // --------------  DRAW FRAME ------------------------------------------------------- /

    utils.getAnimationFrame();
    (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);

        scene.play();
    }());
};