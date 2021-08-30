// CODE EXPLAINED channel

//select elemets

const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list");
const input = document.getElementById("input");

//classes names in the css to be able to implemengt them according to states of the html

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;

//get item from local sotorage
let data = localStorage.getItem("TODO");
console.log(data)
if (data) {
    console.log(data)
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    //if data is empty
    LIST = [];
    id = 0;
}

//load list function
function loadList(array) {
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    })
}



// show today's date
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add a function todo

function addToDo(toDo, id, done, trash) {
    if(trash) {return; } //prevents below code from running
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
    <li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
</li>
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);

}

// add item when the user clicks enter key;
document.addEventListener("keyup", function(event) {
   console.log(event.which)
    if ( event.which === 13) {
        const toDo = input.value;
        if (toDo) {
            addToDo(toDo);

            LIST.push({
                name :toDo,
                id: id,
                done: false,
                trash: false
            });
            //add to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++
        }
        input.value = "";
    }
})

function completeToDo (element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo (element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}


list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob === "complete") {
        completeToDo(element)
    }else if (elementJob === "delete") {
        removeToDo(element)
    }
     //add to local storage
     localStorage.setItem("TODO", JSON.stringify(LIST));
});