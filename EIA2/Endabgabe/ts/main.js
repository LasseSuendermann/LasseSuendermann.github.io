var Football;
(function (Football) {
    Football.players = [];
    Football.startPositions = [];
    var canvas;
    Football.gameState = 'start';
    Football.playedOut = '';
    Football.red = 0;
    Football.blue = 0;
    Football.infoShow = false;
    var mousePositionX;
    var mousePositionY;
    var popup;
    var popupMessage;
    var popupOk;
    var playerToDeleteIndex;
    var locationTrack = false;
    var teamAdd = '';
    var shootingMin;
    var shootingMax;
    var veloMin;
    var veloMax;
    var precMin;
    var precMax;
    window.addEventListener('load', function () {
        canvas = document.querySelector('canvas');
        Football.crc2 = canvas.getContext("2d");
        Football.pointDiv = document.querySelector('.points p');
        Football.playerInf = document.querySelector('.player-info');
        Football.playerNumber = document.querySelector('.player-info .number');
        Football.playerPower = document.querySelector('.player-info .power');
        Football.playerVelo = document.querySelector('.player-info .run');
        Football.playerPrec = document.querySelector('.player-info .precision');
        popup = document.querySelector('.popup');
        popupMessage = document.querySelector('.popup p');
        popupOk = document.querySelector('.popup .ok');
        shootingMin = document.querySelector('#shootMin');
        shootingMax = document.querySelector('#shootMax');
        veloMin = document.querySelector('#veloMin');
        veloMax = document.querySelector('#veloMax');
        precMin = document.querySelector('#precMin');
        precMax = document.querySelector('#precMax');
        drawBackground();
        createPlayers();
        var ballPosition = new Football.Vector(canvas.width / 2, canvas.height / 2);
        var ballVelocity = new Football.Vector(0, 0);
        Football.ball = new Football.Ball(ballPosition, ballVelocity);
        // ball.draw()
        canvas.addEventListener('click', shootBall);
        canvas.addEventListener('mousemove', hover);
        popupOk.addEventListener('click', onClickOk);
        window.setInterval(update, 20);
    });
    function hover(_event) {
        mousePositionX = _event.offsetX;
        mousePositionY = _event.offsetY;
    }
    function createPlayerPositions() {
        Football.startPositions = [
            new Football.Vector(canvas.width / 1.7, canvas.height / 1.55),
            new Football.Vector(canvas.width / 1.7, canvas.height / 2.05),
            new Football.Vector(canvas.width / 1.7, canvas.height / 3.05),
            new Football.Vector(canvas.width / 1.3, canvas.height / 3.05),
            new Football.Vector(canvas.width / 3, canvas.height / 4.05),
            new Football.Vector(canvas.width / 1.3, canvas.height / 5.55),
            new Football.Vector(canvas.width / 3, canvas.height / 2.05),
            new Football.Vector(canvas.width / 1.3, canvas.height / 1.65),
            new Football.Vector(canvas.width / 3, canvas.height / 1.35),
            new Football.Vector(canvas.width / 1.3, canvas.height / 1.25),
            new Football.Vector(canvas.width / 1.05, canvas.height / 2.05),
            new Football.Vector(canvas.width - canvas.width / 1.7, canvas.height / 1.55),
            new Football.Vector(canvas.width - canvas.width / 1.7, canvas.height / 2.05),
            new Football.Vector(canvas.width - canvas.width / 1.7, canvas.height / 3.05),
            new Football.Vector(canvas.width - canvas.width / 1.3, canvas.height / 3.05),
            new Football.Vector(canvas.width - canvas.width / 3, canvas.height / 4.05),
            new Football.Vector(canvas.width - canvas.width / 1.3, canvas.height / 5.55),
            new Football.Vector(canvas.width - canvas.width / 3, canvas.height / 2.05),
            new Football.Vector(canvas.width - canvas.width / 1.3, canvas.height / 1.65),
            new Football.Vector(canvas.width - canvas.width / 3, canvas.height / 1.35),
            new Football.Vector(canvas.width - canvas.width / 1.3, canvas.height / 1.25),
            new Football.Vector(canvas.width - canvas.width / 1.05, canvas.height / 2.05),
        ];
    }
    Football.createPlayerPositions = createPlayerPositions;
    function createPlayers() {
        createPlayerPositions();
        for (var i = 0; i < Football.startPositions.length; i++) {
            var id = Number(((Math.random() * 99) + 1).toFixed());
            var team = 'blue';
            if (i < 11) {
                team = 'red';
            }
            var run = 0.5 + Math.random() * 1.5;
            var power = Number((2 + Math.random() * 2).toFixed());
            var precision = Number((1 + Math.random() * 3).toFixed());
            var player = new Football.Player(team, id, Football.startPositions[i], power, run, precision);
            Football.players.push(player);
        }
    }
    function drawBackground() {
        // Outer space
        Football.crc2.beginPath();
        Football.crc2.rect(0, 0, canvas.width, canvas.height);
        Football.crc2.fillStyle = "green";
        Football.crc2.fill();
        Football.crc2.stroke();
        Football.crc2.closePath();
        // Outer lines
        Football.crc2.beginPath();
        Football.crc2.rect(20, 20, (canvas.width - 40), (canvas.height - 40));
        Football.crc2.fillStyle = "green";
        Football.crc2.fill();
        Football.crc2.lineWidth = 1;
        Football.crc2.strokeStyle = "#FFF";
        Football.crc2.stroke();
        Football.crc2.closePath();
        Football.crc2.fillStyle = "#FFF";
        // Mid line
        Football.crc2.beginPath();
        Football.crc2.moveTo(canvas.width / 2, 20);
        Football.crc2.lineTo(canvas.width / 2, (canvas.height - 20));
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Mid circle
        Football.crc2.beginPath();
        Football.crc2.arc(canvas.width / 2, canvas.height / 2, 73, 0, 2 * (Math.PI), false);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Mid point
        Football.crc2.beginPath();
        Football.crc2.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI, false);
        Football.crc2.fill();
        Football.crc2.closePath();
        //Home penalty box
        Football.crc2.beginPath();
        Football.crc2.rect(20, ((canvas.height - 20) - 322) / 2, 132, 322);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Home goal box
        Football.crc2.beginPath();
        Football.crc2.rect(20, ((canvas.height - 20) - 146) / 2, 44, 146);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Home goal
        Football.crc2.beginPath();
        Football.crc2.moveTo(21, ((canvas.height - 20) / 2) - 22);
        Football.crc2.lineTo(21, ((canvas.height - 20) / 2) + 22);
        Football.crc2.lineWidth = 2;
        Football.crc2.stroke();
        Football.crc2.closePath();
        Football.crc2.lineWidth = 1;
        //Home penalty point
        Football.crc2.beginPath();
        Football.crc2.arc(108, (canvas.height - 20) / 2, 1, 0, 2 * Math.PI, true);
        Football.crc2.fill();
        Football.crc2.closePath();
        //Home half circle
        Football.crc2.beginPath();
        Football.crc2.arc(108, (canvas.height - 20) / 2, 73, 0.29 * Math.PI, 1.71 * Math.PI, true);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Away penalty box
        Football.crc2.beginPath();
        Football.crc2.rect((canvas.width - 20) - 132, ((canvas.height - 20) - 322) / 2, 132, 322);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Away goal box
        Football.crc2.beginPath();
        Football.crc2.rect((canvas.width - 20) - 44, ((canvas.height - 20) - 146) / 2, 44, 146);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Away goal
        Football.crc2.beginPath();
        Football.crc2.moveTo((canvas.width - 20) - 1, ((canvas.height - 20) / 2) - 22);
        Football.crc2.lineTo((canvas.width - 20) - 1, ((canvas.height - 20) / 2) + 22);
        Football.crc2.lineWidth = 2;
        Football.crc2.stroke();
        Football.crc2.closePath();
        Football.crc2.lineWidth = 1;
        //Away penalty point
        Football.crc2.beginPath();
        Football.crc2.arc((canvas.width - 20) - 88, (canvas.height - 20) / 2, 1, 0, 2 * Math.PI, true);
        Football.crc2.fill();
        Football.crc2.closePath();
        //Away half circle
        Football.crc2.beginPath();
        Football.crc2.arc((canvas.width - 20) - 88, (canvas.height - 20) / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Home L corner
        Football.crc2.beginPath();
        Football.crc2.arc(20, 20, 8, 0, 0.5 * Math.PI, false);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Home R corner
        Football.crc2.beginPath();
        Football.crc2.arc(20, (canvas.height - 20), 8, 1.5 * Math.PI, 2 * Math.PI, false);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Away R corner
        Football.crc2.beginPath();
        Football.crc2.arc((canvas.width - 20), 20, 8, 0.5 * Math.PI, Math.PI, false);
        Football.crc2.stroke();
        Football.crc2.closePath();
        //Away L corner
        Football.crc2.beginPath();
        Football.crc2.arc((canvas.width - 20), (canvas.height - 20), 8, Math.PI, 1.5 * Math.PI, false);
        Football.crc2.stroke();
        Football.crc2.closePath();
    }
    function update() {
        drawBackground();
        Football.ball.move();
        Football.ball.draw();
        if (Football.gameState == 'out') {
            var i = 0;
            if (Football.playedOut == 'red') {
                i = 20;
            }
            else if (Football.playedOut == 'blue') {
                i = 2;
            }
            Football.players[i].move(Football.ball.position);
            if (Football.players[i].gotBall == true) {
                Football.gameState = '';
                Football.playedOut = '';
            }
            // players[i].draw();
        }
        for (var _i = 0, players_1 = Football.players; _i < players_1.length; _i++) {
            var player = players_1[_i];
            if (Football.gameState != 'out') {
                player.move(Football.ball.position);
            }
            player.draw();
            player.showInfo(mousePositionX, mousePositionY);
        }
    }
    function shootBall(_event) {
        if (_event.offsetX > 0 && _event.offsetY > 0) {
            var activePlayer = void 0;
            var isPlayer = false;
            var isPlayerClicked = false;
            var playerClicked = void 0;
            var counter = 0;
            for (var _i = 0, players_2 = Football.players; _i < players_2.length; _i++) {
                var player = players_2[_i];
                if (player.gotBall) {
                    activePlayer = player;
                    isPlayer = true;
                }
                var x = _event.offsetX - player.position.x;
                var y = _event.offsetY - player.position.y;
                var distance = Math.sqrt(x * x + y * y);
                if (distance < 10) {
                    isPlayerClicked = true;
                    console.log('player clicked');
                    playerClicked = player;
                    playerToDeleteIndex = counter;
                }
                counter++;
            }
            if (isPlayerClicked) {
                popup.style.display = 'flex';
                popupMessage.innerHTML = 'Deleting Player ' + playerClicked.id + '.';
                popupOk.setAttribute('data-action', 'delete');
                teamAdd = playerClicked.team;
            }
            if (locationTrack) {
                var runMin = Number(veloMin.value);
                var runMax = Number(veloMax.value);
                var powerMin = Number(shootingMin.value);
                var powerMax = Number(shootingMax.value);
                var precisionMin = Number(precMin.value);
                var precisionMax = Number(precMax.value);
                var startPosition = new Football.Vector(_event.offsetX, _event.offsetY);
                var id = Number(((Math.random() * 99) + 1).toFixed());
                var team = teamAdd;
                var run = runMin + Math.random() * (runMax - runMin);
                var power = Number((powerMin + Math.random() * (powerMax - powerMin)).toFixed());
                var precision = Number((precisionMin + Math.random() * (precisionMax - precisionMin)).toFixed());
                console.log(power);
                var player = new Football.Player(team, id, startPosition, power, run, precision);
                Football.players.push(player);
                teamAdd = '';
            }
            if (isPlayer || Football.gameState == 'start' && !isPlayerClicked && !locationTrack) {
                Football.gameState = 'play';
                var point = new Football.Vector(_event.offsetX, _event.offsetY);
                Football.gameState = 'play';
                var velocityX = point.x - Football.ball.position.x;
                var velocityY = point.y - Football.ball.position.y;
                var distance = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
                if (200 < distance) {
                    console.log('max distance');
                    var v = new Football.Vector(velocityX, velocityY);
                    var angle = Math.atan2(point.y - Football.ball.position.y, point.x - Football.ball.position.x);
                    if (angle < 0) {
                        angle += 2 * Math.PI;
                    }
                    if (isPlayer) {
                        if (activePlayer.precision == 1) {
                            v.random(1.08, 0.9, distance / 2, angle - (0.03 * Math.PI), angle - (0.07 * Math.PI), angle + (0.03 * Math.PI), angle + (0.07 * Math.PI));
                        }
                        else if (activePlayer.precision == 2) {
                            v.random(1.07, 1.0, distance / 2, angle - (0.02 * Math.PI), angle - (0.06 * Math.PI), angle + (0.02 * Math.PI), angle + (0.06 * Math.PI));
                        }
                        else if (activePlayer.precision == 3) {
                            v.random(1.05, 1.1, distance / 2, angle - (0.01 * Math.PI), angle - (0.05 * Math.PI), angle + (0.01 * Math.PI), angle + (0.05 * Math.PI));
                        }
                    }
                    Football.ball.velocity = v;
                    console.log(Football.ball.velocity);
                }
                else {
                    Football.ball.velocity.set(velocityX, velocityY);
                }
                var power = void 0;
                if (!isPlayer) {
                    power = 3;
                }
                else {
                    power = activePlayer.power;
                    activePlayer.gotBall = false;
                }
                Football.ball.velocity.scale(power);
                Football.ball.decreaseFactor = 0.02;
                // ball.velocity = power;
            }
            locationTrack = false;
        }
        // console.log(_event.offsetX, _event.offsetY)
    }
    function onClickOk() {
        var dataAction = popupOk.getAttribute('data-action');
        if (dataAction == 'delete') {
            Football.players.splice(playerToDeleteIndex, 1);
            popupMessage.innerHTML = 'click on location for new player';
            popupOk.setAttribute('data-action', 'ok');
        }
        else if (dataAction == 'ok') {
            popup.style.display = 'none';
            locationTrack = true;
        }
    }
})(Football || (Football = {}));
//# sourceMappingURL=main.js.map