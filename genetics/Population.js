class Population {
    constructor() {
            this.cars = []
            this.populationSize = 1000
            this.pool = []
            for (var i = 0; i < this.populationSize; i++) {
                this.cars[i] = new Car(null, i)
            }
        }

        evaluate() {
            var maxFitness = 0
            var bestCar
            for (var i = 0; i < this.populationSize; i++) {
                this.cars[i].calculateFitness()
                if (this.cars[i].fitness > maxFitness) {
                    maxFitness = this.cars[i].fitness
                    bestCar = this.cars[i]
                }
            }
            if(maxFitness > all_time_best_fitness) {
                all_time_best_fitness = maxFitness
            }

            for (var i = 0; i < this.populationSize; i++) {
                this.cars[i].fitness /= maxFitness // normalize
            }

            this.pool = []
            for (var i = 0; i < this.populationSize; i++) {
                var n = this.cars[i].fitness * 100
                for (var j = 0; j < n; j++) {
                    this.pool.push(this.cars[i])
                }
            }
        }

        selection() {
            var newcars = [];
            for (var i = 0; i < this.cars.length; i++) {
                var label = i
                var parentA = random(this.pool).dna;
                var parentB = random(this.pool).dna;

                var child = parentA.crossover(parentB);
                //child.mutation();
                if (Math.floor(Math.random() * 5) === 0) { //5% chance per generation
                    child.mutate()
                    label = "MUTATED"
                }

                newcars[i] = new Car(child, label);
            }

            this.cars = newcars;
        }

        run() {
            for (var i = 0; i < this.populationSize; i++) {
                if (!this.cars[i].dead) {
                    this.cars[i].update()
                }
                this.cars[i].show()
            }
        }
    }
