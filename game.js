// Canvas Demo

console.log('*** DEMO START ***');
var c = document.getElementById('canvas');
//console.log(c); // Prints out element from the screen
var canvas = c.getContext('2d');
console.log(canvas);

// Variables
var timer; // Game timer
var FPS = 24/1000; // FPS = 60
var C_HEIGHT = 400, C_WIDTH = 400; // Dimensions of canvas
var ONSCREEN = []; // Array to hold all drawable and moveable elements on screen

function Ball(x, y, rad, color) {

	// Makes Global Variables
	this.x = x;
	this.y = y;
	this.rad = rad;

	// Makes private Variable (Can't be changed but can be deleted altogether)
	var color = color;
	var MAXSPEED = 3;
	var xspeed = Math.floor(Math.random()*MAXSPEED+1);
	var yspeed = Math.floor(Math.random()*MAXSPEED+1);

	// Accessors for private variables
	// These can be changed and deleted, modifying the closure
	// which provides access to the 'color' variable
	this.setColor = function(newColor) {
		color = newColor;
	}
	this.getColor = function() {
		return color;
	}

	this.draw = function() {

		// Fill
		canvas.fillStyle = color;
		canvas.beginPath();
		canvas.arc(this.x, this.y, this.rad, -0.5*Math.PI, 1.5*Math.PI, true);
		canvas.fill();

		// Outline
		canvas.strokeStyle = '#000';
		canvas.beginPath();
		canvas.arc(this.x, this.y, this.rad, -0.5*Math.PI, 1.5*Math.PI, true);
		canvas.stroke();
	}

	this.move = function() {

		// Move the ball
		this.x += xspeed;
		this.y += yspeed;
		if (this.x + rad > C_WIDTH || this.x - rad < 0)
			xspeed = -xspeed;
		if (this.y + rad > C_HEIGHT || this.y - rad < 0)
			yspeed = -yspeed;
	}
}



function clearScreen() {

	canvas.clearRect(0,0,C_WIDTH,C_HEIGHT);
}

function gameLoop() {

	clearScreen();
	for (var i = ONSCREEN.length - 1; i >= 0; i--) {
		ONSCREEN[i].move();
		ONSCREEN[i].draw();
	};

	timer = setTimeout(gameLoop, FPS);
}

function pause() {

	clearTimeout(timer);
}

// Start It all Running
var b = new Ball(50,50,20,'#3fa9ab');
ONSCREEN.push(b);
timer = setTimeout(gameLoop, FPS);