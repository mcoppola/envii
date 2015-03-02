
// -------------- PRIMATIVE SHAPE GENERATORS ------------------------------------ //


function Shapes() {}


Shapes.prototype.cube = function(len, char, color) {
	if (char === undefined) { char = '-'}
	if (color === undefined) { color = '#000'}
	var model = [];

	for (var j=0; j < len; j++) {
		/// ------------------------------ //
		// FRONT                           //
		// ------------------------------- //
		// left, right, bottom, top
		model.push([0,j,0, char, color]);
		model.push([len,j,0, char, color]);
		model.push([j,0,0, char, color]);
		model.push([j,len,0, char, color]);

		// ------------------------------- //
		// BACK                            //
		// ------------------------------- //
		// left, right, bottom, top
		model.push([0,j,len, char, color]);
		model.push([len,j,len, char, color]);
		model.push([j,0,len, char, color]);
		model.push([j,len,len, char, color]);

		// ------------------------------- //
		// SIDES                           //
		// ------------------------------- //
		// btm left, top left, btm right, top right
		model.push([0,0,j, char, color]);
		model.push([0,len,j, char, color]);
		model.push([len,0,j, char, color]);
		model.push([len,len,j, char, color]);

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