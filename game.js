import { Snake } from './snake.js';
import { Food } from './food.js';
import { Border } from './border.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Calcular el tamaño de la cuadrícula basado en el viewport
        this.calculateGrid();
        
        this.snake = new Snake(this.gridSize);
        this.food = new Food(this.gridSize, this.cols, this.rows);
        this.border = new Border(this.gridSize, this.cols, this.rows);
        this.gameOver = false;
        this.score = 0;

        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.calculateGrid();
            // Actualizar el tamaño de la cuadrícula en snake y food
            this.snake.updateGridSize(this.gridSize);
            this.food.updateGrid(this.gridSize, this.cols, this.rows);
        });
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    calculateGrid() {
        // Hacer que la cuadrícula sea proporcional al viewport
        // Queremos aproximadamente 30 columnas en el ancho
        this.cols = 30;
        this.gridSize = Math.floor(this.canvas.width / this.cols);
        this.rows = Math.floor(this.canvas.height / this.gridSize);
    }

    handleKeyPress(event) {
        const direction = event.key.replace('Arrow', '');
        if (['Up', 'Down', 'Left', 'Right'].includes(direction)) {
            this.snake.changeDirection(direction);
        }
    }

    update() {
        if (this.gameOver) return;

        this.snake.update();

        if (this.snake.eat(this.food)) {
            this.food.setRandomPosition();
            this.score += 10;
        }

        if (this.snake.checkCollision()) {
            this.gameOver = true;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw(this.ctx);
        this.food.draw(this.ctx);
        this.border.draw(this.ctx);
        

        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Puntuación: ${this.score}`, 10, 30);

        if (this.gameOver) {
            this.ctx.fillStyle = 'red';
            this.ctx.font = '40px Arial';
            this.ctx.fillText('¡Juego Terminado!', 80, 200);
        }
    }

    start() {
        const gameLoop = () => {
            this.update();
            this.draw();
            setTimeout(gameLoop, 100);
        }
        gameLoop();
    }
    
} 