class Car {
    constructor(dna, number) {
        dna ? this.dna = dna : this.dna = new Dna()
        this.num = number
        this.height = 2
        this.width = 5
        this.dead = false
        this.pos = createVector(0, boundary[0][1] + boundaryBottomOffset / 3, 5)
        this.vel = createVector()
        this.acc = createVector()

        this.fitness = 0
    }
    applyForce(force) {
        this.acc.add(force)
    }
    killCar() {
        this.dead = true
        deadCars.push(this)
    }
    checkCollision() {
        for (var i = 0; i < boundary.length - 1; i++) {
            //check which boundaries we are between    
            if (this.pos.x + this.width < boundary[i][0] || this.pos.x + this.width > boundary[i + 1][0]) continue
            //calc gradient
            var m = (boundary[i][1] - boundary[i + 1][1]) / (boundary[i][0] - boundary[i + 1][0])
            //get the top boundary xy line at our current x position
            var bound_Y = (this.pos.x + this.width - boundary[i][0]) * m

            var top_line_y = bound_Y + boundary[i][1]
            var bottom_line_y = bound_Y + boundary[i][1] + boundaryBottomOffset

            //now that we have the line y at our point x, we can see if we are colliding
            if (this.pos.y <= top_line_y || this.pos.y + this.height >= bottom_line_y || this.pos.x < 0) {
                this.killCar()
            }
            return //no need to process other bounds
        }
    }
    calculateFitness() {
        var distance = dist(this.pos.x, this.pos.y, target.x, target.y)

        this.fitness = map(distance, 0, width, width, 0)
    }
    checkWin() {
        if (this.pos.x >= boundary[boundary.length - 1][0]) {
           this.killCar()
        }
    }
    update() {
        this.checkCollision()
        this.checkWin()
        this.applyForce(this.dna.genes[count])
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }
    capVeloz(v) {
        if (v > maxVeloz) {
            return maxVeloz
        }
        return v
    }
    show() {
        push()
        noStroke()
        fill(255, 150)
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())
        rectMode(CENTER)
        ellipse(0, 0, this.width, this.height)
        pop()
        stroke(255)
        textSize(20)
        fill(255)
        //text(this.num, this.pos.x + 10, this.pos.y)
    }
}
