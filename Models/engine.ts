class Engine {
    engineNumber:number;
    engineMaxPower:number;
    engineAtualSpeed:number = 0; //default value = 0

    constructor(number:number, maxPower:number){
        this.engineNumber = number;
        this.engineMaxPower = maxPower;
    }
}