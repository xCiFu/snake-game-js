export class Snake {
    constructor(gridSize) {
        this.updateGridSize(gridSize);
        this.reset();
        this.loadImages();
    }

    updateGridSize(gridSize) {
        this.size = gridSize;
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = this.size;
        this.ySpeed = 0;
        this.tail = [];
        this.total = 0;
    }

    update() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        if (this.total >= 1) {
            this.tail[this.total - 1] = { x: this.x, y: this.y };
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        const canvas = document.getElementById('gameCanvas');
        if (this.x >= canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width - this.size;
        if (this.y >= canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height - this.size;
    }

    loadImages() {
        this.images = {
            head_up: new Image(),
            head_down: new Image(),
            head_left: new Image(),
            head_right: new Image(),
            body_vertical: new Image(),
            body_horizontal: new Image(),
            body_bottomleft: new Image(),
            body_bottomright: new Image(),
            body_topleft: new Image(),
            body_topright: new Image(),
            tail_up: new Image(),
            tail_down: new Image(),
            tail_left: new Image(),
            tail_right: new Image(),
        };

        // Cargar todas las imágenes
        this.images.head_up.src = 'resources/head_up.png';
        this.images.head_down.src = 'resources/head_down.png';
        this.images.head_left.src = 'resources/head_left.png';
        this.images.head_right.src = 'resources/head_right.png';
        this.images.body_vertical.src = 'resources/body_vertical.png';
        this.images.body_horizontal.src = 'resources/body_horizontal.png';
        this.images.body_bottomleft.src = 'resources/body_bottomleft.png';
        this.images.body_bottomright.src = 'resources/body_bottomright.png';
        this.images.body_topleft.src = 'resources/body_topleft.png';
        this.images.body_topright.src = 'resources/body_topright.png';
        this.images.tail_up.src = 'resources/tail_up.png';
        this.images.tail_down.src = 'resources/tail_down.png';
        this.images.tail_left.src = 'resources/tail_left.png';
        this.images.tail_right.src = 'resources/tail_right.png';
    }

    draw(ctx) {
        // Dibujar el cuerpo
        for (let i = 0; i < this.tail.length; i++) {
            let currentPiece = this.tail[i];
            let nextPiece = i + 1 < this.tail.length ? this.tail[i + 1] : { x: this.x, y: this.y };
            let prevPiece = i - 1 >= 0 ? this.tail[i - 1] : null;
            
            let image;
            
            if (i === 0) { // Cola
                if (nextPiece.x < currentPiece.x) image = this.images.tail_right;
                else if (nextPiece.x > currentPiece.x) image = this.images.tail_left;
                else if (nextPiece.y < currentPiece.y) image = this.images.tail_down;
                else image = this.images.tail_up;
            } else { // Cuerpo
                if (currentPiece.x === nextPiece.x) {
                    image = this.images.body_vertical;
                } else if (currentPiece.y === nextPiece.y) {
                    image = this.images.body_horizontal;
                } else {
                    // Curvas
                    if (nextPiece.x > currentPiece.x && prevPiece.y < currentPiece.y ||
                        nextPiece.y > currentPiece.y && prevPiece.x < currentPiece.x) {
                        image = this.images.body_bottomleft;
                    } else if (nextPiece.x < currentPiece.x && prevPiece.y < currentPiece.y ||
                             nextPiece.y > currentPiece.y && prevPiece.x > currentPiece.x) {
                        image = this.images.body_bottomright;
                    } else if (nextPiece.x > currentPiece.x && prevPiece.y > currentPiece.y ||
                             nextPiece.y < currentPiece.y && prevPiece.x < currentPiece.x) {
                        image = this.images.body_topleft;
                    } else {
                        image = this.images.body_topright;
                    }
                }
            }
            
            ctx.drawImage(image, currentPiece.x, currentPiece.y, this.size, this.size);
        }

        // Dibujar la cabeza
        let headImage;
        if (this.xSpeed > 0) headImage = this.images.head_right;
        else if (this.xSpeed < 0) headImage = this.images.head_left;
        else if (this.ySpeed < 0) headImage = this.images.head_up;
        else headImage = this.images.head_down;

        ctx.drawImage(headImage, this.x, this.y, this.size, this.size);
    }

    changeDirection(direction) {
        switch(direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -this.size;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = this.size;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -this.size;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = this.size;
                    this.ySpeed = 0;
                }
                break;
        }
    }

    eat(food) {
        if (this.x < food.x + food.size &&
            this.x + this.size > food.x &&
            this.y < food.y + food.size &&
            this.y + this.size > food.y) {
            this.total++;
            return true;
        }
        return false;
    }

    checkCollision() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                return true;
            }
        }
        return false;
    }
} 