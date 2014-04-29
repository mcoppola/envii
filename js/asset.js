
// -------------- ASSETS ----------------------------------------------- //
//
// Objects of Scene
function Asset (id, x, y, z, geometry, scale) {
	if (geometry === undefined) { geometry = []; }
	if (x === undefined) { x = 0; }
	if (y === undefined) { y = 0; }
	if (z === undefined) { z = 0; }  
	if (scale === undefined) { scale = 1; }
	this.id = id;
	this.geo = geometry;  //array of geometric coordinates and character value
	this.xpos = x;
	this.ypos = y;
	this.zpos = z;
	this.pos = [this.xpos, this.ypos, this.zpos];
	this.scale = scale;
	this.modelAttributes = [];	
	this.sceneAttributes = [];
	this.width = undefined;  // for img Grid objects
	this.height = undefined;
}

Asset.prototype.draw = function (envi) {
	this.doSceneAnimation(envi.frame);
	var point = [];
	for (i = 0; i < this.geo.length; i+=1) {
		point = this.setModelScale(this.geo[i]);
		point = envi.doModelAnimation(point, this);
		point = this.moveToScenePos(point);
		var xy = envi.pointTo3D(point);
		var charWithFont = [point[3], envi.charToSize(point[2])];
		envi.canvas.ctx.font = charWithFont[1];
		envi.canvas.ctx.fillStyle = this.geo[i][4]; 
		// TODO: make option for stroke or fill text
		envi.canvas.ctx.fillText(charWithFont[0], xy[0], xy[1]);
	}
}
Asset.prototype.setModelScale = function (point) {
	return [point[0]*this.scale, point[1]*this.scale, point[2]*this.scale, point[3]];
}
Asset.prototype.moveToScenePos = function (point) {
	return [this.pos[0] + point[0], this.pos[1] + point[1], this.pos[2] + point[2], point[3], point[4]];
}
Asset.prototype.doSceneAnimation = function (frame) {
	for (var i = 0; i < this.sceneAttributes.length; i+=1) {
		this.sceneAttributes[i].processPoint(this, frame);
	}
}