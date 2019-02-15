class Population {
    constructor() {
            this.entities = []
            this.populationSize = 800
            this.pool = []
            for (var i = 0; i < this.populationSize; i++) {
                this.entities[i] = new Entity(null, i)
            }
        }

        evaluate() {
            var maxFitness = 0
            var bestEntity
            for (var i = 0; i < this.populationSize; i++) {
                this.entities[i].calculateFitness()
                if (this.entities[i].fitness > maxFitness) {
                    maxFitness = this.entities[i].fitness
                    bestEntity = this.entities[i]
                }
            }
            best_entity_generation.push(bestEntity)
            if(maxFitness > all_time_best_fitness) {
                all_time_best_fitness = maxFitness
            }

            for (var i = 0; i < this.populationSize; i++) {
                this.entities[i].normal_fitness = this.entities[i].fitness / maxFitness // normalize
            }

            this.pool = []
            for (var i = 0; i < this.populationSize; i++) {
                var n = this.entities[i].normal_fitness * 100
                for (var j = 0; j < n; j++) {
                    this.pool.push(this.entities[i])
                }
            }
        }

        selection() {
            var newentities = [];
            for (var i = 0; i < this.entities.length; i++) {
                var label = i
                var parentA = random(this.pool).dna;
                var parentB = random(this.pool).dna;

                var child = parentA.crossover(parentB);
                //child.mutation();
                if (Math.floor(Math.random() * 5) === 0) { //5% chance per generation
                    child.mutate()
                }

                newentities[i] = new Entity(child, label);
            }

            this.entities = newentities;
        }

        run() {
            for (var i = 0; i < this.populationSize; i++) {
                if (!this.entities[i].dead) {
                    this.entities[i].update()
                }
                this.entities[i].show()
            }
        }
    }
