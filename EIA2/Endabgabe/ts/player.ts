namespace Football {
    export class Player {
        team: string
        id: number;
        position: Vector;
        velocity: Vector;
        power: number;
        runVelocity: number;
        precision: number;
        decreaseFactor: number;
        gotBall: boolean;
        lastContact: boolean;

        constructor(_team: string, _id: number, _position: Vector, _power: number, _runVelocity: number, _precision: number) {
            this.team = _team;
            this.id = _id;
            this.position = _position;
            this.velocity = new Vector(0, 0);
            this.power = _power;
            this.runVelocity = _runVelocity;
            this.precision = _precision;
            this.decreaseFactor = 0
            this.gotBall = false;
            this.lastContact = false;
        }

        draw(): void {
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 7, 0, 2 * Math.PI, false);
            crc2.fillStyle = this.team;
            crc2.fill();
            crc2.strokeStyle = "#000";
            crc2.stroke();
            crc2.closePath();

            // Radius ist viel zu groß... sieht aus wie bei einem Kreisliga Spiel wo alle dem Ball hinterher rennen

            // crc2.beginPath();
            // crc2.arc(this.position.x, this.position.y, 228.57, 0, 2 * Math.PI, false);
            // crc2.strokeStyle = "#000";
            // crc2.stroke();
            // crc2.closePath();
        }

        move(_ballPosition: Vector): void {
            let x: number = _ballPosition.x - this.position.x;
            let y: number = _ballPosition.y - this.position.y;
            let distance: number = Math.sqrt(x * x + y * y);
            if (distance < 228.57 && distance > 10 && gameState == 'play' || gameState == 'out') {
                x = x / distance * 100
                y = y / distance * 100
                this.velocity.set(x, y)
                let offset: Vector = this.velocity.copy();
                offset.scale(this.runVelocity);
                offset.scale(0.01)
                this.position.add(offset);

            } else {
                this.velocity.set(0, 0)
            }

            if (distance < 10) {
                gameState = 'pause';
                for (let player of players) {
                    player.lastContact = false;
                }
                this.lastContact = true;
                this.gotBall = true;
                ball.velocity.set(0, 0)
                for (let player of players) {
                    player.velocity.set(0, 0)
                }
            }

            if (this.position.x < 0 || this.position.y < 0 || this.position.x > crc2.canvas.width || this.position.y > crc2.canvas.height) {
                console.log('player aus')
            }
        }

        showInfo(_mousePositionX, _mousePositionY): void {
            let x: number = _mousePositionX - this.position.x
            let y: number = _mousePositionY - this.position.y
            let distance: number = Math.sqrt(x * x + y * y)
            if (distance < 10) {
                if (!infoShow) {
                    console.log('player hover')
                    playerNumber.innerHTML = 'Number: ' + this.id;
                    playerPower.innerHTML = 'Shooting Power: ' + this.power;
                    playerVelo.innerHTML = 'Velocity: ' + this.runVelocity.toFixed(3);
                    playerPrec.innerHTML = 'Precision: ' + this.precision;
                    infoShow = true;
                }
            } else {
                if (infoShow) {
                    infoShow = false;
                }
            }
        }

    }
}
