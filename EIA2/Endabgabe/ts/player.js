var Football;
(function (Football) {
    var Player = /** @class */ (function () {
        function Player(_team, _id, _position, _power, _runVelocity, _precision) {
            this.team = _team;
            this.id = _id;
            this.position = _position;
            this.velocity = new Football.Vector(0, 0);
            this.power = _power;
            this.runVelocity = _runVelocity;
            this.precision = _precision;
            this.decreaseFactor = 0;
            this.gotBall = false;
            this.lastContact = false;
        }
        Player.prototype.draw = function () {
            Football.crc2.beginPath();
            Football.crc2.arc(this.position.x, this.position.y, 7, 0, 2 * Math.PI, false);
            Football.crc2.fillStyle = this.team;
            Football.crc2.fill();
            Football.crc2.strokeStyle = "#000";
            Football.crc2.stroke();
            Football.crc2.closePath();
            // Radius ist viel zu groß... sieht aus wie bei einem Kreisliga Spiel wo alle dem Ball hinterher rennen
            // crc2.beginPath();
            // crc2.arc(this.position.x, this.position.y, 228.57, 0, 2 * Math.PI, false);
            // crc2.strokeStyle = "#000";
            // crc2.stroke();
            // crc2.closePath();
        };
        Player.prototype.move = function (_ballPosition) {
            var x = _ballPosition.x - this.position.x;
            var y = _ballPosition.y - this.position.y;
            var distance = Math.sqrt(x * x + y * y);
            if (distance < 228.57 && distance > 10 && Football.gameState == 'play' || Football.gameState == 'out') {
                x = x / distance * 100;
                y = y / distance * 100;
                this.velocity.set(x, y);
                var offset = this.velocity.copy();
                offset.scale(this.runVelocity);
                offset.scale(0.01);
                this.position.add(offset);
            }
            else {
                this.velocity.set(0, 0);
            }
            if (distance < 10) {
                Football.gameState = 'pause';
                for (var _i = 0, players_1 = Football.players; _i < players_1.length; _i++) {
                    var player = players_1[_i];
                    player.lastContact = false;
                }
                this.lastContact = true;
                this.gotBall = true;
                Football.ball.velocity.set(0, 0);
                for (var _a = 0, players_2 = Football.players; _a < players_2.length; _a++) {
                    var player = players_2[_a];
                    player.velocity.set(0, 0);
                }
            }
            if (this.position.x < 0 || this.position.y < 0 || this.position.x > Football.crc2.canvas.width || this.position.y > Football.crc2.canvas.height) {
                console.log('player aus');
            }
        };
        Player.prototype.showInfo = function (_mousePositionX, _mousePositionY) {
            var x = _mousePositionX - this.position.x;
            var y = _mousePositionY - this.position.y;
            var distance = Math.sqrt(x * x + y * y);
            if (distance < 10) {
                if (!Football.infoShow) {
                    console.log('player hover');
                    Football.playerNumber.innerHTML = 'Number: ' + this.id;
                    Football.playerPower.innerHTML = 'Shooting Power: ' + this.power;
                    Football.playerVelo.innerHTML = 'Velocity: ' + this.runVelocity.toFixed(3);
                    Football.playerPrec.innerHTML = 'Precision: ' + this.precision;
                    Football.infoShow = true;
                }
            }
            else {
                if (Football.infoShow) {
                    Football.infoShow = false;
                }
            }
        };
        return Player;
    }());
    Football.Player = Player;
})(Football || (Football = {}));
//# sourceMappingURL=player.js.map