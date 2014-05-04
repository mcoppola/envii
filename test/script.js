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
    
    var box = new Asset(envi.models.container, 0, 0, 0, 1);
    var sunA = new Asset(envi.models.sun, canvas.width/2 - 62, canvas.height/2 - 300, 200, 20);
    var sunB = new Asset(envi.models.sun, canvas.width/2 - 62, canvas.height/2 + 200, 200, 20);
    var sunC = new Asset(envi.models.sun, canvas.width/2 - 360, canvas.height/2 - 62, 200, 20);
    var sunD = new Asset(envi.models.sun, canvas.width/2 + 250, canvas.height/2 - 62, 200, 20);

    //sunA.modelAttributes[0] = new rotateY(10, 1);

    top.addEventListener('mousedown', function() {
        sunA.modelAttributes[0] = new explode_infinite(10, 300*Math.random(), 1);

        top.addEventListener('mousedown', function() {
            sunB.modelAttributes[0] = new explode_infinite(10, 300*Math.random(), 1);
        }, false);
    }, false);
    

    // --------------- LOAD ASSETS ------------------------------------------------------- //

    var assets = [];
    
    assets[0] = box;
    assets[1] = sunA;
    assets[2] = sunB;
    assets[3] = sunC;
    assets[4] = sunD;


    // --------------- MAKE SCENE ------------------------------------------------------- //

    scene = new Scene(envi, assets);
  
    // --------------  DRAW FRAME ------------------------------------------------------- /

    utils.getAnimationFrame();
  (function drawFrame () {
    window.requestAnimationFrame(drawFrame, canvas);

    scene.play();
  }());
};