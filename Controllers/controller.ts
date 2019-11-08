/*-- Default Rockets --*/
interface defaultRocket {
    id:string;
    engines:number;
    maxPowers:number[];
}

let defaultRockets:defaultRocket[] = [
    { /* //Rocket 1// */
        id: "32WESSDS", 
        engines: 3,
        maxPowers: [10, 30, 80]    
    },
    { /* //Rocket 2// */
        id: "LDSFJA32", 
        engines: 6,
        maxPowers:[30, 40, 50, 50, 30, 10]
    }
];

/* //Rocket 1// */
let r1:Rocket;

/* //Rocket 2// */
let r2:Rocket;


/*-- Comprueba si la Id del cohete cumple el patrón --*/
function idValidator(value:string) {
        let idFormat = /[A-Z0-9]{8}/; //comprueba que sean 8 carácteres alfanuméricos 
        let idRegExp = new RegExp(idFormat);        
        if (idRegExp.test(value)){ return true; } else { return false; }
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
    section.innerHTML = HTMLSpeed;
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

/*-- Crea el cohete pero no lo muestra por pantalla --*/
function createRocketBtn (btn:HTMLButtonElement, defRocket:defaultRocket){
    let r = <Rocket>createRocket(defRocket.id, defRocket.engines, defRocket.maxPowers); 
    btn.setAttribute("disabled", "");    
    return r;
}

/*-- devuelve el valor para el color del boton según si es el cohete 1 o 2 u otro --*/
let str = function (n:number):string {
    let btn:string;
    switch(n){
        case 1:
            btn = "danger";
            break;  
        case 2:
            btn = "warning";
            break;
        default:
            btn = "info";
            break;
    }
    return btn;
}

/*-- devuelve el valores de HTML para crear el botón según el tipo pasádo al parámetro str --*/
let insertHTML = function (str:string, n:number, btn:string):string {
    let speed:string;
    let rocket:string;
    str == "speed+"? speed = "Ac": speed = "De";
    n == 0? rocket = "" : rocket = `rocket${n} `;
    let HTMLstr:string = `<button class="${rocket}btn btn-${btn} `;    
    switch(str){
        case "speed+": /*-- // boton de acelerar // --*/            
        case "speed-": /*-- // boton de decelerar // --*/            
            HTMLstr += `mx-2" id="${speed}celR${n}">${speed}celerate Rocket ${n}</button>`;
            break;
        case "info": /*-- // boton de info de uno u otro cohete o ambos // --*/
            if (n == 1 || n == 2) {
                HTMLstr += `m-3" id="infoR${n}">Info Rocket ${n}</button>`;
            } else {
                HTMLstr += `m-3" id="infoRockets">Info All Rockets</button>`;
            }
            break;
    }
    return HTMLstr;
}

/*-- // creación de botones // --*/

/*-- según el valor recibido crear uno u otro botón --*/
function createBtn (btnType:string, elemId:string, n:number) {
    let btn:string = str(n);
    let section = <HTMLElement>document.getElementById(elemId);    
    let HTMLbtn = insertHTML(btnType, n, btn);        
    section.innerHTML += HTMLbtn;
}

let btnCreateR1 = <HTMLButtonElement>document.getElementById("btnCreateR1");
let btnCreateR2 = <HTMLButtonElement>document.getElementById("btnCreateR2");

/*-- crea el cohete y sus botones asociados --*/
function addBtns (n:number) {
    createBtn("info", "infoBtns", n);
    if (btnCreateR1.hasAttribute("disabled") && btnCreateR2.hasAttribute("disabled")) {
        createBtn("info", "infoBtns", 0);
        //activa el evenlistener
        infoBtn(0);
    }
    createBtn("speed+", "speedBtns", n);
    createBtn("speed-", "speedBtns", n);
}

/*-- crea el cohete 1 y sus botones asociados --*/
btnCreateR1.addEventListener("click", () => {
    r1 = createRocketBtn(btnCreateR1, defaultRockets[0]);    
    addBtns(1);
    //activa los eventlisteners
    infoBtn(1);
    accelBtn(1);
    decelBtn(1);
    if (r2 != undefined){ 
        infoBtn(2);
        accelBtn(2);
        decelBtn(2);
    }
    
});

/*-- crea el cohete 2 y sus botones asociados --*/
btnCreateR2.addEventListener("click", () => {
    r2 = createRocketBtn(btnCreateR2, defaultRockets[1]);
    addBtns(2);
    //activa los eventlisteners
    infoBtn(2);
    accelBtn(2);
    decelBtn(2);
    if (r1 != undefined){
        infoBtn(1);
        accelBtn(1);
        decelBtn(1);
    }
});

/*-- botones de info --*/

function infoBtn (btn:number) {
    let btnAllInfo = <HTMLButtonElement>document.getElementById("infoRockets");
    let btnInfoR1 = <HTMLButtonElement>document.getElementById("infoR1");
    let btnInfoR2 = <HTMLButtonElement>document.getElementById("infoR2");
    switch (btn) {
        case 1: /*-- info Roket 1 --*/
            InfoR1btn(btnInfoR1, btnInfoR2, btnAllInfo);
            break;
        case 2: /*-- info Roket 2 --*/
            InfoR2btn(btnInfoR1, btnInfoR2, btnAllInfo);
            break;
        case 0: /*-- info All Rokets --*/
            InfoAllBtn(btnInfoR1, btnInfoR2, btnAllInfo)
            break;
    }
}

/*-- al pulsar el botón muestra la info del cohete 1 y luego lo deshabilita 
* y, si se ha pulsado también el botón de info del cohete 2, deshabilita el boton de toda la info --*/ 
function InfoR1btn (btnInfoR1:HTMLButtonElement, btnInfoR2:HTMLButtonElement, btnAllInfo:HTMLButtonElement) {
    btnInfoR1.addEventListener("click", () => {
        showRocket(r1, "rockets");
        btnInfoR1.setAttribute("disabled", "");
        if (btnInfoR2 != null && btnInfoR2.hasAttribute("disabled")){
            btnAllInfo.setAttribute("disabled", "");
        }
    });    
}

/*-- al pulsar el botón muestra la info del cohete 2 y luego lo deshabilita 
* y, si se ha pulsado también el botón de info del cohete 1, deshabilita el boton de toda la info --*/
function InfoR2btn (btnInfoR1:HTMLButtonElement, btnInfoR2:HTMLButtonElement, btnAllInfo:HTMLButtonElement) {
    btnInfoR2.addEventListener("click", () => {
        showRocket(r2, "rockets");
        btnInfoR2.setAttribute("disabled", "");
        if (btnInfoR1 != null && btnInfoR1.hasAttribute("disabled")){
            btnAllInfo.setAttribute("disabled", "");
        }
    });    
}

/*-- muestra la info de ambos cohetes o de uno de ellos si se ha pulsado el botón correspondiente,
* y luego deshabilita el/los botón/es correspondiente/s --*/
function InfoAllBtn (btnInfoR1:HTMLButtonElement, btnInfoR2:HTMLButtonElement, btnAllInfo:HTMLButtonElement) {
    btnAllInfo.addEventListener("click", () => {
        if (!btnInfoR1.hasAttribute("disabled") && !btnInfoR2.hasAttribute("disabled")){
            showRocket(r1, "rockets");
            showRocket(r2, "rockets");
            btnInfoR1.setAttribute("disabled", "");
            btnInfoR2.setAttribute("disabled", "");
        } else if (!btnInfoR1.hasAttribute("disabled") && btnInfoR2.hasAttribute("disabled")){
            showRocket(r1, "rockets");
            btnInfoR1.setAttribute("disabled", "");
        } else if (btnInfoR1.hasAttribute("disabled") && !btnInfoR2.hasAttribute("disabled")){
            showRocket(r2, "rockets");
            btnInfoR2.setAttribute("disabled", "");
        }
        btnAllInfo.setAttribute("disabled", "");
    });    
}

/*-- botones de acelerar --*/

function accelBtn (n:number){
    let btnAccelR1 = <HTMLButtonElement>document.getElementById("AccelR1");
    let btnAccelR2 = <HTMLButtonElement>document.getElementById("AccelR2");
    switch(n){
        case 1:
            accelR1Btn (btnAccelR1, btnAccelR2);
            break;
        case 2:
            accelR2Btn (btnAccelR1, btnAccelR2);
            break;            
    }
}

function accelR1Btn (btnAccelR1:HTMLButtonElement, btnAccelR2:HTMLButtonElement) {
    btnAccelR1.addEventListener ("click", () => {
        rocketAcceleration(r1, 1);
        showSpeed(r1, "speeds");
    });
}

function accelR2Btn (btnAccelR1:HTMLButtonElement, btnAccelR2:HTMLButtonElement) {
    btnAccelR2.addEventListener ("click", () => {
        rocketAcceleration(r2, 1);
        showSpeed(r2, "speeds");
    });
}

/*-- botones de decelerar --*/

function decelBtn (n:number){
    let btnDecelR1 = <HTMLButtonElement>document.getElementById("DecelR1");
    let btnDecelR2 = <HTMLButtonElement>document.getElementById("DecelR2");
    switch(n){
        case 1:
            decelR1Btn (btnDecelR1, btnDecelR2);
            break;
        case 2:
            decelR2Btn (btnDecelR1, btnDecelR2);
            break;            
    }
}

function decelR1Btn (btnDecelR1:HTMLButtonElement, btnDecelR2:HTMLButtonElement) {
    btnDecelR1.addEventListener ("click", () => {
        rocketDeceleration(r1, 1);
        showSpeed(r1, "speeds");
    });
}

function decelR2Btn (btnDecelR1:HTMLButtonElement, btnDecelR2:HTMLButtonElement) {
    btnDecelR2.addEventListener ("click", () => {
        rocketDeceleration(r2, 1);
        showSpeed(r2, "speeds");
    });
}