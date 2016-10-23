function Frame (widht, height, depth) {	
	this.width = width;
	this.height = height;
	this.depth = depth;

}
// ------------------------------------------------------------------------ //
// 		MODEL ANIMATIONS
// ------------------------------------------------------------------------ //

function explode_infinite (side, distance, scale, speed, state) {
	if (speed === undefined) { speed = 1 };
	if (state === undefined) { state = 0 };
	this.side = side;
	this.distance = distance
	this.scale = scale;
	this.speed = speed/100;
	}
explode_infinite.prototype.processPoint = function (frame, point, asset) {
	for (var i=0; i < point.length - 1;	 i+=1) {
			if (point[i] > this.side*asset.scale/2) {
				point[i] = point[i] + this.scale*this.state;
			} 
			else if ( point[i] == this.side*asset.scale/2) {
			}
			else {
				point[i] = point[i] - this.scale*this.state;
			}
		}
	if (10000000 > this.state) {
		this.state += 1*this.speed;
	}
	else {
		this.state = 0;
	}
	return point;
}

function rotateY (side, speed) {
	if (speed === undefined) { speed = 1 };
	this.side = side;
	//this.half = side/2;
	this.speed = speed;
	this.state = 0;
}
rotateY.prototype.processPoint = function (frame, point, asset) {
	var half = (this.side/2)*asset.scale;

	// Get delay for x and z
	var deltaX = (this.half - point[0])/half;
	var deltaZ = (this.half - point[2])/half;
	//console.log("point[0]; " + point[0]);

	// rotation factor
	var rotFactorX = deltaX*(this.side)*(this.state/1000);
	point[0] = point[0]*rotFactorX;
	var rotFactorZ = deltaZ*(this.side)*(this.state/1000);
	point[2] = point[0]*rotFactorZ;

	// we'll do it in 1000 steps
	if (this.state < 1000) {
		this.state += 1*this.speed;
	}
	else {
		console.log("half: " + half);
		console.log("point[0]; " + point[0]);
		console.log("deltaX: " + deltaX);
		console.log("rotX: " + rotFactorX);
		this.state = 0;
	}
	return point;
}
function moveTo(x, y, z, speed) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.speed = speed;
	this.state = 1;
	this.dist = 60;
	this.firstTime = true;
	this.sign = function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }
	//this.callback = callback;
}
moveTo.prototype.processPoint = function (asset) {
	if (this.firstTime) {
		this.dx = this.x - asset.pos[0];
		this.dy = this.y - asset.pos[1];
		this.dz = this.z - asset.pos[2];
		this.length = this.dist/this.speed;
		this.firstTime = false;
	}

	asset.pos[0] += (this.dx/this.dist)*this.speed;
	asset.pos[1] += (this.dx/this.dist)*this.speed;
	asset.pos[2] += (this.dz/this.dist)*this.speed;
	
	this.state++;
	return (this.state > this.length) ? 0 : 1;
}

/*function barWave (color) {
	this.color = color;
	this.state = 0;
	this.firstTime = true;
}
barWave.prototype.gradient = function (startColor, endColor, steps) {
	//var ratio = 0.5;
	var hex = function(x) {
	    x = x.toString(16);
	    return (x.length == 1) ? '0' + x : x;
	};


	var r = Math.ceil(parseInt(startColor.substring(0,1), 16) * ratio + parseInt(endColor.substring(0,1), 16) * (1-ratio));
	var g = Math.ceil(parseInt(startColor.substring(2,3), 16) * ratio + parseInt(endColor.substring(2,3), 16) * (1-ratio));
	var b = Math.ceil(parseInt(startColor.substring(4,5), 16) * ratio + parseInt(endColor.substring(4,5), 16) * (1-ratio));

	var middle = hex(r) + hex(g) + hex(b);

 }
barWave.prototype.processPoint = function (frame, point, asset) {
	if (this.firstTime) {
		this.steps = this.gradient(point[4], this.color, 100);
		this.firstTime = false;
		//console.log(point[4]);
	}
	point[4] = this.steps[Math.floor(this.state)];
	this.state +=0.01;
	return point;
}*/

// ---- IMG GRID ---------------------------------------------------------- //
//
// animations will go through entire object by point

function planeXTransform (distance, scale, speed, state) {
	if (speed === undefined) { speed = 1 }
	if (state === undefined) { state = 0 }
	this.distance = distance;
	this.scale = scale;
	this.speed = speed;
	this.state = state;
}
/*planeXTransform.prototype.processPoint = function (frame, point, asset) {
	point[2] = Math.abs(frame.width/2 - point[0])/(frame.width/2)*this.distance;
	if (this.state < this.distance) { 
		this.state += 1*this.speed; 
	}
	return point;
}
*/

function planeWave (speed, width, depth) {
	this.state = 1;
	this.speed = speed;
	this.width = width;
	this.depth = depth;
}
planeWave.prototype.processPoint = function (frame, point, asset) {
	if (point[0] == this.state) {
		point[2] = point[2] + this.depth;
	} else if ((point[0 + 1] == this.state) || point[0 - 1] == this.state) {
		point[2] = point[2] + this.depth/2;
	}
	if (asset.width > this.state) {
		this.state += 1*this.speed;
	}
	else {
		this.state = 1;
	}
	return point;
}
planeWave.prototype.processGeo = function (asset) {
	var relState = this.state/asset.scale;
	var newGeo = [];
	for(var i = 0; i < asset.geo.length; i+=1) {
		var point = asset.geo[i];
		if (point[0] == relState) {
			point[2] = point[2] + this.depth;
		} else if ((point[0 + 1] == relState) || point[0 - 1] == relState) {
			point[2] = point[2] + this.depth/2;
		}
		newGeo[newGeo.length] = [point];
	}
	if (asset.width > relState) {
		this.state += 1*this.speed;
	}
	else {
		this.state = 1;
	}
	return newGeo;

}

// ------------------------------------------------------------------------ //
// 		SCENE ANIMATIONS
// ------------------------------------------------------------------------ //


function house_fly (speed, range, slave) {
	if (slave === undefined) {slave = false}
	this.speed = speed;
	this.range = range;
	this.slave = slave;
	this.direction = [1, 1, 1];
}
// Scene Animation requires (asset, frame)
house_fly.prototype.processPoint = function (asset, frame) {
	// FREE gravatate away from center and limits 
	if (this.slave == false) {
		for (var i = 0; i < asset.pos.length; i+=1){
			var dist = Math.abs(frame[i]/2 - asset.pos[i]);
				if (dist < (frame[i]/2)*Math.max(.4, Math.random())) {
					asset.pos[i] = asset.pos[i] + (Math.random()*this.speed)*this.direction[i];
				}
				else {
					this.direction[i] = this.direction[i]*(-1);
				}
		}
	// save position
	}
}