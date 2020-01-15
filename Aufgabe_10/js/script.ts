interface Interface {
    todosText: string;
    todosChecked: boolean;
}

var ToDo: Interface[] = [
    {todosText: "Lorem",
    todosChecked: false
},
{
    todosText: "Ipsum",
    todosChecked: true
}
];

var inputDOMElement: HTMLInputElement;
var addButtonDOMElement: HTMLElement;
var todosDOMElement: HTMLElement;
var counterDOMElement: HTMLElement;

window.addEventListener("load", function(): void {
    inputDOMElement = document.querySelector("#inputTodo");
    addButtonDOMElement = document.querySelector("#addButton");
    todosDOMElement = document.querySelector("#todos");
    counterDOMElement = document.querySelector("#counter");
    addButtonDOMElement.addEventListener("click", addTodo);
    drawListToDOM();
});

function drawListToDOM(): void {
    todosDOMElement.innerHTML = "";
    for (let index: number = 0; index < ToDo.length; index++) {
        let todo: HTMLElement = document.createElement("div");
        todo.classList.add("todo");
        todo.innerHTML =  "<span class='check " + ToDo[index].todosChecked + "'><i class='fas fa-check'></i></span>"
                            + ToDo[index].todosText +
                            "<span class='trash fas fa-trash-alt'></span>";
        todo.querySelector(".check").addEventListener("click", function(): void {
            toggleCheckState(index);
        });
        todo.querySelector(".trash").addEventListener("click", function(): void {
            deleteTodo(index);
        });
        todosDOMElement.appendChild(todo);
    }
    updateCounter();
}

function updateCounter(): void {
    let checked: number = 0;
    let unchecked: number = 0;

    for (let index = 0; index < ToDo.length; index++) {
        if(ToDo[index].todosChecked == true){
            checked++;
        }
        else{
            unchecked++;
        }
}

    counterDOMElement.innerHTML = ToDo.length + " in total " + checked + " done " + unchecked + " open ";
}


function addTodo(): void {
    if (inputDOMElement.value != "") {
        let new1: Interface = {
            todosText: (inputDOMElement.value),
            todosChecked: false
        };
        ToDo.unshift(new1);
        inputDOMElement.value = "";
        drawListToDOM();
    }
}

function toggleCheckState(index: number): void {
    ToDo[index].todosChecked = !ToDo[index].todosChecked;
    drawListToDOM();
}

function deleteTodo(index: number): void {
    ToDo.splice(index, 1);
    drawListToDOM();
}

//Spracheingabe

declare var Artyom: any;

window.addEventListener("load", function(): void {
    const artyom: any = new Artyom();
    
    artyom.addCommands({
        indexes: ["erstelle Aufgabe *"],
        smart: true,
        action: function(i: any, wildcard: string): void {
            inputDOMElement.value = wildcard;
            addTodo();
        }
    });
    
    function startContinuousArtyom(): void {
        artyom.fatality();
    
        setTimeout(
            function(): void {
                artyom.initialize({
                    lang: "de-DE",
                    continuous: true,
                    listen: true,
                    interimResults: true,
                    debug: true
                }).then(function(): void {
                    console.log("Ready!");
                });
            }, 
            250);
    }
    
    startContinuousArtyom();
    
});