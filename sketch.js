

class Cell{
	constructor(i, j, s){
		this.i = i
		this.j = j

		this.s = s

		this.pos = {x: this.i * this.s, y: this.j * this.s}

		this.p1 = 1
		this.p2 = 1

	}

	draw(){
		// rectMode(CENTER)
		const showP1 = constrain(this.p1, 0, 255)
		fill(255-showP1, showP1, showP1)
		stroke(255-showP1, showP1, showP1)
		point(this.pos.x, this.pos.y)//, this.s, this.s)
		// rect(this.pos.x, this.pos.y, 1, 1)
	}
}

const gridSize = 100	
let cellSize = 0
let grid = []

const damping = 0.95

function setup(){
	createCanvas(100, 100)

	const newGrid = []
	cellSize = width / gridSize

	for(let i = 0; i < gridSize; i++){
		const newRow = []
		for(let j = 0; j < gridSize; j++){
			newRow.push(new Cell(i, j, cellSize))
		}
		newGrid.push(newRow)
	}

	grid = newGrid
}

function draw(){
	background(0)

	for(let i = 1; i < gridSize - 1; i++){
		for(let j = 1; j < gridSize - 1; j++){
			grid[i][j].p1 = ((
				grid[i-1][j].p2 +
				grid[i+1][j].p2 +
				grid[i][j+1].p2 +
				grid[i][j-1].p2
			) / 2) - grid[i][j].p1

			grid[i][j].p1 = damping * grid[i][j].p1
			if (Math.abs(grid[i][j].p1) < 0.000001)
				grid[i][j].p1 = 0
		}
	}

	for(let i = 0; i < gridSize; i++){
		for(let j = 0; j < gridSize; j++){
			grid[i][j].draw()
		}
	}

	for(let i = 0; i < gridSize; i++){
		for(let j = 0; j < gridSize; j++){
			const temp = grid[i][j].p1
			grid[i][j].p1 = grid[i][j].p2
			grid[i][j].p2 = temp
		}
	}

	// console.log(grid)

	// noLoop()

}

function getCellAt(x, y){
	return grid[x][y]
}

function mouseDragged(){
	mousePos = {
		x: (mouseX / cellSize) | 0,
		y: (mouseY / cellSize)| 0
	}
	if (mousePos.x >= 0 &&
		mousePos.x < width &&
		mousePos.y >= 0 &&
		mousePos.y < height){
		getCellAt(mousePos.x, mousePos.y).p1 = 100000
	}
}

function mousePressed(){
	mousePos = {
		x: (mouseX / cellSize) | 0,
		y: (mouseY / cellSize)| 0
	}
	if (mousePos.x >= 0 &&
		mousePos.x < width &&
		mousePos.y >= 0 &&
		mousePos.y < height){
		getCellAt(mousePos.x, mousePos.y).p1 = 100000
	}
}

