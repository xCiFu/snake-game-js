export class Food {
    
    constructor(gridSize, cols, rows) {
        this.updateGrid(gridSize, cols, rows);
        this.setRandomPosition();
        this.foodImage = new Image();
        this.foodImage.src = 'resources/apple.png';
        console.log(this.x, this.y);
    }

    updateGrid(gridSize, cols, rows) {
        this.size = gridSize;
        this.cols = cols;
        this.rows = rows;
    }

    setRandomPosition() {
        this.x = Math.floor(Math.random() * this.cols) * this.size;
        this.y = Math.floor(Math.random() * this.rows) * this.size;
    }

    draw(ctx) {
  
        ctx.drawImage(this.foodImage, this.x, this.y, this.size, this.size);
    }
} 