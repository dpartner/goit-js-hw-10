import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

fetchCountries('sw');

const ref = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

ref.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const value = e.target.value;
  ref.countryList.innerHTML = '';
  onListMarkup(value);
}

function createListMarkup(country) {
  const nameOfficial = country.name.common;
  const flagUrl = country.flags.svg;
  const elementMarkup = `<li class="country-list-item"><img src = '${flagUrl}' width = '30' class="flag">${nameOfficial}</li>`;
  return elementMarkup;
}
function createInfoMarkup(country) {
  const nameOfficial = country.name.common;
  const flagUrl = country.flags.svg;
  const capital = country.capital;
  const population = country.population;
  const languages = Object.values(country.languages).join(',');
  const elementMarkup = `<h2 class="country-info__heading"><img class="country-info__flag" src="${flagUrl}" />${nameOfficial}</h2>
        <ul class="country-info__list">
          <li class="country-info__list-item">
            <span class="country-info__list-item-name">Capital: </span>${capital}
          </li>
          <li class="country-info__list-item">
            <span class="country-info__list-item-name">Population: </span>${population}
          </li>
          <li class="country-info__list-item">
            <span class="country-info__list-item-name">Languages: </span>${languages}
          </li>
        </ul>`;
  return elementMarkup;
}

function onListMarkup(country) {
  fetchCountries(country).then(arr => {
    if (arr.length > 1) {
      console.log(arr);
      const listMarkup = arr.map(createListMarkup).join('');
      ref.countryList.insertAdjacentHTML('beforeend', listMarkup);
    } else {
      const infoMerkup = arr.map(createInfoMarkup).join('');
      ref.countryList.insertAdjacentHTML('beforeend', infoMerkup);
    }
  });
}
