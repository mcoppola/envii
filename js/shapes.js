
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
		// left
		model.push([0,j,0, char, color]);
		// right
		model.push([len,j,0, char, color]);
		// bottom
		model.push([j,0,0, char, color]);
		// top
		model.push([j,len,0, char, color]);

		// ------------------------------- //
		// BACK                            //
		// ------------------------------- //
		// left
		model.push([0,j,len, char, color]);
		// right
		model.push([len,j,len, char, color]);
		// bottom
		model.push([j,0,len, char, color]);
		// top
		model.push([j,len,len, char, color]);

		// ------------------------------- //
		// SIDES                           //
		// ------------------------------- //
		// btm left
		model.push([0,0,j, char, color]);
		// top left
		model.push([0,len,j, char, color]);
		// btm right
		model.push([len,0,j, char, color]);
		// top right
		model.push([len,len,j, char, color]);

	}	
	return model;
}	