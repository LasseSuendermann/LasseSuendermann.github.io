namespace Football {
    export class Ball {
        position: Vector;
        velocity: Vector;
        decreaseFactor: number;
        out: boolean;

        constructor(_position: Vector, _velocity: Vector) {
            this.position = _position;
            this.velocity = _velocity;
            this.decreaseFactor = 0;
            this.out = false;
        }

        draw(): void {
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 5.52, 0, 2 * Math.PI, false);
            crc2.fillStyle = "#FFF";
            crc2.fill();
            crc2.strokeStyle = "#000";
            crc2.stroke();
            crc2.closePath();
        }

        move(): void {

            let offset: Vector = this.velocity.copy();
            offset.scale(this.decreaseFactor);
            this.position.add(offset);
            if (this.decreaseFactor > 0) {
                this.decreaseFactor -= 0.0005;
            } else {
                this.decreaseFactor = 0;
            }

            if (this.position.x < 20 && this.position.y < (crc2.canvas.height - 20) / 2 + 22 && this.position.y > (crc2.canvas.height - 20) / 2 - 22) {
                console.log('GOAL - left')
                this.position.set(crc2.canvas.width / 2, crc2.canvas.height / 2);
                this.decreaseFactor = 0;
                gameState = 'start';
                red++;
                pointDiv.innerHTML = blue + ' : ' + red;
                createPlayerPositions()
                for (let i:number = 1; i < players.length; i++) {
                    players[i].position = startPositions[i]
                }
            }

            if (this.position.x > crc2.canvas.width - 20 && this.position.y < (crc2.canvas.height - 20) / 2 + 22 && this.position.y > (crc2.canvas.height - 20) / 2 - 22) {
                console.log('GOAL - right')
                this.position.set(crc2.canvas.width / 2, crc2.canvas.height / 2);
                this.decreaseFactor = 0;
                gameState = 'start';
                blue++;
                pointDiv.innerHTML = blue + ' : ' + red;
                createPlayerPositions()
                for (let i:number = 1; i < players.length; i++) {
                    players[i].position = startPositions[i]
                }
            }

            if (this.position.x < 20 || this.position.y < 20 || this.position.x > crc2.canvas.width - 20 || this.position.y > crc2.canvas.height - 20) {
                if (!this.out) {
                    for (let player of players) {
                        if (player.lastContact == true) {
                            playedOut = player.team
                            player.lastContact = false;
                        }
                    }
                    gameState = 'out';
                }
                this.out = true;
                this.decreaseFactor = 0;
            } else {
                this.out = false;
            }
            if (this.position.x < 20)
                setTimeout(this.outPlay('left'), 1000);
            if (this.position.y < 20)
                setTimeout(this.outPlay('top'), 1000);
            if (this.position.x > crc2.canvas.width - 20)
                setTimeout(this.outPlay('right'), 1000);
            if (this.position.y > crc2.canvas.height - 20)
                setTimeout(this.outPlay('bottom'), 1000);
        }

        private outPlay(_side): TimerHandler {
            switch (_side) {
                case 'left':
                    this.position.x = 20
                    return
                case 'top':
                    this.position.y = 20
                    return
                case 'right':
                    this.position.x = crc2.canvas.width - 20
                    return
                case 'bottom':
                    this.position.y = crc2.canvas.height - 20
                    return
            }
        }
    }


}