var arrayOfObstacles = [];
function obstaclesGenerator(ctx, countOfObstacles, minWidth, maxWidth){

	for(var i = 0; i < arrayOfObstacles.length; i ++){
		createObstacle(ctx, arrayOfObstacles[i].x, arrayOfObstacles[i].y,
		arrayOfObstacles[i].size, arrayOfObstacles[i].downOrRight);
	}
}
function createObstacle(ctx, x, y, size, downOrRight){

	ctx.beginPath();
	if(downOrRight){

		ctx.rect(x, y, size, pacman.radius* 2);
	}
	else{

		ctx.rect(x, y, pacman.radius* 2, size);		
	}
	ctx.fillStyle = "gray";
	ctx.fill();
	ctx.stroke();	
}
function fillArrayOfObstacles(countOfObstacles, numberOfsize){
	var x, y, size, downOrRight;
	for (var i = 0; i < countOfObstacles; i ++) {
		x = Math.round(Math.random() * 22) * 20 + 10;
		y = Math.round(Math.random() * 22) * 20 + 10;
		size = pacman.radius* 2 * Math.ceil(Math.random() * numberOfsize);
		downOrRight = Math.round(Math.random());
		if(checkSpacesBetweenObstacles(x, y, size, downOrRight, "Obstacles")){

			arrayOfObstacles[i] = {
				x: x,
				y: y,
				size: size,
				downOrRight: downOrRight
			}
		}
		else {
			i --;
		}
	}
	return arrayOfObstacles;
}
function checkSpacesBetweenObstacles(x, y, size, downOrRight, pacmanOrObstacles){

	var xSize, ySize, newXSize, newYSize, correct = true;

	if (downOrRight){			
			newXSize = size;
			newYSize = pacman.radius * 2;
		}
		else {
			newXSize = pacman.radius * 2;
			newYSize = size;
		}	

	for (var i = 0; i < arrayOfObstacles.length; i ++) {

		if (arrayOfObstacles[i].downOrRight){			
			xSize = arrayOfObstacles[i].size;
			ySize = pacman.radius * 2;
		}
		else {		
			xSize = pacman.radius * 2;
			ySize = arrayOfObstacles[i].size;
		}	

		if(pacmanOrObstacles == "pacman"){
			pacman.diametr = 0;
		}

		if ( 
			( x > arrayOfObstacles[i].x - pacman.diametr && x < arrayOfObstacles[i].x + xSize + pacman.diametr && 
			y > arrayOfObstacles[i].y - pacman.diametr && y < arrayOfObstacles[i].y + ySize + pacman.diametr) ||
			(x + newXSize > arrayOfObstacles[i].x - pacman.diametr && 
				 x + newXSize < arrayOfObstacles[i].x + xSize + pacman.diametr && 
				y + newYSize > arrayOfObstacles[i].y - pacman.diametr &&
				 y + newYSize < arrayOfObstacles[i].y + ySize + pacman.diametr)||
			(x > arrayOfObstacles[i].x - pacman.diametr && 
				 x < arrayOfObstacles[i].x + xSize + pacman.diametr && 
				y + newYSize > arrayOfObstacles[i].y - pacman.diametr &&
				 y + newYSize < arrayOfObstacles[i].y + ySize + pacman.diametr)||			

			(x + newXSize > arrayOfObstacles[i].x - pacman.diametr && 
				 x + newXSize < arrayOfObstacles[i].x + xSize + pacman.diametr && 
				y > arrayOfObstacles[i].y - pacman.diametr &&
				 y < arrayOfObstacles[i].y + ySize + pacman.diametr)
			)
		{
			correct = false;
			break;
		}
	}
	pacman.diametr = pacman.radius * 2;
	return correct;
}
//Funciton below for testing Obstacles 
/*function testCheckSpacesBetweenObstacles(ctx){

	for(var i = 0 ; i < 1; i ++){

		var xSize, ySize, newXSize, newYSize, correct = true, numberOfsize = 1, thisX, thisY, thisSize, thisDownOrRight;
		console.log("testCheckSpacesBetweenObstacles");
		x = Math.round(Math.random() * 11) * 40 + 10;
		y = Math.round(Math.random() * 11) * 40 + 10;
		size = pacman.radius * 2 * Math.ceil(Math.random() * numberOfsize);
		downOrRight = Math.round(Math.random());
		x = 100; y = 100; size = 40; downOrRight = 1;

		arrayOfObstacles = [{
			x: x,
			y: y,
			size: size,
			downOrRight: downOrRight
		}];
		createObstacle(ctx, arrayOfObstacles[0].x, arrayOfObstacles[0].y,
				arrayOfObstacles[0].size, arrayOfObstacles[0].downOrRight);
		thisX = 60;
		thisY = 140;
		thisSize = 80;
		thisDownOrRight = 1;
		createObstacle(ctx, thisX, thisY, thisSize, thisDownOrRight);
		console.log("correct: ", checkSpacesBetweenObstacles(thisX, thisY, thisSize, thisDownOrRight));
	}
}*/
function checkStartPositionPacman(){
	for(var i = 0; i < arrayOfObstacles.length; i ++){

		if(checkSpacesBetweenObstacles(packmanCenter.x - pacman.radius, packmanCenter.y - pacman.radius, pacman.radius, 0, "pacman") == false){
			packmanCenter.x -= pacman.radius;
		}
	}
}
function readWriteData(){

	var CountOfObstacles = document.getElementById('CountObstacles').value;
	var maxSize = document.getElementById('maxSize').value;
	console.log(CountOfObstacles, maxSize);
	arrayOfObstacles = fillArrayOfObstacles(CountOfObstacles, maxSize);
	checkStartPositionPacman();
	setInterval(function () {		
	    clearContext();
	    drawPackman(packmanCenter, packmanDirect);
	}, 50) ;	
}