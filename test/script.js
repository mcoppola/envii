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
    

    var recA = new Asset(envi.shapes.rectang(5,5, 'H', 'blue'), window.innerWidth/2 - 100, window.innerHeight/2 - 100, 50, 40);
    var recB = new Asset(envi.shapes.rectang(5,5, 'E', 'blue'), window.innerWidth/2 - 100, window.innerHeight/2 - 100, 250, 40);
    var recC = new Asset(envi.shapes.rectang(5,5, 'L', 'blue'), window.innerWidth/2 - 100, window.innerHeight/2 - 100, 400, 40);
    var recD = new Asset(envi.shapes.rectang(5,5, 'L', 'blue'), window.innerWidth/2 - 100, window.innerHeight/2 - 100, 550, 40);
    var recE = new Asset(envi.shapes.rectang(5,5, 'O', 'blue'), window.innerWidth/2 - 100, window.innerHeight/2 - 100, 700, 40);
    
    // var scatter = new Asset(envi.shapes.scatterCube(20, 0.5, ['hello', 'matthew coppola', 'web developer',':}'], ['blue', '#938d8d']), window.innerWidth/2 - 800, window.innerHeight/2 - 800, 400, 80);


    // --------------- LOAD ASSETS ------------------------------------------------------- //

    var assets = [];

    assets.push(recA);
    assets.push(recB);
    assets.push(recC);
    assets.push(recD);
    assets.push(recE);
    

    // --------------- MAKE SCENE ------------------------------------------------------- //

    var scene = new Scene(envi, assets);
    
    // --------------- CLICKER ---------------------------------------------------------- //
    var color = '#'+Math.floor(Math.random()*16777215).toString(16);
    
    $(canvas).on('click', function(e) {

      var x = new Asset([[0,0,0, '#', color]], e.pageX, e.pageY, 0, 1);
      x.transform(new moveTo(e.pageX, e.pageY, 700, 1));
      scene.add(x);
      
    });
  
    // --------------  DRAW FRAME ------------------------------------------------------- /

    utils.getAnimationFrame();
    (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);

        scene.play();
    }());
};