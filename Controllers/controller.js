"use strict";
/*-- Default Rockets --*/
/* //Roquet 1// */
var rId1 = "32WESSDS";
var rEngine1 = 3;
var r1 = createRocket(rId1, rEngine1);
/* //Roquet 2// */
var rId2 = "LDSFJA32";
var rEngine2 = 6;
var r2 = createRocket(rId2, rEngine2);
/*-- Comprueba si la Id del cohete cumple el patrón --*/
function idValidator(value) {
    var idFormat = /[A-Z0-9]{8}/; //comprueba que sean 8 carácteres alfanuméricos 
    var idRegExp = new RegExp(idFormat);
    if (idRegExp.test(value)) {
        return true;
    }
    else {
        return false;
    }
}
/*-- tras comprobar que la Id es correcta, crea el cohete --*/
function createRocket(id, engine) {
    if (idValidator(id)) {
        var rocket = new Rocket(id, engine);
        return rocket;
    }
    else {
        console.warn("the Rocket hasn't create because Id is NOT right");
    }
}
//rellena la sección "rockets" de index.html añadiendo el cohete enviado como parámetro
function showRocket(rocket, sectionId) {
    var section = document.getElementById(sectionId);
    var HTMLRocket = "<p>Rocket <b>" + rocket.id + "</b> has <b>" + rocket.engine + "</b> thursters</p>";
    section.innerHTML += HTMLRocket;
}
showRocket(r1, "rockets");
showRocket(r2, "rockets");
