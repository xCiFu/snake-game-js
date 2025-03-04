export class Border {
    
        constructor(gridSize, cols, rows) {
            this.size = gridSize;
            this.cols = cols;
            this.rows = rows;
            this.wallImage = new Image();
            this.imageLoaded = false;
            this.wallImage.onload = () => {
                this.imageLoaded = true;
            };
            this.wallImage.src = 'resources/wall.png';
        }
    
        draw(ctx) {
            if (!this.imageLoaded) return;
            
            // Dibujar borde superior
            for (let x = 0; x < this.cols; x++) {
                ctx.drawImage(this.wallImage, x * this.size, 0, this.size, this.size);
            }
            
            // Dibujar borde inferior
            for (let x = 0; x < this.cols; x++) {
                ctx.drawImage(this.wallImage, x * this.size, (this.rows - 1) * this.size, this.size, this.size);
            }
            
            // Dibujar borde izquierdo
            for (let y = 0; y < this.rows; y++) {
                ctx.drawImage(this.wallImage, 0, y * this.size, this.size, this.size);
            }
            
            // Dibujar borde derecho
            for (let y = 0; y < this.rows; y++) {
                ctx.drawImage(this.wallImage, (this.cols - 1) * this.size, y * this.size, this.size, this.size);
            }
        }
    }
    

