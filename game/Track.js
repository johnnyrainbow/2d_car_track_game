class Track {
    constructor(boundaryTop) {
        this.boundaryTop = boundaryTop //array of points for boundary, x,y
        this.end = this.boundaryTop[this.boundaryTop.length - 1]
        this.finishX = this.end[0]
        this.finishY = this.end[1] + boundaryBottomOffset / 2
    }

    draw() {
        for (var i = 0; i < this.boundaryTop.length - 1; i++) { //draw top boundary with regular bound points, bottom boundary subtracts bottomOffset on y coord
            line(this.boundaryTop[i][0], this.boundaryTop[i][1], this.boundaryTop[i + 1][0], this.boundaryTop[i + 1][1])
            line(this.boundaryTop[i][0], this.boundaryTop[i][1] + boundaryBottomOffset, this.boundaryTop[i + 1][0], this.boundaryTop[i + 1][1] + boundaryBottomOffset)
        }
        //draw the finish line to mark the end of the course
        var end = this.boundaryTop[this.boundaryTop.length - 1]
        line(end[0], end[1], end[0], end[1] + boundaryBottomOffset)

    }
}