var population
var lifespan = 2000
var visualLifespan
var count = 0
var target
var maxForce = 0.1
var deadEntities = []
var best_entity_generation = []
var generation = 0
var all_time_best_fitness = 0
//our boundary array of points [x,y], represents the track outline
const boundary = [[0, 0], [250, 102], [350, 200], [500, 420], [650, 420], [800, 280], [1000, 220], [1200, 50]]
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
    text("Generation " + generation, 20, 20)
    textSize(13)
    stroke(1)
    text("maximum fitness " + Math.round(all_time_best_fitness * 100) / 100, 200, 20)
    text("Top entities per generation:", 20, height / 1.5 - 50)
    displayTopPerformers()
}
function displayTopPerformers() {
    for (var i = 0; i < best_entity_generation.length; i++) {
        var e = new Entity(best_entity_generation[i].dna, best_entity_generation[i].num, 10, 40)
        var _x = 40
        var _offset = 150
        var _y = height / 1.5
        e.pos.x = _x + _offset * i
        e.pos.y = _y + 30
        e.show()
        text(i, 20 + _offset * i, _y)
        textSize(12)
        stroke(1)
        text(Math.round(best_entity_generation[i].fitness * 100) / 100, 20 + _offset * i, _y + 80)
    }
}
function checkLifespanOver() {
    if (deadEntities.length == population.populationSize) {
        population.evaluate()
        population.selection()
        count = 0
        deadEntities = []
        generation++
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
