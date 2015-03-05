
// -------------- PRIMATIVE SHAPE GENERATORS ------------------------------------ //


function Shapes() {}


Shapes.prototype.cube = function(len, char, color) {
	if (char === undefined) { char = '.'}
	if (color === undefined) { color = '#000'}
	var model = [];

	for (var i=0; i < len; i++) {
		/// ------------------------------ //
		// FRONT                           //
		// ------------------------------- //
		// left, right, bottom, top
		model.push([0,i,0, char, color]);
		model.push([len,i,0, char, color]);
		model.push([i,0,0, char, color]);
		model.push([i,len,0, char, color]);

		// ------------------------------- //
		// BACK                            //
		// ------------------------------- //
		// left, right, bottom, top
		model.push([0,i,len, char, color]);
		model.push([len,i,len, char, color]);
		model.push([i,0,len, char, color]);
		model.push([i,len,len, char, color]);

		// ------------------------------- //
		// SIDES                           //
		// ------------------------------- //
		// btm left, top left, btm right, top right
		model.push([0,0,i, char, color]);
		model.push([0,len,i, char, color]);
		model.push([len,0,i, char, color]);
		model.push([len,len,i, char, color]);

	}	
	return model;
}

Shapes.prototype.rectang = function(w, h, char, color) {
	if (char === undefined) { char = '.'}
	if (color === undefined) { color = '#000'}
	var model = [];

	for (var i=0; i < w; i++) {
		model.push([i,0,0, char, color]);
		model.push([i,h,0, char, color]);
	}
	for (var j=0; j < h+1; j++) {
		model.push([0,j,0, char, color]);
		model.push([w,j,0, char, color]);
	}
	return model;
}

// 2D grid
Shapes.prototype.grid = function ( width, height, asci, color ) {
	if(typeof asci === "undefined") {
        asci = '.';
    }
    if(typeof color === "undefined") {
    	color = "#000"
    }
	var grid = [];
	for (var i = 1; i < width; i+=1) {
		for(var j = 0; j < height; j+=1) {
			grid.push([i, j, 1, asci, color ]);
		}
	}
	return grid;

}