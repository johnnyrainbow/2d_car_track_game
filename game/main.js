var population
var lifespan = 600
var visualLifespan
var count = 0
var target
var maxForce = 0.3
var deadCars = []
//our boundary array of points [x,y], represents the track outline
const boundary = [[0, 50], [150, 52], [350, 120], [500, 40], [800, 300], [1000, 220], [1200, 350], [1650, 250], [1800, 300]]
const boundaryBottomOffset = 200

function setup() {
    createCanvas(2000, 1000)

    population = new Population()
    visualLifespan = createP()
    target = createVector(width, boundary[boundary.length - 1][1] + boundaryBottomOffset / 2)
    track = new Track(boundary)
}

function draw() {
    background(42, 49, 57)
    track.draw()
    population.run()
    visualLifespan.html(count)
    count++
    checkLifespanOver()
    ellipse(target.x, target.y, 16, 16)
}
function checkLifespanOver() {
    if (deadCars.length == population.populationSize) {
        population.evaluate()
        population.selection()
        count = 0
        deadCars = []
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
