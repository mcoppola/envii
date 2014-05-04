// ------------ ENVIROMENT + CONTROLLER INITS -------------------------------------- // 

function Canvas(elem) {
    this.elem = elem;
    this.ctx = this.elem.getContext('2d');
    this.width = elem.width;
    this.height = elem.height;
}
function Keyboard(window) {
	var keyboard = {
            keys : {},
            keyPress : function (evt) {
                if (this.keys[evt.keyCode] > 0) { return; }
                this.keys[evt.keyCode] = evt.timeStamp || (new Date()).getTime();
            },
            keyRelease : function (evt) {
                this.keys[evt.keyCode] = 0;
            }
        };
    window.addEventListener("keydown", keyboard.keyPress.bind(keyboard));
    window.addEventListener("keyup", keyboard.keyRelease.bind(keyboard));
    return keyboard;
}
Envi.prototype.keyCheck = function () {
	if (this.keyboard.keys[39] > 0) {
        this.shiftX += 0.025;               
      }
    if (this.keyboard.keys[37] > 0) {
        this.shiftX -= 0.025; 
    }
    if (this.keyboard.keys[38] > 0) {
        this.shiftY -= 0.025;
    }
    if (this.keyboard.keys[40] > 0) {
        this.shiftY += 0.025; 
    }
}
function Scroll(window) {
    var scroll = {
        deltaX : 0,
        deltaY : 0
    }
    window.onscroll = function( e ) {
        e.preventDefault();
        scroll.deltaX = window.pageXOffset;
        scroll.deltaY = window.pageYOffset;
    }
    return scroll;
}
Envi.prototype.scrollCheck = function () {
    if (this.scroll.deltaY != 0) {
        this.shiftY += 0.004*this.scroll.deltaY;
    }
    if (this.scroll.deltaX != 0) {
        this.shiftX += 0.004*this.scroll.deltaX;
    }
}

// --- GERNERAL PURPOSE STUFF ----------------------- //

var utils = {};

utils.captureMouse = function (element) {
    var mouse = {x: 0, y: 0};

    element.addEventListener('mousemove', function (event) {
        var x, y;
        if (event.pageX || event.pageY){
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
    }, false);

    return mouse;
};

utils.captureTouch = function (element) {
    var touch = {x: null, y: null, ispressed: false};

    element.addEventListener('touchstart', function (event) {
        touch.ispressed = true;
    }, false);

    element.addEventListener('touchend', function (event) {
        var x, y, 
            touch_event = event.touches[0]; 

        if(touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        } else {
            x = touch_event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = touch_event.clientY + document.body.scrollTop + document.documentElement.scrollTop;     
        }
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
    }, false);
    return touch;
};

utils.getAnimationFrame = function () {
    if(!window.requestAnimationFrame){
        window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
                                        window.mozRequestAnimationFrame ||
                                        window.oRequestAnimationFrame ||
                                        window.msRequestAnimationFrame ||
                                        function (callback) {
                                            return window.setTimeout(callback, 1000/60)
                                        });
    }
};

utils.setCanvas = function (window) {
    window.addEventListener(
        'load',
        function () {
            var canvas = document.getElementsByTagName('canvas')[0];

            fullscreenify(canvas);
        },
        false
        );

    function fullscreenify(canvas) {
        var style = canvas.getAttribute('style') || '';
        window.addEventListener('resize', function () {resize(canvas);}, false);

        resize(canvas);

        function resize(canvas) {

            if(window.innerWidth > window.innerHeight) {
                canvas.width  = Math.min(600, window.innerHeight - 60);
                canvas.height = Math.min(600, window.innerHeight - 60);
            }
            else {
                canvas.width = Math.min(600, window.innerWidth - 60);
                canvas.height = Math.min(600, window.innerWidth - 60);
            }

        }
    }
}

utils.doKeyDown = function (evt) {
    switch (evt.keyCode) {
        case 38:  /* Up arrow was pressed */
            if (y - dy > 0){
            y -= dy;
            }
        break;
        case 40:  /* Down arrow was pressed */
            if (y + dy < HEIGHT){
            y += dy;
            }
        break;
        case 37:  /* Left arrow was pressed */
            if (x - dx > 0){
            x -= dx;
            }
        break;
        case 39:  /* Right arrow was pressed */
            if (x + dx < WIDTH){
            x += dx;
            }
        break;
    }
}