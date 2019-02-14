class Population {
    constructor() {
            this.sticks = []
            this.populationSize = 25
            this.pool = []
            for (var i = 0; i < this.populationSize; i++) {
                this.sticks[i] = new Car(null, i)
            }
        }

        evaluate() {
            var maxFitness = 0
            var bestCar
            for (var i = 0; i < this.populationSize; i++) {
                this.sticks[i].calculateFitness()
                if (this.sticks[i].fitness > maxFitness) {
                    maxFitness = this.sticks[i].fitness
                    bestCar = this.sticks[i]
                }
            }
            if(maxFitness > all_time_best_fitness) {
                all_time_best_fitness = maxFitness
            }

            for (var i = 0; i < this.populationSize; i++) {
                this.sticks[i].fitness /= maxFitness // normalize
            }

            this.pool = []
            for (var i = 0; i < this.populationSize; i++) {
                var n = this.sticks[i].fitness * 100
                for (var j = 0; j < n; j++) {
                    this.pool.push(this.sticks[i])
                }
            }
        }

        selection() {
            var newSticks = [];
            for (var i = 0; i < this.sticks.length; i++) {
                var label = i
                var parentA = random(this.pool).dna;
                var parentB = random(this.pool).dna;

                var child = parentA.crossover(parentB);
                //child.mutation();
                if (Math.floor(Math.random() * 10) === 0) { //5% chance per generation
                    child.mutate()
                    label = "MUTATED"
                }

                newSticks[i] = new Car(child, label);
            }

            this.sticks = newSticks;
        }

        run() {
            for (var i = 0; i < this.populationSize; i++) {
                if (!this.sticks[i].dead) {
                    this.sticks[i].update()
                    this.sticks[i].show()
                }
            }
        }
    }
