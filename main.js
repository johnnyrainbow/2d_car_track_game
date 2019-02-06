var car
var track
//our boundary array of points [x,y], represents the track outline
const boundary = [[0, 50], [150, 52], [350, 120], [500, 40], [800, 300], [1000,220], [1200,350], [1650,250],[1800,300]]
const boundaryBottomOffset = 150

function setup() {
    //init car(s) and track, create the canvas
    car = new Car(boundary[0][0], boundary[0][1] + boundaryBottomOffset / 3, 5)
    track = new Track(boundary)
    createCanvas(2000, 1000);
}

function draw() {
    background(255)

    //draw and update
    car.drawCar()
    track.drawTrack()
    car.move(1, 0.1)
}

