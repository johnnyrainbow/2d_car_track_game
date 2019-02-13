class Car {
    constructor(dna, number) {
        dna ? this.dna = dna : this.dna = new Dna()
        this.number = number
        this.x = boundary[0][0]
        this.y = boundary[0][1] + boundaryBottomOffset / 3, 5
        this.origin_x = this.x
        this.origin_y = this.y
        this.dead = false
        this.width = 20
        this.height = 20
        this.const_veloz = 5
        this.fitness = 0
        this.acc = 0
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
                this.killCar()
            }
            return //no need to process other bounds
        }
    }
    killCar() {
        deadCars.push(this)
        this.dead = true
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
    draw() {
        fill(255, 0, 0)
        rect(this.x, this.y, this.width, this.height)
        fill(0)
        textSize(15)
       text("Car " + this.number ,this.x,this.y)
    }

    update() {
        //value validation, minmax 1,-1
        this.x += this.const_veloz
        this.y += this.dna.genes[count - 1][0]  //take movement from genes
        this.checkCollision()
        this.checkWin()
    }
    calculateFitness() {
        var distance = dist(this.x, this.y, track.finishX, track.finishY)
        this.fitness = 1 / distance
    }
}