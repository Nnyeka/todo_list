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

// show today's date
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add a function todo