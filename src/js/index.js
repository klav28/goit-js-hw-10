import '../css/styles.css';
import API from './fetchCountries'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const MAX_COUNTRIES_TO_SHOW = 10;

const elInputField = document.querySelector("#search-box");
const elCountryList = document.querySelector(".country-list");
const elCountryInfo = document.querySelector(".country-info");

function handleInput(ev) {
    
    const inputText = ev.target.value.trim();
    
    clearMarkup();
    
    if (inputText === "") {
        return
    };

    API.fetchCountries(inputText)
        .then(renderMarkup)
        .catch(onFetchError);
};

function clearMarkup() {
    elCountryList.innerHTML = "";
    elCountryInfo.innerHTML = "";
}

function onFetchError() { 
    Notiflix.Notify.failure("Oops, there is no country with that name");
};


function renderMarkup(country) {

    if (country.length > MAX_COUNTRIES_TO_SHOW) {
        Notiflix.Notify.info(`Too many (${country.length}) matches found. Please enter a more specific name.`);
        return;
    }

    if (country.length > 1) {
        const countryList = country.reduce((acc,el) => {
            return acc +
                `<li class="country-list__item">
                    <img class="flag__item" src=${el.flags.svg} alt="${el.name.common}" width="96"</ >
                    <p class="country-list__txt">${el.name.official}</p>
                </li>`
        }, "");
        elCountryList.innerHTML = countryList;
        return;
    }

    const countryDetail = `
        <div class="country-info__container">
            <img class="flag__item" src=${country[0].flags.svg} alt="${country[0].name.common}" width="96"</ >
            <p class="country-info__header">${country[0].name.official}</p>
        </div>
        <ul class="country-info__list">
            <li>
                <p class="country-info__subheader">Capital: 
                <span class="country-info__detail">${country[0].capital}</span></p>
            </li >
            <li>
                <p class="country-info__subheader">Population:
                <span class="country-info__detail">${country[0].population}</span></p>                
            </li>
            <li>
                <p class="country-info__subheader">Languages:
                <span class="country-info__detail">${Object.values(country[0].languages).join(", ")}</span></p>
            </li>
        </ul>
    `;

    elCountryInfo.innerHTML = countryDetail;
    return;
}

elInputField.addEventListener("input", debounce(handleInput, DEBOUNCE_DELAY));
