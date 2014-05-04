utils.setCanvas(window);
      window.onload = function () {

        // ------------------ INITS ---------------------------------------------------------- //

        var canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse = utils.captureMouse(canvas);

        var models = new Models();
        envi = new Envi(canvas, window);


        // --------------- MAKE ASSETS ------------------------------------------------------- //
    
        var sun = new Asset('sun', 400, 100, 200, models.sun, 12);

        // --------------- LOAD ASSETS ------------------------------------------------------- //
        //
        // TODO
        // - integrate assets container into envi
        // - make it capable of appending []

        var assets = [];
        
        assets[0] = sun;


        // --------------- MAKE SCENE ------------------------------------------------------- //

        scene = new Scene(envi, assets);

        // scene.add(sun);
      
        // --------------  DRAW FRAME ------------------------------------------------------- /
        
        utils.getAnimationFrame();
      (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);

        scene.play();
      }());
    };