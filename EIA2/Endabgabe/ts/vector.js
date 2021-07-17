var Football;
(function (Football) {
    var Vector = /** @class */ (function () {
        function Vector(_x, _y) {
            this.set(_x, _y);
        }
        Vector.prototype.set = function (_x, _y) {
            this.x = _x;
            this.y = _y;
        };
        Vector.prototype.scale = function (_factor) {
            this.x *= Number(_factor);
            this.y *= Number(_factor);
        };
        Vector.prototype.add = function (_addend) {
            this.x += Number(_addend.x.toFixed());
            this.y += Number(_addend.y.toFixed());
        };
        Vector.prototype.random = function (_minLength, _maxLength, _vectorLength, _minAngle1, _maxAngle1, _minAngle2, _maxAngle2) {
            var length = _minLength + Math.random() * (_maxLength - _minLength);
            var direction1 = _minAngle1 + Math.random() * (_maxAngle1 - _minAngle1);
            var direction2 = _minAngle2 + Math.random() * (_maxAngle2 - _minAngle2);
            var direction = direction1 + Math.random() * (direction1 - direction2);
            var cos = Math.cos(direction) * _vectorLength;
            var sin = Math.sin(direction) * _vectorLength;
            this.set(Number(cos.toFixed()), Number(sin.toFixed()));
            this.scale(length);
        };
        Vector.prototype.copy = function () {
            return new Vector(this.x, this.y);
        };
        return Vector;
    }());
    Football.Vector = Vector;
})(Football || (Football = {}));
//# sourceMappingURL=vector.js.map