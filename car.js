class Car {
    constructor(x, y, v) {
        this.origin_x = x
        this.origin_y = y
        this.x = x
        this.y = y
        this.width = 50
        this.height =20
        this.const_veloz = v
    }

    checkCollision() {
        for (var i = 0; i < boundary.length - 1; i++) {
            //check which boundaries we are between    
            if (this.x + this.width < boundary[i][0] || this.x + this.width > boundary[i + 1][0]) continue
            //calc gradient
            var m = (boundary[i][1] - boundary[i + 1][1]) / (boundary[i][0] - boundary[i + 1][0])
            //get the top boundary xy line at our current x position
            var bound_Y = (this.x + this.width - boundary[i][0]) * m

            var top_line_y = bound_Y + boundary[i][1]
            var bottom_line_y = bound_Y + boundary[i][1] + boundaryBottomOffset

            //now that we have the line y at our point x, we can see if we are colliding
            if (this.y <= top_line_y || this.y + this.height >= bottom_line_y) {
                this.resetCar()
            }
            return //no need to process other bounds
        }
    }

    resetCar() {
        this.x = this.origin_x
        this.y = this.origin_y
    }

    checkWin() {
        if (this.x + this.width >= boundary[boundary.length - 1][0]) {
            this.notifyWin()
            this.resetCar()
        }
    }
    notifyWin() {
        console.log("you win, tell the neural net")
    }
    drawCar() {
        fill(255, 0, 0)
        rect(this.x, this.y, this.width, this.height)
    }

    move(dirX, dirY) {
        //value validation, minmax 1,-1
        if (dirX > 1) dirX = 1
        if (dirY > 1) dirY = 1
        if (dirX < -1) dirX = -1
        if (dirY < -1) dirY = -1

        this.x += dirX * this.const_veloz
        this.y += dirY * this.const_veloz
        this.checkCollision()
        this.checkWin()
    }
}