let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let dpr = window.devicePixelRatio || 1;
let rect = c.getBoundingClientRect();

c.width = rect.width * dpr;
c.height = rect.height * dpr;
ctx.scale(dpr, dpr);

class Cell {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.neighbours = [];
        this.visited = false;
    }
    draw() {
        let gradient = ctx.createLinearGradient(0, 1500, c.width, 0);
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(1, 'black');
        ctx.fillStyle = gradient;
        ctx.strokeStyle = "green";
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x * this.s, this.y * this.s, this.s, this.s);
        ctx.fillRect(this.x * this.s, this.y * this.s, this.s, this.s);
    }
    visit(){
        ctx.fillStyle = "white";
        ctx.fillRect(this.x * this.s, this.y * this.s, this.s, this.s);
    }
    getNeighbours() {
        this.neighbours = [];

        for (let cell of cells) {
            if ((cell.x > 0 || cell.x < ROWS ) && (cell.y > 0 || cell.y < ROWS)) {
                if (
                    ((cell.x === this.x + 1 && cell.y === this.y) ||
                        (cell.x === this.x - 1 && cell.y === this.y) ||
                        (cell.x === this.x && cell.y === this.y + 1) ||
                        (cell.x === this.x && cell.y === this.y - 1))
                )
                {
                    this.neighbours.push(cell);
                }
            }
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, 50));
}

async function generate(cells, current) {
    // SETUP FOR THE QUEUE AND INITIALIZE THE FIRST CELL AS VISITED
    let queue = [];
    let currentCell = cells[current];
    currentCell.visited = true;
    currentCell.visit();
    queue.push(currentCell);

    while (queue.length > 0) {
        // TAKE THE INITIAL CELL AND GET ITS NEIGHBOURS THAT HAVEN'T BEEN VISITED YET!
        let cell = queue[0];
        cell.getNeighbours();
        queue.shift()
        let cellNeighbours = cell.neighbours.filter(cell => !cell.visited);

        // IF IT HAS UNVISITED NEIGHBOURS, PUSH THEM TO THE END OF THE QUEUE
        if (cellNeighbours.length > 0) {
            queue.push(cell);

            // RANDOMLY PICK ONE OF THE NEIGHBOURS
            let nextCell = cellNeighbours[0];

            // GO TO THE FIRST NEIGHBOUR AND PUSH IT TO THE QUEUE
            nextCell.visited = true;
            nextCell.visit();
            queue.push(nextCell);
        }

        await delay(100);
    }
}



const SIZE = 40
const ROWS = 48
const COLS = 24


let cells = [];
for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
        cells.push(new Cell(i, j,SIZE));
    }
}

for (let cell of cells) {
    cell.draw();
}

generate(cells,0);
