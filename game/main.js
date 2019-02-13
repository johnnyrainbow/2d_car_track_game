
var track
var inputY = 1 //let neural net dictate this value
var population
var lifespan = 300
var visualLifespan
var count = 1
var deadCars = []
var generation = 0
var generational_max_fitness = 0
//our boundary array of points [x,y], represents the track outline
const boundary = [[0, 50], [150, 52], [350, 120], [500, 40], [800, 300], [1000,220], [1200,350], [1650,250],[1800,300]]
const boundaryBottomOffset = 150

function setup() {
    //init car(s) and track, create the canvas
    createCanvas(2000, 1000);

    population = new Population()

    track = new Track(boundary)

}

function draw() {
    background(255)
    track.draw()
    //draw and update
    population.run()
    count++
    checkLifespanOver()
    textSize(20)
    fill(0)
    text("Generation " + generation,0,20)
    textSize(12)
    text("Max fitness " + generational_max_fitness,150,20)
}
function checkLifespanOver() {

    if (lifespan === count) { // everytime all cars die,
        population.evaluate()
        population.selection()
        count = 1
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
