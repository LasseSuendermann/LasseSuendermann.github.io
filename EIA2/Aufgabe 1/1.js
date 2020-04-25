var Boxes;
(function (Boxes) {
    var n = 5;
    var color;
    var x = 0;
    var y = 0;
    window.addEventListener("load", drawboxes);
    function drawboxes() {
        for (var i = 0; i < n; i++) {
            y += (i == 2) ? 20 : 50;
            x = (x + 170) % 400;
            switch (i) {
                case 0:
                    color = "#ff0000";
                    break;
                case 1:
                case 4:
                    color = "#00ff00";
                    break;
                case 3:
                    continue;
                default:
                    color = "#0000ff";
            }
            for (var _i = 0, _a = ["big", "medium", "small"]; _i < _a.length; _i++) {
                var size = _a[_i];
                createBox(color, x, y, size);
                if (i == 4)
                    break;
            }
        }
    }
    function createBox(_color, _x, _y, _size) {
        var div = document.createElement("div");
        document.body.appendChild(div);
        div.classList.add(_size);
        div.style.backgroundColor = _color;
        div.style.left = _x + "px";
        div.style.top = _y + "px";
    }
})(Boxes || (Boxes = {}));
//# sourceMappingURL=1.js.map