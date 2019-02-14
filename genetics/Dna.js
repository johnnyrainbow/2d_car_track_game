class Dna {
    constructor(genes) {
        if (genes) {
            this.genes = genes
        } else {
            this.genes = []
            for (var i = 0; i < lifespan; i++) {
                this.genes[i] = p5.Vector.random2D()
                this.genes[i].setMag(maxForce)
            }
        }
    }

    mutate() {
        var amount_to_mutate = Math.floor(Math.random() * this.genes.length / 100) + 1 //1 up to 20 genes
        while (amount_to_mutate > 0) {
            //select random gene
            var i_1 = Math.floor(Math.random() * this.genes.length - 1)
            var temp = this.genes[i_1]
            //select another random gene
            var i_2 = Math.floor(Math.random() * this.genes.length - 1)
            this.genes[i_1] = this.genes[i_2]
            this.genes[i_2] = temp
            amount_to_mutate--
        }
    }
    crossover(partner) {
        var newgenes = []

        var mid = (Math.floor(Math.random() * this.genes.length - 1))
        for (var i = 0; i < this.genes.length; i++) {
            if (i > mid) {
                newgenes[i] = this.genes[i]
            }
            else {
                newgenes[i] = partner.genes[i]
            }
        }

        return new Dna(newgenes);
    }
}