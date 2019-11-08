"use strict";
var defaultRockets = [
    {
        id: "32WESSDS",
        engines: 3,
        maxPowers: [10, 30, 80]
    },
    {
        id: "LDSFJA32",
        engines: 6,
        maxPowers: [30, 40, 50, 50, 30, 10]
    }
];
/* //Rocket 1// */
var r1;
/* //Rocket 2// */
var r2;
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
    section.innerHTML = HTMLSpeed;
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
/*-- Crea el cohete pero no lo muestra por pantalla --*/
function createRocketBtn(btn, defRocket) {
    var r = createRocket(defRocket.id, defRocket.engines, defRocket.maxPowers);
    btn.setAttribute("disabled", "");
    return r;
}
/*-- devuelve el valor para el color del boton según si es el cohete 1 o 2 u otro --*/
var str = function (n) {
    var btn;
    switch (n) {
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
};
/*-- devuelve el valores de HTML para crear el botón según el tipo pasádo al parámetro str --*/
var insertHTML = function (str, n, btn) {
    var speed;
    var rocket;
    str == "speed+" ? speed = "Ac" : speed = "De";
    n == 0 ? rocket = "" : rocket = "rocket" + n + " ";
    var HTMLstr = "<button class=\"" + rocket + "btn btn-" + btn + " ";
    switch (str) {
        case "speed+": /*-- // boton de acelerar // --*/
        case "speed-": /*-- // boton de decelerar // --*/
            HTMLstr += "mx-2\" id=\"" + speed + "celR" + n + "\">" + speed + "celerate Rocket " + n + "</button>";
            break;
        case "info": /*-- // boton de info de uno u otro cohete o ambos // --*/
            if (n == 1 || n == 2) {
                HTMLstr += "m-3\" id=\"infoR" + n + "\">Info Rocket " + n + "</button>";
            }
            else {
                HTMLstr += "m-3\" id=\"infoRockets\">Info All Rockets</button>";
            }
            break;
    }
    return HTMLstr;
};
/*-- // creación de botones // --*/
/*-- según el valor recibido crear uno u otro botón --*/
function createBtn(btnType, elemId, n) {
    var btn = str(n);
    var section = document.getElementById(elemId);
    var HTMLbtn = insertHTML(btnType, n, btn);
    section.innerHTML += HTMLbtn;
}
var btnCreateR1 = document.getElementById("btnCreateR1");
var btnCreateR2 = document.getElementById("btnCreateR2");
/*-- crea el cohete y sus botones asociados --*/
function addBtns(n) {
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
btnCreateR1.addEventListener("click", function () {
    r1 = createRocketBtn(btnCreateR1, defaultRockets[0]);
    addBtns(1);
    //activa los eventlisteners
    infoBtn(1);
    accelBtn(1);
    decelBtn(1);
    if (r2 != undefined) {
        infoBtn(2);
        accelBtn(2);
        decelBtn(2);
    }
});
/*-- crea el cohete 2 y sus botones asociados --*/
btnCreateR2.addEventListener("click", function () {
    r2 = createRocketBtn(btnCreateR2, defaultRockets[1]);
    addBtns(2);
    //activa los eventlisteners
    infoBtn(2);
    accelBtn(2);
    decelBtn(2);
    if (r1 != undefined) {
        infoBtn(1);
        accelBtn(1);
        decelBtn(1);
    }
});
/*-- botones de info --*/
function infoBtn(btn) {
    var btnAllInfo = document.getElementById("infoRockets");
    var btnInfoR1 = document.getElementById("infoR1");
    var btnInfoR2 = document.getElementById("infoR2");
    switch (btn) {
        case 1: /*-- info Roket 1 --*/
            InfoR1btn(btnInfoR1, btnInfoR2, btnAllInfo);
            break;
        case 2: /*-- info Roket 2 --*/
            InfoR2btn(btnInfoR1, btnInfoR2, btnAllInfo);
            break;
        case 0: /*-- info All Rokets --*/
            InfoAllBtn(btnInfoR1, btnInfoR2, btnAllInfo);
            break;
    }
}
/*-- al pulsar el botón muestra la info del cohete 1 y luego lo deshabilita
* y, si se ha pulsado también el botón de info del cohete 2, deshabilita el boton de toda la info --*/
function InfoR1btn(btnInfoR1, btnInfoR2, btnAllInfo) {
    btnInfoR1.addEventListener("click", function () {
        showRocket(r1, "rockets");
        btnInfoR1.setAttribute("disabled", "");
        if (btnInfoR2 != null && btnInfoR2.hasAttribute("disabled")) {
            btnAllInfo.setAttribute("disabled", "");
        }
    });
}
/*-- al pulsar el botón muestra la info del cohete 2 y luego lo deshabilita
* y, si se ha pulsado también el botón de info del cohete 1, deshabilita el boton de toda la info --*/
function InfoR2btn(btnInfoR1, btnInfoR2, btnAllInfo) {
    btnInfoR2.addEventListener("click", function () {
        showRocket(r2, "rockets");
        btnInfoR2.setAttribute("disabled", "");
        if (btnInfoR1 != null && btnInfoR1.hasAttribute("disabled")) {
            btnAllInfo.setAttribute("disabled", "");
        }
    });
}
/*-- muestra la info de ambos cohetes o de uno de ellos si se ha pulsado el botón correspondiente,
* y luego deshabilita el/los botón/es correspondiente/s --*/
function InfoAllBtn(btnInfoR1, btnInfoR2, btnAllInfo) {
    btnAllInfo.addEventListener("click", function () {
        if (!btnInfoR1.hasAttribute("disabled") && !btnInfoR2.hasAttribute("disabled")) {
            showRocket(r1, "rockets");
            showRocket(r2, "rockets");
            btnInfoR1.setAttribute("disabled", "");
            btnInfoR2.setAttribute("disabled", "");
        }
        else if (!btnInfoR1.hasAttribute("disabled") && btnInfoR2.hasAttribute("disabled")) {
            showRocket(r1, "rockets");
            btnInfoR1.setAttribute("disabled", "");
        }
        else if (btnInfoR1.hasAttribute("disabled") && !btnInfoR2.hasAttribute("disabled")) {
            showRocket(r2, "rockets");
            btnInfoR2.setAttribute("disabled", "");
        }
        btnAllInfo.setAttribute("disabled", "");
    });
}
/*-- botones de acelerar --*/
function accelBtn(n) {
    var btnAccelR1 = document.getElementById("AccelR1");
    var btnAccelR2 = document.getElementById("AccelR2");
    switch (n) {
        case 1:
            accelR1Btn(btnAccelR1, btnAccelR2);
            break;
        case 2:
            accelR2Btn(btnAccelR1, btnAccelR2);
            break;
    }
}
function accelR1Btn(btnAccelR1, btnAccelR2) {
    btnAccelR1.addEventListener("click", function () {
        rocketAcceleration(r1, 1);
        showSpeed(r1, "speeds");
    });
}
function accelR2Btn(btnAccelR1, btnAccelR2) {
    btnAccelR2.addEventListener("click", function () {
        rocketAcceleration(r2, 1);
        showSpeed(r2, "speeds");
    });
}
/*-- botones de decelerar --*/
function decelBtn(n) {
    var btnDecelR1 = document.getElementById("DecelR1");
    var btnDecelR2 = document.getElementById("DecelR2");
    switch (n) {
        case 1:
            decelR1Btn(btnDecelR1, btnDecelR2);
            break;
        case 2:
            decelR2Btn(btnDecelR1, btnDecelR2);
            break;
    }
}
function decelR1Btn(btnDecelR1, btnDecelR2) {
    btnDecelR1.addEventListener("click", function () {
        rocketDeceleration(r1, 1);
        showSpeed(r1, "speeds");
    });
}
function decelR2Btn(btnDecelR1, btnDecelR2) {
    btnDecelR2.addEventListener("click", function () {
        rocketDeceleration(r2, 1);
        showSpeed(r2, "speeds");
    });
}
