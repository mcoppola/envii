// -------------- IMAGE GRID ----------------------------------------------- //
//
// An asset sub class to encorperate image files
//
// TODO
// - optimization 
//		we know the grid has a point for every x and y, we dont have to read the array

function ImageGrid ( envi, file ) { 
	this.envi = envi;
	this.img = null;
	this.grid = {};
	this.sourceFile = file;
	this.data = this.makeData();
	this.geo = this.makeGeo();
	this.asset;
}

// Extends ImageGrid to psuedo subclass Asset
// (Contains all methods of Assets optimized for ImageGrid)
ImageGrid.prototype.toAsset = function (x, y, z, scale) {
	this.xpos = x;
	this.ypos = y;
	this.zpos = z;
	this.pos = [x, y, z];
	this.scale = scale;
	this.modelAttributes = [];	
	this.sceneAttributes = [];
	this.width = this.img.width;
	this.height = this.img.height;

	// For ImageGrid we will make scale and position static
	// thus eliminating the need to recalculate at every frame
	var point, temp;
	for (i = 0; i < this.geo.length; i+=1) {

		point = this.geo[i];
		// SET SCALE
		temp = [point[0]*this.scale, point[1]*this.scale, point[2]*this.scale, point[3]];
		// SET POSITION
		temp = [this.xpos + temp[0], this.ypos + temp[1], this.zpos + temp[2], point[3], point[4]];
		this.geo[i] = temp;
	}
	
	this.draw = function () {
		// Dynamic functions here
		var animatedGeo = [];
		for(var j = 0; j < this.modelAttributes.length; j+=1){
			animatedGeo = this.modelAttributes[j].processGeo(this);
		}
		// Render text
		for (i = 0; i < animatedGeo.length; i+=1) {
			var tempPoint = animatedGeo[i]; // don't rewrite point data, we need to keep original for doing animations
			var xy = this.envi.pointTo3D(tempPoint);
			var charWithFont = [tempPoint[3], this.envi.charToSize(tempPoint[2])];
			this.envi.canvas.ctx.font = charWithFont[1];
			this.envi.canvas.ctx.fillStyle = tempPoint[4]; 
			this.envi.canvas.ctx.fillText(charWithFont[0], xy[0], xy[1]);
		}
	}
}

	
ImageGrid.prototype.makeData = function () {
	// get source file
	this.img = new Image();
	this.img.src = this.sourceFile;
	this.grid.width = this.img.width/this.envi.resolutionFactor;
	this.grid.height = this.img.height/this.envi.resolutionFactor; 
	// print it to dummy Canvas
	envi.dummyContext.width = this.img.width;
	envi.dummyContext.height = this.img.height;
	envi.dummyContext.drawImage(this.img, 0, 0);
	// get the data
	var data = [];
	for (var i = 1; i < this.grid.width; i+=1) { 
		for(var j = 1; j < this.grid.height; j+=1) {
			data[i*j] = envi.dummyContext.getImageData(i*this.envi.resolutionFactor, j*this.envi.resolutionFactor, 1, 1).data;  // hard coded ratio (1/24). fix!!!
		}
	}
	return data;
}

ImageGrid.prototype.makeGeo = function (asci) {
	if(typeof(asci) === 'undefined'){
		asci = 'o';
	}
	var geo = []
	for (var i = 1; i < this.grid.width; i+=1) {
		for(var j = 1; j < this.grid.height; j+=1) {

/*			if(Math.random() > .2){ asci='.'}
				else if (Math.random() < .2){ asci='o'}
					else if (Math.random() < .2){ asci='a'}
						else if (Math.random() < .2){ asci='e'}
							else if (Math.random() < .2){ asci='u'}
								else if (Math.random() > .2){ asci='*'}
									else { asci='#'}*/
			// plug ins for z
			// this.grid.width/Math.abs(i - this.grid.width/2)  =  convex shape x
			// this.grid.height/Math.abs(j - this.grid.height/2) = convex shape y
			geo[geo.length] = ([i, j, 1, asci, this.rgbToHex(this.data[i*j])])
		}
	}
	return geo;
}

ImageGrid.prototype.rgbToHex = function ( rgbaArray ) {
    return "#" + this.componentToHex(rgbaArray[0]) + this.componentToHex(rgbaArray[1]) + this.componentToHex(rgbaArray[2]);
    
}
ImageGrid.prototype.componentToHex = function (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
