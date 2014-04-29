// ------------ UTILITIES + INITS -------------------------------------- // 


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
Envi.prototype.keycheck = function () {
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