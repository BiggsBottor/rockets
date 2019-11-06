/*-- Default Rockets --*/
/* //Roquet 1// */
let rId1 = "32WESSDS";
let rEngine1 = 3;
let rMaxPowers1 = [10, 30, 80];
let r1 = <Rocket>createRocket(rId1,rEngine1, rMaxPowers1);

/* //Roquet 2// */
let rId2 = "LDSFJA32";
let rEngine2 = 6;
let rMaxPowers2 = [30, 40, 50, 50, 30, 10];
let r2 = <Rocket>createRocket(rId2,rEngine2, rMaxPowers2);

/*-- Comprueba si la Id del cohete cumple el patrón --*/
function idValidator(value:string) {
        let idFormat = /[A-Z0-9]{8}/; //comprueba que sean 8 carácteres alfanuméricos 
        let idRegExp = new RegExp(idFormat);
        if (idRegExp.test(value)){
            return true;
        } else {
            return false; 
        }
    }

/*-- tras comprobar que la Id es correcta, crea el cohete --*/
function createRocket (id:string, engines:number, maxPowers:number[]){
    if (idValidator(id)){
        let rocket = new Rocket(id);
        if (maxPowers.length == engines){
            for (let i = 0; i < engines; i++){
                let engine = new Engine(i+1, maxPowers[i]);
                rocket.addEngine(engine);
            }
        }
        return rocket;
    } else {
        console.warn("the Rocket hasn't create because Id is NOT right");
    }
}    

/*-- rellena la sección "rockets" de index.html añadiendo el cohete enviado como parámetro --*/
function showRocket (rocket:Rocket, sectionId:string){
    let section = <HTMLElement>document.getElementById(sectionId);    
    let HTMLRocket = `<p>Rocket <b>${rocket.id}</b> has <b>${rocket.engines.length}</b> thursters with max powers `;                     
    for (let i = 0; i < rocket.engines.length; i++){
        i < rocket.engines.length -1 ? 
            HTMLRocket += `<i>${rocket.engines[i].engineMaxPower}</i>, ` : 
            HTMLRocket += `<i>${rocket.engines[i].engineMaxPower}</i></p>`        
    }
    section.innerHTML += HTMLRocket;
}

/*-- rellena la sección "speeds" de index.html mostrando las velocidades --*/
function showSpeed (rocket:Rocket, sectionId:string){
    let section = <HTMLElement>document.getElementById(sectionId);
    let rocketSpeed:number = 0;
    for (let engine of rocket.engines){
        rocketSpeed += engine.engineAtualSpeed;
    }
    let HTMLSpeed = `<p><b>${rocket.id}</b> Rocket speed <i>${rocketSpeed}</i><p>`;
    section.innerHTML += HTMLSpeed;
}

/*-- llama a la función acelerar del cohete las veces que se indique --*/
function rocketAcceleration (rocket:Rocket, times:number){
    for (let i = 0; i < times; i++){
        rocket.accelerate();
    }
}

/*-- llama a la función decelerar del cohete las veces que se indique --*/
function rocketDeceleration (rocket:Rocket, times:number){
    for (let i = 0; i < times; i++){
        rocket.decelerate();
    }
}

/*-- FIXME: pasos por pantalla --*/
   
/* Mostrar a pantalla el codi dels coets, el número de propulsors 
    que té i la potència màxima de cada propulsor.*/
showRocket(r1, "rockets");
showRocket(r2, "rockets");

/* Mostrar a pantalla la velocitat actual dels coets */
showSpeed(r1, "speeds");
showSpeed(r2, "speeds");

/* Accelerar amb els coets tres cops */
rocketAcceleration(r1, 3);
rocketAcceleration(r2, 3);

/* Mostrar a pantalla la velocitat actual */
showSpeed(r1, "speeds");
showSpeed(r2, "speeds");

/* Frenar cinc cops amb el primer coet (“32WESSDS”) i accelerar set amb el segon coet. */
rocketDeceleration(r1, 5);

rocketAcceleration(r2, 7);

/* Mostrar a pantalla la velocitat actual */
showSpeed(r1, "speeds");
showSpeed(r2, "speeds");

/* Accelerar 15 cops amb els dos coets. */
rocketAcceleration(r1, 15);
rocketAcceleration(r2, 15);

/* Mostrar a pantalla la velocitat actual */
showSpeed(r1, "speeds");
showSpeed(r2, "speeds");