class Population {
    constructor() {
        this.cars = []
        this.population_size = 25
        this.pool = []
        for (var i = 0; i < this.population_size; i++) {
            this.cars[i] = new Car(null, i)
        }
    }

    run() {
        for (var i = 0; i < this.population_size; i++) {
            if (this.cars[i].dead) continue
            this.cars[i].update()
            this.cars[i].draw()
        }
    }

    selection() {
        var newCars = []

        for (var i = 0; i < this.cars.length; i++) {

            var parentA = this.pool[getRandomInt(0, this.pool.length - 1)].dna
            var parentB = this.pool[getRandomInt(0, this.pool.length - 1)].dna

            var child = parentA.crossover(parentB)
            //child.mutation()
            var randomFromPool = this.pool[getRandomInt(0, this.pool.length - 1)]
            newCars[i] = new Car(child, i)
        }
        this.cars = newCars
    }


    evaluate() {
        var maxFitness = this.findMaximumFitness()
        console.log("max fitness was " + maxFitness)
        this.normalizeCarFitness(maxFitness)
        this.populatePool()
    }

    findMaximumFitness() {
        var maxFitness = 0
        var bestCar = null
        for (var i = 0; i < this.population_size; i++) {
            this.cars[i].calculateFitness() // the distance from the target relative to current pos
            console.log("car " + i + "fitness is: " + this.cars[i].fitness)
            if (this.cars[i].fitness > maxFitness) {
                maxFitness = this.cars[i].fitness
                bestCar = this.cars[i]
            }
        }
        console.log("best car was " + bestCar.number)
        if (maxFitness > generational_max_fitness) {
            generational_max_fitness = maxFitness
        }
        return maxFitness
    }

    normalizeCarFitness(maxFitness) {
        console.log("normalize")
        for (var i = 0; i < this.population_size; i++) {
            this.cars[i].fitness /= maxFitness // normalize the fitness value to be between 0 and 1
        }
    }
    getAverageFitness() {
        var avg = 0
        for (var i = 0; i < this.population_size; i++) {
            avg += this.cars[i].fitness
        }
        return avg / this.population_size
    }
    populatePool() {
        this.pool = []
        var median = this.getAverageFitness()
        for (var i = 0; i < this.population_size; i++) {
            if (this.cars[i].fitness > median) {
                var n = this.cars[i].fitness * 100 // increase normalized value to between 0 and 100
                for (var j = 0; j < n; j++) {
                    console.log("pushing car " + i + " " + n + " times")
                    this.pool.push(this.cars[i]) // add the current gene to the pool relative to how fit it is
                }
            }
        }

        console.log("end pool is")
        console.log(this.pool)
    }
}