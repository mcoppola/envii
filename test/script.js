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
    

    var cube = new Asset(envi.shapes.cube(20, '.'), window.innerWidth/2 - 150, window.innerHeight/2 - 150, 25, 15);
    var inner = new Asset(envi.shapes.cube(20, '.', "#f00"), window.innerWidth/2 - 100, window.innerHeight/2 - 100, 100, 10);
    var center = new Asset(envi.shapes.cube(10, '.', "#ff0"), window.innerWidth/2 - 50, window.innerHeight/2 - 50, 150, 10);



    // --------------- LOAD ASSETS ------------------------------------------------------- //

    var assets = [];
    
    assets.push(cube);
    assets.push(inner);
    assets.push(center);


    // --------------- MAKE SCENE ------------------------------------------------------- //

    var scene = new Scene(envi, assets);
  
    // --------------  DRAW FRAME ------------------------------------------------------- /

    utils.getAnimationFrame();
    (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);

        scene.play();
    }());
};