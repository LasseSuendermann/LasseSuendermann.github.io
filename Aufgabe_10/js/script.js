var ToDo = [
    { todosText: "Lorem",
        todosChecked: false
    },
    {
        todosText: "Ipsum",
        todosChecked: true
    }
];
var inputDOMElement;
var addButtonDOMElement;
var todosDOMElement;
var counterDOMElement;
window.addEventListener("load", function () {
    inputDOMElement = document.querySelector("#inputTodo");
    addButtonDOMElement = document.querySelector("#addButton");
    todosDOMElement = document.querySelector("#todos");
    counterDOMElement = document.querySelector("#counter");
    addButtonDOMElement.addEventListener("click", addTodo);
    drawListToDOM();
});
function drawListToDOM() {
    todosDOMElement.innerHTML = "";
    var _loop_1 = function (index) {
        var todo = document.createElement("div");
        todo.classList.add("todo");
        todo.innerHTML = "<span class='check " + ToDo[index].todosChecked + "'><i class='fas fa-check'></i></span>"
            + ToDo[index].todosText +
            "<span class='trash fas fa-trash-alt'></span>";
        todo.querySelector(".check").addEventListener("click", function () {
            toggleCheckState(index);
        });
        todo.querySelector(".trash").addEventListener("click", function () {
            deleteTodo(index);
        });
        todosDOMElement.appendChild(todo);
    };
    for (var index = 0; index < ToDo.length; index++) {
        _loop_1(index);
    }
    updateCounter();
}
function updateCounter() {
    var checked = 0;
    var unchecked = 0;
    for (var index = 0; index < ToDo.length; index++) {
        if (ToDo[index].todosChecked == true) {
            checked++;
        }
        else {
            unchecked++;
        }
    }
    counterDOMElement.innerHTML = ToDo.length + " in total " + checked + " done " + unchecked + " open ";
}
function addTodo() {
    if (inputDOMElement.value != "") {
        var new1 = {
            todosText: (inputDOMElement.value),
            todosChecked: false
        };
        ToDo.unshift(new1);
        inputDOMElement.value = "";
        drawListToDOM();
    }
}
function toggleCheckState(index) {
    ToDo[index].todosChecked = !ToDo[index].todosChecked;
    drawListToDOM();
}
function deleteTodo(index) {
    ToDo.splice(index, 1);
    drawListToDOM();
}
window.addEventListener("load", function () {
    var artyom = new Artyom();
    artyom.addCommands({
        indexes: ["erstelle Aufgabe *"],
        smart: true,
        action: function (i, wildcard) {
            inputDOMElement.value = wildcard;
            addTodo();
        }
    });
    function startContinuousArtyom() {
        artyom.fatality();
        setTimeout(function () {
            artyom.initialize({
                lang: "de-DE",
                continuous: true,
                listen: true,
                interimResults: true,
                debug: true
            }).then(function () {
                console.log("Ready!");
            });
        }, 250);
    }
    startContinuousArtyom();
});
//# sourceMappingURL=script.js.map