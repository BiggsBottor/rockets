"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(id) {
        this.engines = new Array();
        this.id = id;
    }
    Rocket.prototype.addEngine = function (engine) {
        this.engines.push(engine);
    };
    return Rocket;
}());
