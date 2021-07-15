var Football;
(function (Football) {
    var Ball = /** @class */ (function () {
        function Ball(_position, _velocity) {
            this.position = _position;
            this.velocity = _velocity;
            this.decreaseFactor = 0;
            this.out = false;
        }
        Ball.prototype.draw = function () {
            Football.crc2.beginPath();
            Football.crc2.arc(this.position.x, this.position.y, 5.52, 0, 2 * Math.PI, false);
            Football.crc2.fillStyle = "#FFF";
            Football.crc2.fill();
            Football.crc2.strokeStyle = "#000";
            Football.crc2.stroke();
            Football.crc2.closePath();
        };
        Ball.prototype.move = function () {
            var offset = this.velocity.copy();
            offset.scale(this.decreaseFactor);
            this.position.add(offset);
            if (this.decreaseFactor > 0) {
                this.decreaseFactor -= 0.0005;
            }
            else {
                this.decreaseFactor = 0;
            }
            if (this.position.x < 20 && this.position.y < (Football.crc2.canvas.height - 20) / 2 + 22 && this.position.y > (Football.crc2.canvas.height - 20) / 2 - 22) {
                console.log('GOAL - left');
                this.position.set(Football.crc2.canvas.width / 2, Football.crc2.canvas.height / 2);
                this.decreaseFactor = 0;
                Football.gameState = 'start';
                Football.red++;
                Football.pointDiv.innerHTML = Football.blue + ' : ' + Football.red;
                Football.createPlayerPositions();
                for (var i = 1; i < Football.players.length; i++) {
                    Football.players[i].position = Football.startPositions[i];
                }
            }
            if (this.position.x > Football.crc2.canvas.width - 20 && this.position.y < (Football.crc2.canvas.height - 20) / 2 + 22 && this.position.y > (Football.crc2.canvas.height - 20) / 2 - 22) {
                console.log('GOAL - right');
                this.position.set(Football.crc2.canvas.width / 2, Football.crc2.canvas.height / 2);
                this.decreaseFactor = 0;
                Football.gameState = 'start';
                Football.blue++;
                Football.pointDiv.innerHTML = Football.blue + ' : ' + Football.red;
                Football.createPlayerPositions();
                for (var i = 1; i < Football.players.length; i++) {
                    Football.players[i].position = Football.startPositions[i];
                }
            }
            if (this.position.x < 20 || this.position.y < 20 || this.position.x > Football.crc2.canvas.width - 20 || this.position.y > Football.crc2.canvas.height - 20) {
                if (!this.out) {
                    for (var _i = 0, players_1 = Football.players; _i < players_1.length; _i++) {
                        var player = players_1[_i];
                        if (player.lastContact == true) {
                            Football.playedOut = player.team;
                            player.lastContact = false;
                        }
                    }
                    Football.gameState = 'out';
                }
                this.out = true;
                this.decreaseFactor = 0;
            }
            else {
                this.out = false;
            }
            if (this.position.x < 20)
                setTimeout(this.outPlay('left'), 1000);
            if (this.position.y < 20)
                setTimeout(this.outPlay('top'), 1000);
            if (this.position.x > Football.crc2.canvas.width - 20)
                setTimeout(this.outPlay('right'), 1000);
            if (this.position.y > Football.crc2.canvas.height - 20)
                setTimeout(this.outPlay('bottom'), 1000);
        };
        Ball.prototype.outPlay = function (_side) {
            switch (_side) {
                case 'left':
                    this.position.x = 20;
                    return;
                case 'top':
                    this.position.y = 20;
                    return;
                case 'right':
                    this.position.x = Football.crc2.canvas.width - 20;
                    return;
                case 'bottom':
                    this.position.y = Football.crc2.canvas.height - 20;
                    return;
            }
        };
        return Ball;
    }());
    Football.Ball = Ball;
})(Football || (Football = {}));
//# sourceMappingURL=ball.js.map