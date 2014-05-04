// -------------- ENVII ------------------------------------------------ //
//
// 3D ASCII Enviroment 

function Envi (canvas, window) {
	this.canvas = new Canvas(canvas);  // canvas context
	this.keyboard = new Keyboard(window);
	//this.dummyContext = dummy; // dummy for imgGrid
	this.width = this.canvas.width;  // canvas pixel dimmentions
	this.height = this.canvas.height;
	this.depth = (this.canvas.width+this.canvas.height)/2;  // z
	this.shiftX = 1;  // perspÏective shift
	this.shiftY = 1;  // starting conditions
	this.font = 'sans-serif';
	this.fontMax = 50; 
	this.fontStyle = ''; // include space at end if using
	this.frame = [this.width, this.height, this.depth];
	this.printStyle = 'fill'; // not using, TODO: use!
	this.resolutionFactor = 16;

	this.shape = new Shapes();
}

// ----------- SCENE FUNCTIONS  ----------------------------------- // 

// Vanishing Point Perspective convertion
Envi.prototype.pointTo3D = function (point) {
	var x = (point[0] + ((point[2]/this.depth)*((this.width*this.shiftX/2)-point[0])));
	var y = (point[1] + ((point[2]/this.depth)*((this.height*this.shiftY/2)-point[1])));
	return [x, y];
}
Envi.prototype.doModelAnimation = function (point, asset) {
	for (var i = 0; i < asset.modelAttributes.length; i+=1) {
		point = asset.modelAttributes[i].processPoint(this.frame, point, asset);
	}	
	return point;
}

// Returns Array of Char and Font String
Envi.prototype.charToSize = function (z) {
	if (z < this.depth){
		var fontSize = this.fontMax*((this.depth - z)/this.depth);
		var fontString = Math.round(fontSize).toString() + 'px ';
		return [this.fontStyle + fontString + this.font];
	} else { return [this.fontStyle + '0px' + this.font]; }
}


// ------ SCENE ------------------------------//
//
// Game runner

// Scene contains all objects(assets)
function Scene (envi, assets) {
	if (assets === undefined) { assets = []; }
	this.envi = envi;
	this.assets = assets;
}
Scene.prototype.add = function (newAsset) {
	if (typeof(newAsset) === Array) {
		this.assets = this.assets + newAsset;
	} else {
		this.assets[this.assets.length] = newAsset;
	}
}
// Main game function
Scene.prototype.play = function () {
	
	// update persective from key presses
	this.envi.keycheck();

	// draw all assets in scene
	this.envi.canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < this.assets.length; i+=1) {
		this.assets[i].draw(this.envi);
	}
}
