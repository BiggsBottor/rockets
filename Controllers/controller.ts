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

//rellena la sección "rockets" de index.html añadiendo el cohete enviado como parámetro
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

showRocket(r1, "rockets");
showRocket(r2, "rockets");
