"use strict";
/*-- Default Rockets --*/
/* //Roquet 1// */
var rId1 = "32WESSDS";
var rEngine1 = 3;
var rMaxPowers1 = [10, 30, 80];
var r1 = createRocket(rId1, rEngine1, rMaxPowers1);
/* //Roquet 2// */
var rId2 = "LDSFJA32";
var rEngine2 = 6;
var rMaxPowers2 = [30, 40, 50, 50, 30, 10];
var r2 = createRocket(rId2, rEngine2, rMaxPowers2);
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
function createRocket(id, engines, maxPowers) {
    if (idValidator(id)) {
        var rocket = new Rocket(id);
        if (maxPowers.length == engines) {
            for (var i = 0; i < engines; i++) {
                var engine = new Engine(i + 1, maxPowers[i]);
                rocket.addEngine(engine);
            }
        }
        return rocket;
    }
    else {
        console.warn("the Rocket hasn't create because Id is NOT right");
    }
}
/*-- rellena la sección "rockets" de index.html añadiendo el cohete enviado como parámetro --*/
function showRocket(rocket, sectionId) {
    var section = document.getElementById(sectionId);
    var HTMLRocket = "<p>Rocket <b>" + rocket.id + "</b> has <b>" + rocket.engines.length + "</b> thursters with max powers ";
    for (var i = 0; i < rocket.engines.length; i++) {
        i < rocket.engines.length - 1 ?
            HTMLRocket += "<i>" + rocket.engines[i].engineMaxPower + "</i>, " :
            HTMLRocket += "<i>" + rocket.engines[i].engineMaxPower + "</i></p>";
    }
    section.innerHTML += HTMLRocket;
}
/*-- rellena la sección "speeds" de index.html mostrando las velocidades --*/
function showSpeed(rocket, sectionId) {
    var section = document.getElementById(sectionId);
    var rocketSpeed = 0;
    for (var _i = 0, _a = rocket.engines; _i < _a.length; _i++) {
        var engine = _a[_i];
        rocketSpeed += engine.engineAtualSpeed;
    }
    var HTMLSpeed = "<p><b>" + rocket.id + "</b> Rocket speed <i>" + rocketSpeed + "</i><p>";
    section.innerHTML += HTMLSpeed;
}
/*-- llama a la función acelerar del cohete las veces que se indique --*/
function rocketAcceleration(rocket, times) {
    for (var i = 0; i < times; i++) {
        rocket.accelerate();
    }
}
/*-- llama a la función decelerar del cohete las veces que se indique --*/
function rocketDeceleration(rocket, times) {
    for (var i = 0; i < times; i++) {
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
