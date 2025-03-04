export class Border {
    
        constructor(gridSize, cols, rows) {
            this.size = gridSize;
            this.cols = cols;
            this.rows = rows;
        }
    
        draw(ctx) {
            ctx.fillStyle = 'black';
            
            // Dibujar borde superior
            ctx.fillRect(0, 0, this.cols * this.size, this.size);
            
            // Dibujar borde inferior
            ctx.fillRect(0, (this.rows - 1) * this.size, this.cols * this.size, this.size);
            
            // Dibujar borde izquierdo
            ctx.fillRect(0, 0, this.size, this.rows * this.size);
            
            // Dibujar borde derecho
            ctx.fillRect((this.cols - 1) * this.size, 0, this.size, this.rows * this.size);
        }
    }
    

