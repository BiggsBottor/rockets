class Rocket {
    id: string;
    engines: Engine[] = new Array();    

    constructor(id: string){
        this.id = id;                
    }

    addEngine (engine:Engine){
        this.engines.push(engine);
    }
    
    accelerate (){
        for (let engine of this.engines) {
            if (engine.engineAtualSpeed < engine.engineMaxPower){
                engine.engineAtualSpeed += 10;
            }
        }
    }

    decelerate (){
        for (let engine of this.engines) {
            if (engine.engineAtualSpeed > 0){
                engine.engineAtualSpeed -= 10;
            }
        }
    }
}