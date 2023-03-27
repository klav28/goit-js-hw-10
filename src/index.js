import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const elInputField = document.querySelector("#search-box");

function handleInput(ev) {
    console.log(ev.target.value);
}

elInputField.addEventListener("input", handleInput);
