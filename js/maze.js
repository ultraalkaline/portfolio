mazeCanvas/*
    *  A maze generator based on the recursive backtracking algorithm
    *  (https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker)
    *  with the ability to change the framerate by holding up arrow
    *  (increase up to 120 fps) or holding down arrow (decreasing down to 0
    *  fps).
*/
var mazeCanvas;
var framerate = 40;

var scl = 20;
var cols, rows;

var grid = [];
var stack = [];

var current;

var mazeWidth = 125;
var mazeHeight = 125;

var strokeweight = 3;

function setup() {
    mazeCanvas = createCanvas(mazeWidth, mazeHeight);
    mazeCanvas.id('mazeCanvas');
    frameRate(framerate);

    cols = floor(width / scl);
    rows = floor(height / scl);

    initMaze();

    $("#mazeCanvas").click(function() {
        initMaze();
    });
}

function draw() {
    colorMode(RGB, 255);
    background(33, 37, 43, 100);

    // make sure the whole left and upper walls are visible relative to the strokeWeight.
    translate(strokeweight, strokeweight);

    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    // STEP 1 PART 2
    current.visited = true;
    current.highlight();
    // STEP 2.1
    var next = current.checkNeighbors();
    if (next) {
        // STEP 2.1.4 PART 1
        next.visited = true;
        // STEP 2.1.2
        stack.push(current);
        // STEP 2.1.3
        removeWalls(current, next);
        // STEP 2.1.4 PART 2
        current = next;
    } else if (stack.length > 0) {
        var cell = stack.pop();
        current = cell;
    }
}

function initMaze() {
    grid = [];
    for (var row = 0; row < rows; row++) {
       for (var col = 0; col < cols; col++) {
            var cell = new Cell(row, col);
            cell.setColorRGBA(20, 231, 66, 255);
            grid.push(cell);
       }
    }
    // STEP 1 PART 1
    current = grid[0];
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

function removeWalls(a, b) {
    // right or left neighbor(s).
    var x = a.col - b.col;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }

    // top or bottom neighbor(s).
    var y = a.row - b.row;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }

    // starting cell.
    if (a.col == 0 && a.row == 0) {
        a.walls[3] = false;
    }
    // ending cell.
    if (b.col == cols - 1 && b.row == rows - 1) {
        b.walls[1] = false;
    }
}

function Cell(col, row, color) {
    this.col = col;
    this.row = row;
    if (color != undefined)
        this.color = color;
    else
        this.color = [255, 255, 255];

    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function() {
        var neighbors = [];

        // top neighbor.
        var top     = grid[index(row    , col - 1)];
        // right neighbor.
        var right   = grid[index(row + 1, col    )];
        // bottom neighbor.
        var bottom  = grid[index(row    , col + 1)];
        // left neighbor.
        var left    = grid[index(row - 1, col    )];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }

        if (neighbors.length > 0) {
            // STEP 2.1.1
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.show = function() {
        var x = this.col * scl;
        var y = this.row * scl;
        if (this.color[3] != undefined) {
            stroke(this.color[0], this.color[1], this.color[2], this.color[3]);
        } else {
            stroke(this.color[0], this.color[1], this.color[2], 255);
        }
        strokeWeight(strokeweight);

        if (this.walls[0]) {
            // top left -> top right
            beginShape();
            vertex(x + 0.5, y     );
            vertex(x + scl, y     );
            endShape();
        }
        if (this.walls[1]) {
            // top right -> bottom right
            beginShape(LINES);
            vertex(x + scl, y      );
            vertex(x + scl, y + scl);
            endShape();
        }
        if (this.walls[2]) {
            // bottom right -> bottom left
            beginShape(LINES);
            vertex(x + scl, y + scl);
            vertex(x      , y + scl);
            endShape();
        }
        if (this.walls[3]) {
            // bottom left -> top left
            beginShape(LINES);
            vertex(x      , y + scl);
            vertex(x      , y      );
            endShape();
        }

        if (this.visited) {
            stroke(255, 0);
            noFill()
            rect(x, y, scl, scl);
        }
    }

    this.highlight = function() {
        var x = this.col * scl;
        var y = this.row * scl;
        noStroke();
        noFill();
        rect(x, y, scl, scl);
    }

    this.setColorRGB = function(r, g, b) {
        this.color = [r, g, b];
    }

    this.setColorRGBA = function(r, g, b, a) {
        this.color = [r, g, b, a];
    }
}
