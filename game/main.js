var population
var lifespan = 2000
var visualLifespan
var count = 0
var target
var maxForce = 0.1
var deadCars = []
var generation = 0
var all_time_best_fitness = 0
//our boundary array of points [x,y], represents the track outline
const boundary = [[0, 0], [250, 102], [350, 200], [500, 420],[650,420], [800, 280], [1000, 220], [1200, 50]]
const boundaryBottomOffset = 120

function setup() {
    createCanvas(2000, 1000)

    population = new Population()
    visualLifespan = createP()
    target = createVector(width, boundary[boundary.length - 1][1])
    track = new Track(boundary)
}

function draw() {
    background(42, 49, 57)
    track.draw()
    population.run()
    count++
    checkLifespanOver()
    text("Generation " + generation, 20,20)
    textSize(13)
    stroke(1)
    text("maximum fitness " + all_time_best_fitness, 20,height/2)
    ellipse(target.x, target.y, 16, 16)
}
function checkLifespanOver() {
    if (deadCars.length == population.populationSize) {
        population.evaluate()
        population.selection()
        count = 0
        deadCars = []
        generation++
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
