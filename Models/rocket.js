"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(id) {
        this.engines = new Array();
        this.id = id;
    }
    Rocket.prototype.addEngine = function (engine) {
        this.engines.push(engine);
    };
    Rocket.prototype.accelerate = function () {
        for (var _i = 0, _a = this.engines; _i < _a.length; _i++) {
            var engine = _a[_i];
            if (engine.engineAtualSpeed < engine.engineMaxPower) {
                engine.engineAtualSpeed += 10;
            }
        }
    };
    Rocket.prototype.decelerate = function () {
        for (var _i = 0, _a = this.engines; _i < _a.length; _i++) {
            var engine = _a[_i];
            if (engine.engineAtualSpeed > 0) {
                engine.engineAtualSpeed -= 10;
            }
        }
    };
    return Rocket;
}());
