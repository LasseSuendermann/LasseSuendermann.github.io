namespace Football {

    export let crc2: CanvasRenderingContext2D;
    export let players: Player[] = [];
    export let startPositions: Vector[] = [];
    export let ball: Ball;
    let canvas: HTMLCanvasElement;
    export let gameState: string = 'start'
    export let playedOut: string = '';
    export let red: number = 0;
    export let blue: number = 0;
    export let pointDiv: HTMLElement;
    export let playerInf: HTMLDivElement;
    export let playerNumber: HTMLElement;
    export let playerPower: HTMLElement;
    export let playerVelo: HTMLElement;
    export let playerPrec: HTMLElement;
    export let infoShow: boolean = false;
    let mousePositionX: number;
    let mousePositionY: number;

    window.addEventListener('load', function () {
        canvas = document.querySelector('canvas')
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        pointDiv = document.querySelector('.points p');
        playerInf = document.querySelector('.player-info');
        playerNumber = document.querySelector('.player-info .number');
        playerPower = document.querySelector('.player-info .power');
        playerVelo = document.querySelector('.player-info .run');
        playerPrec = document.querySelector('.player-info .precision');

        drawBackground();

        createPlayers();


        let ballPosition: Vector = new Vector(canvas.width / 2, canvas.height / 2);
        let ballVelocity: Vector = new Vector(0, 0)

        ball = new Ball(ballPosition, ballVelocity)


        // ball.draw()

        canvas.addEventListener('click', shootBall)
        canvas.addEventListener('mousemove', hover)

        window.setInterval(update, 20);


    })

    function hover(_event) {
        mousePositionX = _event.offsetX;
        mousePositionY = _event.offsetY;
    }

    export function createPlayerPositions(): void {
        startPositions = [
            new Vector(canvas.width / 1.7, canvas.height / 1.55),
            new Vector(canvas.width / 1.7, canvas.height / 2.05),
            new Vector(canvas.width / 1.7, canvas.height / 3.05),
            new Vector(canvas.width / 1.3, canvas.height / 3.05),
            new Vector(canvas.width / 3, canvas.height / 4.05),
            new Vector(canvas.width / 1.3, canvas.height / 5.55),
            new Vector(canvas.width / 3, canvas.height / 2.05),
            new Vector(canvas.width / 1.3, canvas.height / 1.65),
            new Vector(canvas.width / 3, canvas.height / 1.35),
            new Vector(canvas.width / 1.3, canvas.height / 1.25),
            new Vector(canvas.width / 1.05, canvas.height / 2.05),

            new Vector(canvas.width - canvas.width / 1.7, canvas.height / 1.55),
            new Vector(canvas.width - canvas.width / 1.7, canvas.height / 2.05),
            new Vector(canvas.width - canvas.width / 1.7, canvas.height / 3.05),
            new Vector(canvas.width - canvas.width / 1.3, canvas.height / 3.05),
            new Vector(canvas.width - canvas.width / 3, canvas.height / 4.05),
            new Vector(canvas.width - canvas.width / 1.3, canvas.height / 5.55),
            new Vector(canvas.width - canvas.width / 3, canvas.height / 2.05),
            new Vector(canvas.width - canvas.width / 1.3, canvas.height / 1.65),
            new Vector(canvas.width - canvas.width / 3, canvas.height / 1.35),
            new Vector(canvas.width - canvas.width / 1.3, canvas.height / 1.25),
            new Vector(canvas.width - canvas.width / 1.05, canvas.height / 2.05),
        ]
    }

    function createPlayers() {

        createPlayerPositions();

        for (let i: number = 0; i < startPositions.length; i++) {
            let id: number = Number(((Math.random() * 99) + 1).toFixed())
            let team: string = 'blue';
            if (i < 11) {
                team = 'red';
            }
            let run: number = 0.5 + Math.random() * 1.5
            let power: number = Number((2 + Math.random() * 2).toFixed())
            let precision: number = Number((1 + Math.random() * 3).toFixed())
            let player = new Player(team, id, startPositions[i], power, run, precision)
            players.push(player)
        }
    }

    function drawBackground(): void {
        // Outer space
        crc2.beginPath();
        crc2.rect(0, 0, canvas.width, canvas.height);
        crc2.fillStyle = "green";
        crc2.fill();
        crc2.stroke();
        crc2.closePath();

        // Outer lines
        crc2.beginPath();
        crc2.rect(20, 20, (canvas.width - 40), (canvas.height - 40));
        crc2.fillStyle = "green";
        crc2.fill();
        crc2.lineWidth = 1;
        crc2.strokeStyle = "#FFF";
        crc2.stroke();
        crc2.closePath();

        crc2.fillStyle = "#FFF";

        // Mid line
        crc2.beginPath();
        crc2.moveTo(canvas.width / 2, 20);
        crc2.lineTo(canvas.width / 2, (canvas.height - 20));
        crc2.stroke();
        crc2.closePath();

        //Mid circle
        crc2.beginPath()
        crc2.arc(canvas.width / 2, canvas.height / 2, 73, 0, 2 * (Math.PI), false);
        crc2.stroke();
        crc2.closePath();
        //Mid point
        crc2.beginPath()
        crc2.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI, false);
        crc2.fill()
        crc2.closePath();

        //Home penalty box
        crc2.beginPath();
        crc2.rect(20, ((canvas.height - 20) - 322) / 2, 132, 322);
        crc2.stroke();
        crc2.closePath();
        //Home goal box
        crc2.beginPath();
        crc2.rect(20, ((canvas.height - 20) - 146) / 2, 44, 146);
        crc2.stroke();
        crc2.closePath();
        //Home goal
        crc2.beginPath();
        crc2.moveTo(21, ((canvas.height - 20) / 2) - 22);
        crc2.lineTo(21, ((canvas.height - 20) / 2) + 22);
        crc2.lineWidth = 2;
        crc2.stroke();
        crc2.closePath();
        crc2.lineWidth = 1;

        //Home penalty point
        crc2.beginPath()
        crc2.arc(108, (canvas.height - 20) / 2, 1, 0, 2 * Math.PI, true);
        crc2.fill();
        crc2.closePath();
        //Home half circle
        crc2.beginPath()
        crc2.arc(108, (canvas.height - 20) / 2, 73, 0.29 * Math.PI, 1.71 * Math.PI, true);
        crc2.stroke();
        crc2.closePath();

        //Away penalty box
        crc2.beginPath();
        crc2.rect((canvas.width - 20) - 132, ((canvas.height - 20) - 322) / 2, 132, 322);
        crc2.stroke();
        crc2.closePath();
        //Away goal box
        crc2.beginPath();
        crc2.rect((canvas.width - 20) - 44, ((canvas.height - 20) - 146) / 2, 44, 146);
        crc2.stroke();
        crc2.closePath();
        //Away goal
        crc2.beginPath();
        crc2.moveTo((canvas.width - 20) - 1, ((canvas.height - 20) / 2) - 22);
        crc2.lineTo((canvas.width - 20) - 1, ((canvas.height - 20) / 2) + 22);
        crc2.lineWidth = 2;
        crc2.stroke();
        crc2.closePath();
        crc2.lineWidth = 1;
        //Away penalty point
        crc2.beginPath()
        crc2.arc((canvas.width - 20) - 88, (canvas.height - 20) / 2, 1, 0, 2 * Math.PI, true);
        crc2.fill();
        crc2.closePath();
        //Away half circle
        crc2.beginPath()
        crc2.arc((canvas.width - 20) - 88, (canvas.height - 20) / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
        crc2.stroke();
        crc2.closePath();

        //Home L corner
        crc2.beginPath()
        crc2.arc(20, 20, 8, 0, 0.5 * Math.PI, false);
        crc2.stroke();
        crc2.closePath();
        //Home R corner
        crc2.beginPath()
        crc2.arc(20, (canvas.height - 20), 8, 1.5 * Math.PI, 2 * Math.PI, false);
        crc2.stroke();
        crc2.closePath();
        //Away R corner
        crc2.beginPath()
        crc2.arc((canvas.width - 20), 20, 8, 0.5 * Math.PI, Math.PI, false);
        crc2.stroke();
        crc2.closePath();
        //Away L corner
        crc2.beginPath()
        crc2.arc((canvas.width - 20), (canvas.height - 20), 8, Math.PI, 1.5 * Math.PI, false);
        crc2.stroke();
        crc2.closePath();
    }

    function update(): void {
        drawBackground();

        ball.move();
        ball.draw();

        if (gameState == 'out') {
            let i: number = 0;
            if (playedOut == 'red') {
                i = 20;
            } else if (playedOut == 'blue') {
                i = 2;
            }
            players[i].move(ball.position);
            if (players[i].gotBall == true) {
                gameState = '';
                playedOut = '';
            }
            // players[i].draw();
        }

        for (let player of players) {
            if (gameState != 'out') {
                player.move(ball.position);
            }
            player.draw();
            player.showInfo(mousePositionX, mousePositionY);
        }

    }

    function shootBall(_event): void {
        if (_event.offsetX > 0 && _event.offsetY > 0) {

            let activePlayer: Player;
            let isPlayer: boolean = false;
            let playerClicked: boolean = false;

            for (let player of players) {
                if (player.gotBall) {
                    activePlayer = player;
                    isPlayer = true;
                }
                let x: number = _event.offsetX - player.position.x
                let y: number = _event.offsetY - player.position.y
                let distance: number = Math.sqrt(x * x + y * y)
                if (distance < 10) {
                    playerClicked = true;
                    console.log('player clicked')
                }
            }

            if (isPlayer || gameState == 'start' && !playerClicked) {
                gameState = 'play';
                let point: Vector = new Vector(_event.offsetX, _event.offsetY)
                gameState = 'play';
                let velocityX: number = point.x - ball.position.x;
                let velocityY: number = point.y - ball.position.y;
                // let maxDistance: number = 200;
                let distance: number = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

                if (200 < distance) {
                    console.log('max distance')
                    let v: Vector = new Vector(velocityX, velocityY)
                    let angle: number = Math.atan2(point.y - ball.position.y, point.x - ball.position.x)
                    if (angle < 0) {
                        angle += 2 * Math.PI;
                    }
                    if (isPlayer) {
                        if (activePlayer.precision == 1) {
                            v.random(1.08, 0.9, distance / 2, angle - (0.03 * Math.PI), angle - (0.07 * Math.PI), angle + (0.03 * Math.PI), angle + (0.07 * Math.PI))
                        } else if (activePlayer.precision == 2) {
                            v.random(1.07, 1.0, distance / 2, angle - (0.02 * Math.PI), angle - (0.06 * Math.PI), angle + (0.02 * Math.PI), angle + (0.06 * Math.PI))
                        } else if (activePlayer.precision == 3) {
                            v.random(1.05, 1.1, distance / 2, angle - (0.01 * Math.PI), angle - (0.05 * Math.PI), angle + (0.01 * Math.PI), angle + (0.05 * Math.PI))
                        }
                    }

                    ball.velocity = v
                    console.log(ball.velocity)
                } else {
                    ball.velocity.set(velocityX, velocityY)
                }

                // if (maxDistance < distance) {
                //     let p: number = (maxDistance * 100 / distance)/100;
                //     ball.velocity.scale(p)
                //     console.log('reached max distance')
                // }
                let power: number;
                if (!isPlayer) {
                    power = 3;
                } else {
                    power = activePlayer.power;
                    activePlayer.gotBall = false;
                }
                ball.velocity.scale(power)
                ball.decreaseFactor = 0.02;
                // ball.velocity = power;


            }
        }
        // console.log(_event.offsetX, _event.offsetY)
    }
}

