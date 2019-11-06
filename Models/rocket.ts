class Rocket {
    id: string;
    engines: Engine[] = new Array();

    constructor(id: string){
        this.id = id;                
    }

    addEngine (engine:Engine){
        this.engines.push(engine);
    }
}