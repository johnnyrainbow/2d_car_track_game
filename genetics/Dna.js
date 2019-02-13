class Dna {
    constructor(genes) {
        if(genes) {
            this.genes = genes
        } else {
            this.genes = []
        }
     
       //each car has dna which contains 200 (lifespan) genes 
      
       for(var i=0;i<lifespan;i++) {
           this.genes[i] = [getRandomFloat(-20,20)] //direction y ,velocity
       } 
    }
    crossover(partner) {
        var newgenes = [];

        var mid = floor(random(this.genes.length));
        for (var i = 0; i < this.genes.length; i++) {

            if (i > mid) {
                newgenes[i] = this.genes[i];
            }

            else {
                newgenes[i] = partner.genes[i];
            }
        }
        return new Dna(newgenes);
    }
}