

$(document).ready(onReady)

$(window).resize(resize)
window.onorientationchange = resize;
var count = 0;
var pressing = false;

var width = 800;
var height = 600;

var wabbitTexture;
var pirateTexture;

var blorxs = [];
var gravity = 0.5//1.5 ;
var blorx = false;
var flag = false;

var maxX = width;
var minX = 0;
var maxY = height;
var minY = 0;

var blorxCount = 0;
var isAdding = false;
var count = 0;
var container = false;

var blorxTextures = [];
var amount = 1;

var Norman = function() {
};

function onReady()
{
	
	renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor:0xFFFFFF});
	stage = new PIXI.Stage(0xFFFFFF);
	//stage.filterArea = new PIXI.math.Rectangle(0, 0, 800 ,600);

	amount = (renderer instanceof PIXI.WebGLRenderer) ? 100 : 5;
//	
//	bloom = new PIXI.filters.BloomFilter();
	//stage.filters = [bloom];

	if(amount == 5)
	{
		renderer.context.mozImageSmoothingEnabled = false
		renderer.context.webkitImageSmoothingEnabled = false;
		
	}
	
	renderer.view.style["transform"] = "translatez(0)";
	//alert(amount)
	document.body.appendChild(renderer.view);
	renderer.view.style.position = "absolute";
	
	
	requestAnimationFrame(update);
	
	container = new PIXI.DisplayObjectContainer();
	stage.addChild(container);
	
	$(renderer.view).mousedown(function(){
	});
		$(renderer.view).keydown(keydown);	

		$(renderer.view).keyup(keyup);	
	$(renderer.view).mouseup(function(){
	});
		
	document.addEventListener("touchstart", onTouchStart, true);
	document.addEventListener("touchend", onTouchEnd, true);
	window.addEventListener('keyup', keyup, true);
	window.addEventListener('keydown',  keydown, true);	
	
	resize();
}

function keydown(event) {
	switch (event.keyCode) {
		case 32:
			blorx.punch();
		break;
		case 65:
			blorx.normDir = -1;
			blorx.moving = 1;
		break;
		case 68:
			blorx.normDir = 1;
			blorx.moving = 1;
		break;
	}
}

function keyup(event) {
	switch (event.keyCode) {
		case 32:
			blorx.texture = (blorx.textures[0]);
			blorx.punching = false;
		break;
		case 65:
			blorx.moving = 0;
		break;
		case 68:
			blorx.moving = 0;
		break;
	}
}

function onTouchStart(event)
{
	blorx.punch();
}


function onTouchEnd(event)
{
	blorx.punching = false;
	blorx.setTexture(blorx.textures[0]);
}

function resize()
{

	var width = $(window).width(); 
	var height = $(window).height(); 
	
	if(width > 800)width  = 1240;
	if(height > 600)height = 720;
	
	maxX = width;
	minX = 0;
	maxY = height;
	minY = 0;
	
	var w = $(window).width() / 2 - width/2;
	var h = $(window).height() / 2 - height/2;
	
	renderer.view.style.left = $(window).width() / 2 - width/2 + "px"
	renderer.view.style.top = $(window).height() / 2 - height/2 + "px"
	
	
	
	
	
	renderer.resize(width, height);
}

function update()
{
	if (container != false && blorxCount < 1) {
		norDirection = 1;
		var textures = [] ;
		for (i = 0; i < 3; i++) {
			var text = new PIXI.Texture.fromImage("/img/blorx0" + i + ".png")
			textures.push(text);
		}
		blorx = new PIXI.Sprite(textures[0]);
		blorx.direction = 0;
		blorx.textures = textures;
		blorx.punch = function() {	
			blorx.punching = true;
			if (blorx.normDir == -1) {
				blorx.texture = blorx.textures[1];
			} else {
				blorx.texture = blorx.textures[2];
			}
		}
		blorx.position.x = 80;
		blorx.position.y = maxY - blorx.height;
		blorx.speedX = 4;
		blorx.speedY = (Math.random() * 10) - 5;
		blorx.anchor.x = 0.5;
		blorx.anchor.y = 1;
		blorx.normDir = 1;
		blorx.rotationDir = 1;
		blorx.extra = function() {
			if (Math.abs(blorx.rotation) > .08) {
				this.rotationDir *= -1;
			}
		};
		blorxs.push(blorx);

		flag_texture = PIXI.Texture.fromImage("/img/flag.png");
		flag = new PIXI.Sprite(flag_texture);
		flag.position.x = parseInt(Math.random()*width);
		flag.position.y = maxY - blorx.height;
		flag.anchor.x = 0.5;
		flag.speedY = 0;
		flag.anchor.y = 1;
		flag.normDir = 0;
		flag.rotationDir = 0;
		flag.textures = textures;
		flag.extra = function() {
			if (blor.position.x-blor.width/2-50 <= minX || blor.position.x+blorx.width >= maxX-10 ) {
				blor.speedX *= 1.99;	
				blor.normDir *= -1;
				blor.position.x += blor.speedX;
				blor.rotationDir = blor.NormDir;
				blor.moving = true;
			}
			if (blor.speedX < .05) {
				blor.speedX = 0;
				blor.moving = false;
			} else {
				blor.speedX *= .91;
			}
		};
		
		container.addChild(flag);
		container.addChild(blorx);
		
		blorxCount++;	
		blorxs.push(flag);
	}
	
	if (blorx.punching && Math.abs(blorx.position.x - flag.position.x) < 40) {
		dir = blorx.position.x+40 > flag.position.x+25 ? -1 : 1;
		if (dir == blorx.normDir) {
			flag.moving = 1;
			flag.speedX = 15 + Math.random()*20;
			flag.normDir = dir;
			flag.speedY += 1 + Math.random()*6;
			flag.rotationDir = dir;
		}
		
	}
	for (i in blorxs) {	
		var blor = blorxs[i];
		if (blor.moving) {
			blor.position.x += blor.normDir*blor.speedX;
		}
		blor.position.y += blor.speedY;
		blor.speedY += gravity;
		blor.extra();	
		if (blor.moving ) {
			if(Math.abs(blorx.rotation) <= .25 || Math.abs(blorx.rotation) >= .75){
				blor.rotation += blor.rotationDir*.01 % 6.2;
			} else {
				blor.rotation -= blor.rotationDir*.01 % 6.2;
			}
		}
		if (blor.position.x+blorx.width > maxX)
		{
			blor.position.x = maxX-blorx.width;
		}
		else if (blor.position.x-blor.width/2 < minX)
		{
			blor.position.x = minX+blor.width/2+30;
		}
		
		if (blor.position.y > maxY)
		{
			if (blor.y > maxY + gravity +2) {
				blor.speedY *= -0.85;
			}
			blor.position.y = maxY;
			blor.spin = (Math.random()-0.5) * 0.2
			if (Math.random() > 0.5)
			{
				blor.speedY -= Math.random() * 1;
			}
		} 
		else if (blor.position.y < minY)
		{
			blor.speedY = 0;
			blor.position.y = minY;
		}
		
	}
	count++;
	renderer.render(stage);
	requestAnimationFrame(update);
}
